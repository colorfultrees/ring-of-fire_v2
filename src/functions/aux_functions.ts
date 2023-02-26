/**
 * Shuffles an array
 * @param {Array} array The array to be shuffled
 */
export function shuffleArray(array: any[]) {
    let temp: number, pos: number;
    for (let i = 0; i < array.length; i++) {
        temp = array[i];
        pos = calcRandomNumber(0, array.length - 1);
        array[i] = array[pos];
        array[pos] = temp;
    }
}

/**
 * Creates a random integer within the given limits
 * @param {Number} min The lower limit
 * @param {Number} max The upper limit
 * @returns Integer
 */
export function calcRandomNumber (min: number, max: number) {
    return Math.round(Math.random() * (max - min)) + min;
}