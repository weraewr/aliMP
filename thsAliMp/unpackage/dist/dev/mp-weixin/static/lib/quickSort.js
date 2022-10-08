let quickSort = function(arr, key, inverted) {

　　if (arr.length <= 1) { return arr; }

　　let pivotIndex = Math.floor(arr.length / 2);

　　let pivot = arr.splice(pivotIndex, 1)[0];

	let privotValue = pivot[key];

　　let left = [];

　　let right = [];

　　for (let i = 0; i < arr.length; i++){

　　　　if (arr[i][key] > privotValue && !inverted) {

　　　　　　left.push(arr[i]);

　　　　} else {

　　　　　　right.push(arr[i]);

　　　　}

　　}

　　return quickSort(left).concat([pivot], quickSort(right));

};

export default quickSort