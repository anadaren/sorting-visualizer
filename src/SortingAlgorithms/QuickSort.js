export function quickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    quickSortHelper(array, 0, array.length-1, animations);
    return animations;
}

function quickSortHelper(array, low, high, animations) {
    if (low >= high) return;

    let pivotIdx = partition(array, low, high, animations);
    quickSortHelper(array, low, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, high, animations);
}

function partition(array, low, high, animations) {
    let pivotValue = array[high];
    let pivotIdx = low;
    
    for (let i = low; i < high; i++) {
        animations.push([i, high]);
        animations.push([i, high]);
        // If current element is smaller than the pivot, move to left
        if (array[i] < pivotValue) {
            animations.push([i, array[pivotIdx]]);
            animations.push([pivotIdx, array[i]]);
            swap(array, pivotIdx, i);
            pivotIdx++;
        }
        else {
            animations.push([-1, -1]);
            animations.push([-1, -1]);
        }
    }
    animations.push([pivotIdx, array[high]]);
    animations.push([high, array[pivotIdx]]);
    swap(array, pivotIdx, high);
    return pivotIdx;
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}