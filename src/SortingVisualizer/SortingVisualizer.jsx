import React from 'react';
import {mergeSortAnimations} from '../SortingAlgorithms/MergeSort.js';
import {quickSortAnimations} from '../SortingAlgorithms/QuickSort.js';
import {heapSortAnimations} from '../SortingAlgorithms/HeapSort.js';
import {bubbleSortAnimations} from '../SortingAlgorithms/BubbleSort.js';
import './SortingVisualizer.css';

// Speed of the animations
const ANIMATION_SPEED_MS = 50;

// Number of bars (values) in the array
const NUMBER_OF_ARRAY_BARS = 100;

// Main color of the array bars
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations
const SECONDARY_COLOR = 'red';

// Color of pivot bar in sorts that require pivots
const PIVOT_COLOR = 'green';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }



  // Shuffles array
  resetArray() {
    const array = [];
    for (let i = 1; i <= NUMBER_OF_ARRAY_BARS; i++) {
      array.push(i);
    }
    
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    this.setState({ array });
  }


  mergeSort() {
    // Animates merge sort
    const animations = mergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;

        if (isColorChange) {  // Change colors
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        } else {  // Change height
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight * 5}px`;
            }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = quickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];

      setTimeout(() => {
          if (animation[0] === "pivot") {
            console.log(animation);
              // Highlight the pivot bar in green
              const [_, pivotIdx] = animation;
              if (pivotIdx >= 0 && pivotIdx < arrayBars.length) {
                  arrayBars[pivotIdx].style.backgroundColor = PIVOT_COLOR;
              }
          } else if (animation[0] === "compare") {
              // Compare two bars (red highlight)
              const [_, barOneIdx, barTwoIdx] = animation;
              if (barOneIdx >= 0 && barTwoIdx >= 0) {
                  arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
                  arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
              }
          } else if (animation[0] === "revert") {
              // Revert compared bars to normal
              const [_, barOneIdx, barTwoIdx] = animation;
              if (barOneIdx >= 0 && barTwoIdx >= 0) {
                  arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
                  arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
              }
          } else if (animation[0] === "swap") {
              // Swap heights
              const [_, barOneIdx, newHeight] = animation;
              if (barOneIdx >= 0) {
                  arrayBars[barOneIdx].style.height = `${newHeight * 5}px`;
              }
          } else if (animation[0] === "resetPivot") {
              // Reset pivot bar color after partitioning
              const [_, pivotIdx] = animation;
              if (pivotIdx >= 0 && pivotIdx < arrayBars.length) {
                  arrayBars[pivotIdx].style.backgroundColor = PRIMARY_COLOR;
              }
          }
      }, i * ANIMATION_SPEED_MS);
    }
  }


  heapSort() {
    // Animates heap sort
    const animations = heapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
          const animation = animations[i];
          if (animation[0] === "compare") {
            // Compare two bars (red highlight)
            const [_, barOneIdx, barTwoIdx] = animation;
            if (barOneIdx < arrayBars.length && barTwoIdx < arrayBars.length) {
            arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
            arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
            }
          } else if (animation[0] === "revert") {
            // Revert compared bars to normal
            const [_, barOneIdx, barTwoIdx] = animation;
            if (barOneIdx < arrayBars.length && barTwoIdx < arrayBars.length) {
            arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
            arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
            }
          } else if (animation[0] === "swap") {
            // Swap heights
            const [_, barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] = animation;
            if (barOneIdx < arrayBars.length && barTwoIdx < arrayBars.length) {
            arrayBars[barOneIdx].style.height = `${newHeightOne * 5}px`;
            arrayBars[barTwoIdx].style.height = `${newHeightTwo * 5}px`;

            setTimeout(() => {
              arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
              arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
            }, ANIMATION_SPEED_MS);
            }
          } else if(animation[0] === "pivot") {
            // Highlight the pivot bar in green
            const [_, pivotIdx] = animation;
            arrayBars[pivotIdx].style.backgroundColor = PIVOT_COLOR;
          } else if(animation[0] === "resetPivot") {
            // Reset pivot bar color after partitioning
            const [_, pivotIdx] = animation;
            arrayBars[pivotIdx].style.backgroundColor = PRIMARY_COLOR;
          }
      }, i * ANIMATION_SPEED_MS);
    }
  }
  

  bubbleSort() {
    // Animates bubble sort
    const animations = bubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 4 < 2;
        if (isColorChange) {  // Change colors
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        } else {  // Change height
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight * 5}px`;
            }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const { array } = this.state;

    return (
      <>
      <div className='top-container'>
        <h1>Sorting Visualizer</h1>
        <button onClick={() => this.resetArray()}>Shuffle Array</button>

        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
      <div className="array-container">
        

        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value * 5}px`,
            }}></div>
        ))}
        
      </div>
      </>
    );
  }
}