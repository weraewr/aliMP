//检查数据字段是否完整

function checkData(dataArr, checkArr) {
	let result = {
		dataArr: [],//参数完整的数组
		errArr: []//参数缺失的数组
	}
	if(dataArr.length == 0 || checkArr.length == 0) {
		return result
	}
	dataArr.forEach((items)=>{
		let num = 0;//记录缺少的参数数目
		checkArr.forEach((item)=>{
			if(items[item] === undefined || items[item] === '--') {
				num += 1;
			}
		})
		num > 0 ? result.errArr.push(items) : result.dataArr.push(items);
	})
	return result;
}

export default checkData;
