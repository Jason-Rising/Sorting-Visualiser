/**
 * 
 * Selection Sort Information
 * Time Complexites:
 *      Best: Ω(n^2)
 *      Avg: Θ(n^2)
 *      Worst: O(n^2)
 * 
 * Space Complexity: O(1)
 * In-place: Yes
 * Stable: Yes
 */

export function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;

    selectionSort(array, array.length, animations);
    return animations;
}

// Main processing function
function selectionSort(array, n, animations){
    for (let i = 0; i < n; i++){
        var minIdx = i;

        //Loop through all elements outside sorted range
        for (let j = i+1; j < n; j++){
            animations.push(["comparison1", j, minIdx, i]);
            animations.push(["comparison2", j, minIdx, i]); // comparison2 ensure that color change goes back to default
            if (array[j] < array[minIdx]){
                //Update minimum
                minIdx = j;
            }
        }
        //Swap smallest element with end of sorted array
        animations.push(["swap", i, minIdx, i]);
        swap(array, minIdx, i);
    }

}

// Swap array element values
function swap(array, i, j){
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

  