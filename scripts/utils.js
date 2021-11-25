// Util functions
// =====================================
function getRandomInt(max) {
    return Math.round(Math.random() * max);
}

function getRandomIntWithWeights(weights) {
    let sum = arrSum(weights);
    let cumsum_weights = arrCumSum(weights);
    let random_float = Math.random() * sum
    // console.log("random dfloat", random_float);
    for (let i=0; i<weights.length; i++) {
        if (random_float<cumsum_weights[i]) {
            // console.log("i_random:", i);
            return i;
        }
    }
}

const argFact = (compareFn) => (array) => array.map((el, idx) => [el, idx]).reduce(compareFn)[1]

const argMax = argFact((min, el) => (el[0] > min[0] ? el : min))
const argMin = argFact((max, el) => (el[0] < max[0] ? el : max))

const arrSum = arr => arr.reduce((a,b) => a + b, 0)

function arrCumSum (arr) {
    let out = Array(arr.length).fill(0)
    out[0] = arr[0];
    for (let i=1; i<arr.length; i++) {
        out[i] = out[i-1]+arr[i];
        // console.log(out[i]);
    }
    return out
}

// Musical functions
// =====================================

function note_distance(note1, note2) {
    let dist = (note1-note2)%12;
    if (Math.abs(dist-12)%12<dist)  {
        dist = dist-12;
    }
    return dist;
}


// Dictionaries
// =====================================
midiNum2NoteName = {}
noteName2MidiNum = {}

midiNumShift = 12;
noteNamesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
noteNamesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
for (i=9; i<97; i++) {
    noteNameSharp = noteNamesSharp[i%12];
    noteNameFlat = noteNamesFlat[i%12];
    octave = Math.floor(i/12);
    midiNum2NoteName[midiNumShift+i] = noteNameFlat + String(octave);
    noteName2MidiNum[noteNameSharp + String(octave)] = midiNumShift+i
    noteName2MidiNum[noteNameFlat + String(octave)] = midiNumShift+i // if the noteNameFlat==noteNameSharp, it's just overwritten
}
