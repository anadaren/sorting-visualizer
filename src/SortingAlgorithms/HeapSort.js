export function heapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    //console.log(array);   // Unsorted Array (for testing)
    heapSort(array, 0, array.length-1, animations);
    //console.log(array);   // Sorted Array (for testing)
    return animations;
}

function heapSort(array, low, high, animations) {
    let n = high - low + 1;
    // Arrange array into heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, low, animations);
    }
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        animations.push(["pivot", low]); // Set root as pivot
        animations.push(["compare",low, low + i]);
        animations.push(["swap", low, array[low + i], low + i, array[low]]);

        swap(array, low, low + i);
        animations.push(["resetPivot", low]);

        heapify(array, i, 0, low, animations);
    }
}

function heapify(array, n, i, low, animations) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    // Compare left child
    if (l < n) {
        animations.push(["compare", low + largest, low + l]);
        if (array[low + l] > array[low + largest]) {
            largest = l;
        }
        animations.push(["revert", low + largest, low + l]);
    }

    // Compare right child
    if (r < n) {
        animations.push(["compare", low + largest, low + r]);
        if (array[low + r] > array[low + largest]) {
            largest = r;
        }
        animations.push(["revert", low + largest, low + r]);
    }
    if (largest !== i) {
        animations.push(["swap", low + i, array[low + largest], low + largest, array[low + i]]);
        swap(array, low + i, low + largest);
        heapify(array, n, largest, low, animations);
    }
}
function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}