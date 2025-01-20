self.onmessage = function (e) {
    const array = e.data;
    const start = performance.now();
    const sortedArray = bubbleSort(array);
    const end = performance.now();
    postMessage({ sortedArray, time: (end - start).toFixed(2) });
};

function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}