// Util functions
// =====================================
function getRandomInt(max) {
    return Math.round(Math.random() * max);
}

const argFact = (compareFn) => (array) => array.map((el, idx) => [el, idx]).reduce(compareFn)[1]

const argMax = argFact((min, el) => (el[0] > min[0] ? el : min))
const argMin = argFact((max, el) => (el[0] < max[0] ? el : max))

const arrSum = arr => arr.reduce((a,b) => a + b, 0)

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

// Chord functions
// =====================================
function get_chord_inversion(previous_chord, current_chord) {
    let prev_chord_array = previous_chord.split(' ');
    let curr_chord_array = current_chord.split(' ');
    let prev = [0, 0, 0];
    let curr = [0,0,0];
    for (i=0; i<3; i++) {
        prev[i] = noteName2MidiNum[prev_chord_array[i]];// % 12; // ideally should use distance in terms of chord degree rather than chromatic distance
        curr[i] = noteName2MidiNum[curr_chord_array[i]];// % 12;
    }

    let scores = [0,0,0]
    let n = curr.length;
    let prevUpperNote = prev[2];
    let currUpperNote;
    let curr_chord_invs = ['','','']
    
    for (i_inv=0; i_inv<n; i_inv++) {
        curr_inv = curr.map((x,i) => {
            let new_i = (i+i_inv)%3;
            return curr[new_i]+(new_i<i_inv)*12;
        });

        currUpperNote = curr_inv[2];
        distUpperNotes = note_distance(currUpperNote, prevUpperNote);

        // console.log("distUpperNotes", distUpperNotes);
        curr_inv = curr_inv.map(x => x - currUpperNote + distUpperNotes + prevUpperNote);

        scores[i_inv] = arrSum(prev.map((p, ind) => Math.abs(note_distance(p, curr_inv[ind])) ));
        let chord_str = ''
        for (i=0;i<curr_inv.length;i++) {
            if (i>0) {
                chord_str += " ";
            }
            chord_str += midiNum2NoteName[curr_inv[i]]
        }
        curr_chord_invs[i_inv] = chord_str;
    }
    
    let I = argMin(scores); // take the best, later implement weighted sampling
    return curr_chord_invs[I];
    // console.log("prev", prev);
    // console.log("curr", curr);
    // console.log("scores", scores);
    // console.log("chords", curr_chord_invs);
}