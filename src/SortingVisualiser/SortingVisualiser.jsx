import React from 'react';
import './SortingVisualiser.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js';
import {getSelectionSortAnimations} from '../SortingAlgorithms/selectionSort.js';
import { getInsertionSortAnimations } from '../SortingAlgorithms/insertionSort';
import { getQuickSortAnimations } from '../SortingAlgorithms/quickSort';
import { getHeapSortAnimations } from '../SortingAlgorithms/heapSort';

const ANIMATION_SPEED_MS = 2;
const PRIMARY_COLOR = '#97C54E';
const SECONDARY_COLOR = 'white';

const MIN_VAL = 5;

// Indicates whether an algorithm is currently being visualised
let isRunning = false;

export default class SortingVisualiser extends React.Component{
    constructor(props){
        super(props);
        this.AlgorithmInfoElement = React.createRef();

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.reset_array();
    }

    reset_array(){
        if (isRunning === true){
            isRunning = false;
            window.location.reload(false);
        }

        const array = [];
        const array_size = parseInt((window.innerWidth)/20);
        let max_size = parseInt(window.innerHeight - window.innerHeight * 0.25);
        if (max_size > 730) max_size = 730;

        for(let i = 0; i < array_size; i++){
            array.push(random_int_from_interval(MIN_VAL, max_size));
        }
        this.setState({array});
    }

