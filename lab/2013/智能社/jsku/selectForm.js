function selectForm (lowerValue,upperValue) {
	var choices=upperValue-lowerValue+1;
	return Math.floor(Math.random()*choices+lowerValue);
}