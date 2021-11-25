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
    for (let i=0; i<3; i++) {
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
        let C5 = 72;
        currUpperNote = curr_inv[2];
        distUpperNotes = note_distance(currUpperNote, prevUpperNote);
        distFromC5 = currUpperNote-C5; // penalizes chord that are too high are too low in register
        console.log("=============")
        console.log("curr_inv init", curr_inv);
        // if (distFromC5>7) {
        //     console.log("chord too high");
        //     curr_inv = curr_inv.map(x => x-12);
             
        // } else if (distFromC5<-8) { 
        //     console.log("chord too low");
        //     curr_inv = curr_inv.map(x => x+12);
            
        // }
        currUpperNote = curr_inv[2];
        distFromC5 = currUpperNote-C5;
        // console.log("distFromC5", distFromC5);
        // console.log("curr_inv before", curr_inv);
        // console.log("distUpperNotes", distUpperNotes);
        curr_inv = curr_inv.map(x => x - currUpperNote + distUpperNotes + prevUpperNote);


        currUpperNote = curr_inv[2];
        // distUpperNotes = note_distance(currUpperNote, prevUpperNote);
        distFromC5 = currUpperNote-C5;
        console.log("distFromC5", distFromC5);
        console.log("curr_inv after", curr_inv);
        scores[i_inv] = arrSum(prev.map((p, ind) => Math.abs(note_distance(p, curr_inv[ind])) ));
        scores[i_inv] += 0.5*Math.abs(distFromC5);
        console.log("prescore:", scores[i_inv]);
        scores[i_inv] = 1.0/(1.0+scores[i_inv]**0.25); // to use as weight

        let chord_str = ''
        for (i=0;i<curr_inv.length;i++) {
            if (i>0) {
                chord_str += " ";
            }
            chord_str += midiNum2NoteName[curr_inv[i]]
        }
        curr_chord_invs[i_inv] = chord_str;
        console.log("str", chord_str);
    }
    
    // let I = argMin(scores); // take the best, later implement weighted sampling
    let I = getRandomIntWithWeights(scores); // random number
    console.log("chord:", I, scores, curr_chord_invs[I]);
    return curr_chord_invs[I];

}