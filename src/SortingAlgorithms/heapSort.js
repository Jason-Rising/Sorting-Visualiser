/**
 * 
 * Heap Sort Information
 * Time Complexiy: Θ(nlogn)
 * 
 * Space Complexity: O(1)
 * In-place: Yes, requires O(1) memory for auxiliary variables
 * Stable: No, non-local swaps
 */

export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;

    heapSort(array, array.length, animations);

    // Validate implemented sorting algorithm against js sort
    const sortedArray = array.sort((a, b) => a - b);
    if (validateArray(array, sortedArray)){
        console.log("sorted!");
    }else console.log("incorrectly sorted");

    return animations;
}

function heapSort(array, n, animations){
    buildHeap(array, n, animations); 

    /*  Continuously convert array to a heap and remove the top 
        element (largest) and place at end of unsorted region    */
    for(let active = n - 1; active > 0; active--){
        swap(array, 0, active, animations);
        siftDown(array, 0, active, animations);
    }
}

function buildHeap(array, n, animations){
  for(let i = Math.floor(n/2); i >=0; i--){
    siftDown(array, i, n, animations);
  }
}

function siftDown(array, parent, n, animations){
  let child = 2 * parent + 1;
  if (child < n){
      // There is at least one child to be checked
    if (child + 1 < n && array[child] < array[child + 1]){
        // The right child exists and is larger
        animations.push(["comparison", child, child+1]);
        animations.push(["comparison", child, child+1]);
        child++;
    }
    if (array[parent] < array[child]){
        // Parent is smaller than larger child
        swap(array, parent, child, animations);
        siftDown(array, child, n, animations);
    }
  }
}

// Swap array element values
function swap(array, i, j, animations){
    animations.push(["comparison", i, j]);
    animations.push(["comparison", i, j]);
    animations.push(["swap", i, j]);
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

function validateArray(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
}

