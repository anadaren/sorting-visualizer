export function quickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    const newArray = array.slice();
    //console.log(array);   // Unsorted Array (for testing)
    quickSortHelper(newArray, 0, newArray.length-1, animations);
    //console.log(array);   // Sorted Array (for testing)
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

    animations.push(["pivot", high]); // Set pivot color
    
    for (let i = low; i < high; i++) {
        animations.push(["compare", i, high]); // Animation for changing color
        animations.push(["revert", i, high]); // Revert color
        
        // If current element is smaller than the pivot, move to left
        if (array[i] < pivotValue) {
            animations.push(["swap", i, array[pivotIdx]]);  // Animations for changing height
            animations.push(["swap", pivotIdx, array[i]]);
            [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
            pivotIdx++;
        }
    }
    animations.push(["swap", pivotIdx, array[high]]);   // Animations for changing height
    animations.push(["swap", high, array[pivotIdx]]);
    [array[pivotIdx], array[high]] = [array[high], array[pivotIdx]];

    animations.push(["resetPivot", pivotIdx]);  // Revert pivot color
    return pivotIdx;
}