let getTime = function(time, type) {
	let date = time ? new Date(time * 1000) : new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let double_month = month < 10 ? '0' + month : month;
	let day = date.getDate();
	let double_day = day < 10 ? '0' + day : day;
	let hours = date.getHours();
	let double_hours = hours < 10 ? '0' + hours : hours;
	let minutes = date.getMinutes();
	let double_minutes = minutes < 10 ? '0' + minutes : minutes;
	let week = '';
	switch(date.getDay()) {
		case 1:
			week = '一'
			break 
		case 2:
			week = '二'
			break 
		case 3:
			week = '三'
			break 
		case 4:
			week = '四'
			break 
		case 5:
			week = '五'
			break 
		case 6:
			week = '六'
			break 
		case 0:
			week = '日'
			break 
		default:
			week = ''
	}
	if(type == 1) {
		return double_hours + ':'  + double_minutes;
	} else {
		return year + '年' + month + '月' + day + '日 星期' + week;
	}
}

let getMarkAndCode = function(id, code, map) {
	return map[id] + '_' + code + '_' + id;
}

export default {
	getTime,
	getMarkAndCode
}