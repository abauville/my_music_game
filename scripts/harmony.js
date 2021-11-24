let chord_progressions = [
    // I-IV-V variants, three-chord progression
    [1, 1, 4, 1],
    [1, 1, 4, 4],
    [1, 1, 4, 5],

    [1, 1, 5, 1],
    [1, 1, 5, 4],
    [1, 1, 5, 5],

    [1, 4, 1, 5],
    
    [1, 4, 5, 1],
    [1, 4, 5, 4],
    [1, 4, 5, 5],

    [1, 5, 4, 1],
    [1, 5, 4, 5],

    [4, 5, 1, 1],
    [4, 5, 4, 1],
    [5, 4, 1, 1],
    [5, 4, 1, 4],
    

    // Doo wop
    [1, 6, 4, 5],
    [6, 4, 5, 1],
    [4, 5, 1, 6],
    [5, 1, 6, 4],
    
    // Axis progression
    [1, 5, 6, 4],
    [5, 6, 4, 1],
    [6, 4, 1, 5],
    [4, 1, 5, 6],

    // Other
    [1, 6, 5, 1],
    [1, 6, 5, 4],
    [1, 6, 5, 5],


]


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