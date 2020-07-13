/**
 * 
 * Quick Sort (with Hoare Partitioning) Information
 * Time Complexites:
 *      Best: Ω(nlogn)
 *      Avg: Θ(nlogn)
 *      Worst: O(n^2)
 * 
 * Space Complexity: O(1)
 * In-place: Yes, but still requires O(logn) memory for the stack
 * Stable: No, non-local swaps
 */

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;

    quickSort(array, 0, array.length - 1, animations);
    return animations;
}

function quickSort(A, fe, fg, animations){
    if (fe >= fg) return;
    animations.push(["comparison1", fe]);
    let index = hoarePartition(A, fe, fg, animations);
    animations.push(["comparison2", fe]);

    quickSort(A, fe, index - 1, animations);
    quickSort(A, index, fg, animations);
}

/*  Pivot chosen as first element so visually easier to read, despite
    a random pivot being prefeable in practice
*/
function hoarePartition(A, fe, fg, animations){
    let pivot = A[fe];
    let pivotIdx = fe;
    animations.push(["comparison1", fe]);
    while(fe <= fg){
        animations.push(["comparison1", pivotIdx]);
        while(A[fe] < pivot && fe <= fg){
            animations.push(["comparison1", fe]);
            animations.push(["comparison2", fe]);
            fe++;
        }
        while(A[fg] > pivot){
            animations.push(["comparison1", fg]);
            animations.push(["comparison2", fg]);
            fg--;
        } 
        if (fe <= fg){
            swap(A, fe, fg, animations);
            fe++;
            fg--;
        }
    }
    animations.push(["comparison2", fe]);
    animations.push(["comparison2", pivotIdx]);
    return fe;
}

// Swap array element values
function swap(array, i, j, animations){
    animations.push(["comparison3", i, j]);
    animations.push(["comparison4", i, j]);
    animations.push(["swap", i, j, array[i], array[j]]);

    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}
