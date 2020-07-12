/**
 * 
 * Insertion Sort Information
 * Time Complexites:
 *      Best: Ω(n)
 *      Avg: Θ(n^2)
 *      Worst: O(n^2)
 * 
 * Space Complexity: O(1)
 * In-place: Yes
 * Stable: Yes
 */

export function getInsertionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;

    insertionSort(array, array.length, animations);
    return animations;
}

// Main processing function
function insertionSort(array, n, animations){
    for (let i = 0; i < n; i++){
        let v = array[i];
        let j = i - 1;

        animations.push(["comparison1", i]);

        while(j >= 0 && array[j] > v){
            animations.push(["comparison1", j]);
            array[j + 1] = array[j];
            animations.push(["changeHeight", j + 1, array[j]]);
            animations.push(["comparison2", j]); 
            j--;
        }
        array[j + 1] = v;
        animations.push(["changeHeight", j + 1, v]);
        animations.push(["comparison2", i]);
    }
}