    // Functions controls animations for Selection Sort
    selection_sort(){
        this.toggleBtn();
        isRunning = true;

        // Update algorithm UI for selection sort info
        this.AlgorithmInfoElement.current.updateInfo(
            "Selection Sort:",
            "Ω(n^2)",
            "Θ(n^2)",
            "O(n^2)",
            "O(1)",
            "Yes, addition O(1) for auxiliary variables",
            "Yes",
            "Appropriate for small array sizes. Useful if minimizing swaps is desirable"
            );

        const animations = getSelectionSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');

        // Loop through animations
        for (let i = 0; i < animations.length; i++){
            const barOneIdxStyle = arrayBars[animations[i][1]].style;
            if (animations[i][0] === "comparison1"){
                // Visualise comparison
                setTimeout(() => {
                    const barTwoIdxStyle = arrayBars[animations[i][3]].style;
                    barOneIdxStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoIdxStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
                // Revert bars back to defualt colour
            }else if (animations[i][0] === "comparison2"){
                setTimeout(() => {
                    // Don't revert back end or sorted array if it will not be changed in the next iteration
                    if (i < animations.length){
                        if (animations[i + 1][2] !== animations[i][2]){
                            const barTwoIdxStyle = arrayBars[animations[i][3]].style;
                            barTwoIdxStyle.backgroundColor = PRIMARY_COLOR;
                        }
                    }
                    barOneIdxStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }else{
                // Revert colours and change the heights of bars
                setTimeout(() => {
                    const barOneStyle = arrayBars[animations[i][1]].style;
                    const barTwoStyle = arrayBars[animations[i][2]].style;
                    //Swap heights
                    barOneStyle.height = `${animations[i][4]}px`;
                    barTwoStyle.height = `${animations[i][3]}px`;

                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }

            // Re-enable the buttons once last animation is processed
            if (i === animations.length - 1){
                setTimeout(() => {
                    this.toggleBtn();
                    isRunning =  false;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    // Functions controls animations for Insertion Sort
    insertion_sort(){
        this.toggleBtn();
        isRunning = true;

        // Update algorithm UI for insertion sort info
        this.AlgorithmInfoElement.current.updateInfo(
            "Insertion Sort:",
            "Ω(n)",
            "Θ(n^2)",
            "O(n^2)",
            "O(1)",
            "Yes, may need additional O(1) memory",
            "Yes, local adjacent swaps ensure stability",
            "Good choice when data is almost sorted. Can be made slightly faster using a min sentinel."
            );

        const animations = getInsertionSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');  

        // Loop through animations
        for (let i = 0; i < animations.length; i++){
            const barOneStyle = arrayBars[animations[i][1]].style;

            // Change selected div colour to visualise that it is being used in a comparison
            if (animations[i][0] === "comparison1"){
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

            // Reset div colour to defualt as it is no longer being compared
            }else if (animations[i][0] === "comparison2"){
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            // Change bar heights to visualise swap
            }else{
                setTimeout(() => {
                    barOneStyle.height = `${animations[i][2]}px`;
                }, i * ANIMATION_SPEED_MS);
            }

            // Re-enable the buttons once last animation is processed
            if (i === animations.length - 1){
                setTimeout(() => {
                    this.toggleBtn();                   
                    isRunning =  false;
                }, i * ANIMATION_SPEED_MS);
            }

        }
    }

    // Functions controls animations for Merge Sort
    merge_sort(){
        this.toggleBtn();
        isRunning = true;

        // Update algorithm UI for merge sort info
        this.AlgorithmInfoElement.current.updateInfo(
            "Merge Sort:",
            "Ω(nlogn)",
            "Θ(nlogn)",
            "O(nlogn)",
            "O(n)",
            "No, requires O(n) auxiliary array + O(logn) stack space if using recursion",
            "Yes, merge keeps relative order with additional book keeping, i.e. left side goes first",
            "Is an excellent choice if stability is required and extra memory cost is low. Guaranteed Θ(nlogn), highly parallelisable, Multiway Mergesort; excellent for secondary memory"
        );

        const animations = getMergeSortAnimations(this.state.array);
        
        // Process array of animations
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;

          // Change div color depending on position in triplet, we know we have a colour change for the first two animations in a triplet
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            // Swap bar heights  
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }

            // Re-enable the buttons once last animation is processed
            if (i === animations.length - 1){
                setTimeout(() => {
                    this.toggleBtn();
                    isRunning =  false;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    // Function controls animations for Heap Sort
    heap_sort(){
        this.toggleBtn();
        isRunning = true;

        // Update algorithm UI for heap sort info
        this.AlgorithmInfoElement.current.updateInfo(
            "Heap Sort:",
            "Ω(nlogn)",
            "Θ(nlogn)",
            "O(nlogn)",
            "O(1)",
            "Yes, only additional O(1) memory for auxiliary variables",
            "No, non-local swaps break stability",
            "Best choice when low memory footprint is required and guaranteed Θ(nlogn) performance is needed, i.e security reasons"
        );
        
        const animations = getHeapSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');

        // Process array of animations
        console.log(animations.length);
        for(let i = 0; i < animations.length; i++){
            // Toggle between div colour depending on current background colour 
            if (animations[i][0] === "comparison"){
                setTimeout(() => {
                    const barOneStyle = arrayBars[animations[i][1]].style;
                    const barTwoStyle = arrayBars[animations[i][2]].style;

                    let colour;
                    barOneStyle.backgroundColor === SECONDARY_COLOR ? colour = PRIMARY_COLOR : colour = SECONDARY_COLOR;

                    barOneStyle.backgroundColor = colour;
                    barTwoStyle.backgroundColor = colour;

                  }, i * ANIMATION_SPEED_MS);
            }else{
                // Swaps heights of two bars
                setTimeout(() => {
                    const barOneStyle = arrayBars[animations[i][1]].style;
                    const barTwoStyle = arrayBars[animations[i][2]].style;
    
                    barOneStyle.height = `${animations[i][4]}px`;
                    barTwoStyle.height = `${animations[i][3]}px`;
                }, i * ANIMATION_SPEED_MS);
            }

            // Re-enable the buttons once last animation is processed
            if (i === animations.length - 1){
                setTimeout(() => {
                    this.toggleBtn();
                    isRunning =  false;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    // Function controls animations for Quick Sort (Hoare Partitioning)
    quick_sort(){
        this.toggleBtn();
        isRunning = true;

        // Update algorithm UI for quick sort info
        this.AlgorithmInfoElement.current.updateInfo(
        "Quick Sort:",
        "Ω(nlogn)",
        "Θ(nlogn)",
        "O(n^2)",
        "O(logn)",
        "Yes, but still requires O(logn) memory for the stack",
        "No, non-local swaps break stability",
        "Fastest sorting algorithm in most cases. Is the algorithm of choice when speed matters and stability is not required. In practice it is best to choose the pivot at random to avoid worst case and potential attacks"
        );

        // Process array of animations
        const animations = getQuickSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < animations.length; i++){
            const barStyle = arrayBars[animations[i][1]].style;
            if (animations[i][0] === "comparison1"){
                // Highlight selected div
                setTimeout(() => {
                    barStyle.backgroundColor = SECONDARY_COLOR;
                  }, i * ANIMATION_SPEED_MS);
            }else if (animations[i][0] === "comparison2"){
                // Revert div back to defualt colour
                setTimeout(() => {
                    barStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }else if (animations[i][0] === "comparison3"){
                // Highlight two divs at the same time
                setTimeout(() => {
                    const barTwoStyle = arrayBars[animations[i][2]].style;
                    barStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;                
                }, i * ANIMATION_SPEED_MS);
            }else if (animations[i][0] === "comparison4"){
                // Revert two divs to defualt colour at the same time
                setTimeout(() => {
                    const barTwoStyle = arrayBars[animations[i][2]].style;
                    barStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;             
                }, i * ANIMATION_SPEED_MS);
            }else{
                // Swaps heights of two bars
                setTimeout(() => {
                    barStyle.height = `${animations[i][4]}px`;
                    const barTwoStyle = arrayBars[animations[i][2]].style;
                    barTwoStyle.height = `${animations[i][3]}px`;                              
                }, i * ANIMATION_SPEED_MS);
            }
            
            // Re-enable the buttons once last animation is processed
            if (i === animations.length - 1){
                setTimeout(() => {
                    this.toggleBtn();
                    isRunning = false;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    
    // Re-enable button interactivity once animations are finished
    toggleBtn(){
        const idArray = ["selectionSortBtn", "insertionSortBtn", "mergeSortBtn", "heapSortBtn", "quickSortBtn"];
        for(let i = 0; i < idArray.length; i++){
            let btn =  document.getElementById(idArray[i]);
            btn.disabled = !btn.disabled;   
        }
    }

    render(){
        const {array} = this.state;
        return(
            <>
            <div className="header">
                <h1>Sorting Algorithm Visualiser</h1>
                <p>Created by Jason Rising</p>
                <div className="nav-bar">
                    <button id="resetBtn" onClick={() => this.reset_array()}>Randomise Array</button>
                    <button id="selectionSortBtn" onClick={() => this.selection_sort()}>Selection Sort</button>
                    <button id="insertionSortBtn" onClick={() => this.insertion_sort()}>Insertion Sort</button>
                    <button id="mergeSortBtn" onClick={() => this.merge_sort()}>Merge Sort</button>
                    <button id="heapSortBtn" onClick={() => this.heap_sort()}>Heap Sort</button>
                    <button id="quickSortBtn" onClick={() => this.quick_sort()}>Quick Sort</button>
                </div>
            </div>
            <div className="array-container">
                {array.map((value, idx) => (
                    <div className="array-bar" 
                    key={idx} 
                    style={{height: `${value}px`}}>
                    </div>
                ))}
            </div> 
            <AlgorithmInfo ref={this.AlgorithmInfoElement}/>
            </>
        );
    }
}

// Component handles displaying of different algorithm infomation
class AlgorithmInfo extends React.Component {
    state = {
        name: "No Algorithm Selected",
        bestCase: "",
        avgCase: "",
        worstCase: "",

        spaceC: "",

        inPlace: "",
        stable: "",
        misc: "",
    };

    // Updates various information based on passed information
    updateInfo(Newname, NewBest, NewAvg, NewWorst, NewSpace, NewInPlace, NewStable, NewMisc){
        this.setState({
            name: Newname,
            bestCase: NewBest,
            avgCase: NewAvg,
            worstCase: NewWorst,
            spaceC: NewSpace,
            inPlace: NewInPlace,
            stable: NewStable,
            misc: NewMisc
        });
    }


    render(){
        return(
            <div className='info-container'>
                <h1>{this.state.name}</h1>
                <div className='grid'>
                    <div>
                        <h1>Time Complexity</h1>
                        <p><strong>Best Case: </strong>{this.state.bestCase}</p>
                        <p><strong>Average Case: </strong>{this.state.avgCase}</p>
                        <p><strong>Worst Case: </strong>{this.state.worstCase}</p>
                    </div>
                    <div>
                        <h1>Space Complexity</h1>
                        <p><strong>Worst Case: </strong>{this.state.spaceC}</p>
                    </div>
                    <div>
                        <h1>General Info</h1>
                        <p><strong>In-place: </strong>{this.state.inPlace}</p>
                        <p><strong>Stable: </strong>{this.state.stable}</p>
                        <p><strong>Misc: </strong>{this.state.misc}</p>
                    </div>
                </div>
            </div>
        );  
    }
}

// Returns an int between a set min and max interval
function random_int_from_interval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
