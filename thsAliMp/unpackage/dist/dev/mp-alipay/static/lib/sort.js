function swap(A, i, j) {
	const t = A[i];
	A[i] = A[j];
	A[j] = t;
}

/**
 *
 * @param {*} A  数组
 * @param {*} p  起始下标
 * @param {*} r  结束下标 + 1
 * @param {*} key  比较关键字
 * @param {*} inverted  是否倒序，默认值从大到小
 */
function divide(A, p, r, key, inverted) {
	const x = A[r - 1][key];
	let i = p - 1;

	for (let j = p; j < r - 1; j++) {
		if(inverted) {
			if (Number(A[j][key]) <= Number(x)) {
				i++;
				swap(A, i, j);
			}
		} else {
			if (Number(A[j][key]) >= Number(x)) {
				i++;
				swap(A, i, j);
			}
		}
	}

	swap(A, i + 1, r - 1);

	return i + 1;
}

/**
 * 
 * @param {*} A  数组
 * @param {*} p  起始下标
 * @param {*} r  结束下标 + 1
 */
function qsort(A, p = 0, r, key, inverted) {
	r = r || A.length;

	if (p < r - 1) {
		const q = divide(A, p, r, key, inverted);
		qsort(A, p, q, key, inverted);
		qsort(A, q + 1, r, key, inverted);
	}
	return A;
}

export default qsort
