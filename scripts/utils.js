// Util functions
// =====================================
function getRandomInt(max) {
    return Math.round(Math.random() * max);
}

const argFact = (compareFn) => (array) => array.map((el, idx) => [el, idx]).reduce(compareFn)[1]

const argMax = argFact((min, el) => (el[0] > min[0] ? el : min))
const argMin = argFact((max, el) => (el[0] < max[0] ? el : max))

const arrSum = arr => arr.reduce((a,b) => a + b, 0)


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
// console.log(midiNum2NoteName);
// console.log(noteName2MidiNum);