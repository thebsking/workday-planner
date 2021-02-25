function preClass(array) {
    let sum = 0;
    let arrLen = array.length;
    for (let i = 0; i < arrLen; i++) {
        sum += array[i];
        return sum;
    }
    let average = sum / arrLen;
    console.log(average);
}
preClass([1, 3, 6, 7]);
