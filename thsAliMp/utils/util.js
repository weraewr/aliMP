const Fly = require("./fly.js");

const fly = new Fly();

const moment = require("./moment.js");

const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

const _timeAgo = dateTimeStamp => {
  let result;
  let thisDate = moment(dateTimeStamp);
  let nowDate = moment(); 

  if (thisDate.format('YYYY') !== nowDate.format('YYYY')) {
    // 不同年
    result = thisDate.format('YYYY-MM-DD');
  } else if (thisDate.format('MM') !== nowDate.format('MM')) {
    // 不同月
    result = thisDate.format('MM-DD');
  } else if (thisDate.format('DD') !== nowDate.format('DD')) {
    if (thisDate.format('DD') === nowDate.subtract(1, 'days').format('DD')) {
      // 昨天
      result = '昨天 ' + thisDate.format('HH:mm');
    } else {
      result = thisDate.format('MM-DD');
    }
  } else if (parseInt(nowDate.format('H')) !== parseInt(thisDate.format('H'))) {
    if (parseInt(thisDate.format('H')) < parseInt(nowDate.format('H'))) {
      // 不同小时
      result = thisDate.fromNow().replace(/\s/g, '').replace('an', 1).replace('hoursago', '小时前').replace('hourago', '小时前').replace('minutesago', '分钟前').replace('minuteago', '分钟前');
    } else {
      result = thisDate.format('HH:mm');
    }
  } else if (parseInt(nowDate.format('m')) - parseInt(thisDate.format('m')) >= 3) {
    result = parseInt(nowDate.format('m')) - parseInt(thisDate.format('m')) + '分钟前';
  } else {
    result = '刚刚';
  }

  return result;
}; // const _timeAgo = dateTimeStamp => {
//   // 过去了的时间
//   let result = ''
//   let minute = 1000 * 60 //把分，时，天，周，半个月，一个月用毫秒表示
//   let hour = minute * 60
//   let day = hour * 24
//   let week = day * 7
//   let halfamonth = day * 15
//   let month = day * 30
//   let now = new Date().getTime() //获取当前时间毫秒
//   let diffValue = now - dateTimeStamp //时间差
//   if (diffValue < 0) {
//     return result
//   }
//   let minC = diffValue / minute //计算时间差的分，时，天，周，月
//   let hourC = diffValue / hour
//   let dayC = diffValue / day
//   let weekC = diffValue / week
//   let monthC = diffValue / month
//   if (monthC >= 1 && monthC <= 3) {
//     result = parseInt(monthC) + '月前'
//   } else if (weekC >= 1 && weekC <= 3) {
//     result = parseInt(weekC) + '周前'
//   } else if (dayC >= 1 && dayC <= 6) {
//     result = parseInt(dayC) + '天前'
//   } else if (hourC >= 1 && hourC <= 23) {
//     result = parseInt(hourC) + '小时前'
//   } else if (minC >= 1 && minC <= 59) {
//     result = parseInt(minC) + '分钟前'
//   } else if (diffValue >= 0 && diffValue <= minute) {
//     result = '刚刚'
//   } else {
//     let datetime = new Date()
//     datetime.setTime(dateTimeStamp)
//     let Nyear = datetime.getFullYear()
//     let Nmonth =
//       datetime.getMonth() + 1 < 10
//         ? '0' + (datetime.getMonth() + 1)
//         : datetime.getMonth() + 1
//     let Ndate =
//       datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
//     let Nhour =
//       datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
//     let Nminute =
//       datetime.getMinutes() < 10
//         ? '0' + datetime.getMinutes()
//         : datetime.getMinutes()
//     let Nsecond =
//       datetime.getSeconds() < 10
//         ? '0' + datetime.getSeconds()
//         : datetime.getSeconds()
//     result = Nyear + '-' + Nmonth + '-' + Ndate
//   }
//   return result
// }


const _get = opt => {
  // get获取数据
  return new Promise((resolve, reject) => {
    fly.get(opt.url, opt.data || {}, {
      headers: Object.assign({}, opt.headers || {})
    }).then(({
      data
    }) => {
      resolve(data);
    }).catch(e => {
      reject(e);
    });
  });
};
/**
 * 根据date获取日期
 * @param {Object} date date对象
 */


const _getDateInfo = date => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    min: date.getMinutes(),
    sec: date.getSeconds()
  };
};

const _isFromApp = scene => {
  let fromApp = [1036, 1069];
  return fromApp.indexOf(scene) >= 0;
};

module.exports = {
  formatTime: formatTime,
  _timeAgo: _timeAgo,
  _get,
  _isFromApp: _isFromApp
};