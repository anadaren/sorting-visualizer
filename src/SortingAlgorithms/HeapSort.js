export function heapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    heapSort(array, 0, array.length-1, animations);
    return animations;
}

function heapSort(array, low, high, animations) {
    let n = high - low + 1;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, low, animations);
    }
    for (let i = n - 1; i > 0; i--) {
        swap(array, low, low + i, animations);
        heapify(array, i, 0, low, animations);
    }
}

function heapify(array, n, i, low, animations) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && array[low + l] > array[low + largest]) {
        largest = l;
    }
    if (r < n && array[low + r] > array[low + largest]) {
        largest = r;
    }
    if (largest !== i) {
        swap(array, low + i, low + largest, animations);
        heapify(array, n, largest, low, animations);
    }
}
function swap(array, i, j, animations) {
    animations.push([i, j]);
    animations.push([i, j]);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}