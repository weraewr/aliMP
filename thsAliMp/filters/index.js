let defaultValue = function(v) {
	if(v === '' || v === undefined || v == '--' || v === null) {
		return '--';
	} else {
		return v ? v : '0.00';
	}
}

let price = function(v) {
	if(v === '' || v === undefined || v == '--' || v === null) {
		return '--';
	} else {
		return (Number(v)).toFixed(2);
	}
}

let formatPrecent =function(v) {
	if(v === '' || v === undefined || v == '--' || v === null) {
		return '--';
	} else {
		if(v) {
			v = (Number(v)).toFixed(2);
			return v < 0 ? v + '%' : '+' + v + '%';
		} else {
			return '0.00%';
		}
	}
}

let formatNum = function(v) {
	if(v === '' || v === undefined || v == '--' || v === null) {
		return '--';
	} else {
		if(v) {
			v = (Number(v)).toFixed(2);
			return v < 0 ? v : '+' + v;
		} else {
			return '0.00';
		}
	}
}

let onlyPrecent = function(v) {
	if(v === '' || v === undefined || v == '--' || v === null) {
		return '--';
	} else {
		v = (Number(v)).toFixed(2);
		return v ? v + '%' : '--';
	}
}

export default {
	defaultValue,
	formatPrecent,
	formatNum,
	onlyPrecent,
	price
}