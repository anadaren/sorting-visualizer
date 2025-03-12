export function mergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    const newArray = array.slice();
    //console.log(array);   // Unsorted Array (for testing)
    mergeSortHelper(array, 0, array.length - 1, newArray, animations);
    //console.log(array);   // Sorted Array (for testing)
    return animations;
}

// Cuts array in half and recursively sorts each half
function mergeSortHelper(array, startIdx, endIdx, newArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(newArray, startIdx, middleIdx, array, animations);
    mergeSortHelper(newArray, middleIdx + 1, endIdx, array, animations);
    doMerge(array, startIdx, middleIdx, endIdx, newArray, animations);
}

function doMerge(array, startIdx, middleIdx, endIdx, newArray, animations) {
    let i = startIdx;
    let j = middleIdx + 1;
    let k = startIdx;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (newArray[i] <= newArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, newArray[i]]);
            array[k++] = newArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, newArray[j]]);
            array[k++] = newArray[j++];
        }
    }
    while (i <= middleIdx) {
        // Same as above, but for the remaining values
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, newArray[i]]);
        array[k++] = newArray[i++];
    }
    while (j <= endIdx) {
        // Same as above, but for the remaining values
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, newArray[j]]);
        array[k++] = newArray[j++];
    } 
}
