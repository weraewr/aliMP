const statPrefix = 'https://stat.10jqka.com.cn/q?';
const opentime = Math.floor(+new Date() / 1000);

class hxmStat {
	constructor(param, ext) {
		// 默认埋点参数设置
		let statConf = {
			source_type: 'xiaochengxu',
			ld: 'mp',
			app_ver: '1.0.0',
			live_app: 'ali',
			opentime: opentime
		};
		uni.getSystemInfo({
			success: function (res) {
				var platform = res.platform;
				var device = res.model;
				var operator = res.system;
				if(platform == 'ios') {
					statConf.platform = 'iphone';
				} else if(platform == 'android') {
					statConf.platform = 'gphone';
				} else {
					statConf.platform = 'pc';
				}
				statConf.device = device;
				statConf.operator = operator;
			}
		})
		
	    let tmpObj = {};
	    
		if(typeof param === 'undefined' || param === ''){
		  return;
		}else if(['string','number'].includes(typeof param)){
		  tmpObj.id = param;
		}else if(typeof param === 'object'){
		  if(!param.id){
			return false;
		  }
		  tmpObj = {...param};
		}
	
		setTimeout(()=>{
			this.statConf = typeof statConf === 'object' ? statConf : {};
			this.ext = typeof ext === 'object' ? ext : {};
				
			let statInfoObj = {...this.statConf,...tmpObj,...this.ext};
			this.sendStat(statInfoObj);
		}, 200);
	}
	
	sendStat(obj){
		obj.ts = Math.floor(+new Date() / 1000);
		let statStr = _buildQuery(obj);
		statStr = statStr.replace(/%20/gi,'');
		uni.request({
			url:`${statPrefix}${statStr}`,
			method:'GET',
			time: 3000,
			success(res){ }
		});
	}
}

//拼接字符串
function _buildQuery(obj, father){
  let str = '';
  if( typeof obj === 'object' ){
    let param = '';
    for(let i in obj){
      if( father ){
        param = father+'['+i+']';
      }else{
        param = i;
      }
      str += _buildQuery(obj[i], param);
    }
    return father ? str : str.substr(0,str.length-1);
  }
  else if( typeof obj === 'number' ||  typeof obj === 'string' ){
    if( father ){
      return encodeURIComponent(father)+'='+encodeURIComponent(obj)+'&';
    }else{
      return encodeURIComponent(obj);
    }
  }else{
    return '';
  }
}

/**
 * 模拟手炒埋点库
 * @param {String|Number|Object} param 埋点id
 * @param {Object} ext 扩展对象
 */
//页面打开埋点
function hxmPageStat(param, ext){
  new hxmStat(param, ext);
}

//页面点击埋点
function hxmClickStat(param, ext){
  new hxmStat(param, ext);
}

export {
	hxmPageStat,
	hxmClickStat
}