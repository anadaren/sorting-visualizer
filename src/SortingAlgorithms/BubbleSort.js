export function bubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    const newArray = array.slice();
    bubbleSort(array, newArray, animations);
    return animations;
}

function bubbleSort(array, newArray, animations) {
    let swapped;
    for (let i = 0; i < newArray.length-1; i++) {
        swapped = false;
        for (let j = 0; j < newArray.length - i - 1; j++) {
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);
            if (newArray[j] > newArray[j + 1]) {
                // Swap the two elements
                animations.push([j, newArray[j + 1]]);
                animations.push([j + 1, newArray[j]]);
                let temp = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = temp;
                swapped = true;
            } else {
                animations.push([j, newArray[j]]);
                animations.push([j + 1, newArray[j + 1]]);
            }
        }
        // If no two elements were swapped by inner loop, then break
        if (swapped == false)  break;
    }
}