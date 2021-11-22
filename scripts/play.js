// Note
// =====================================
function play_note(elem, note_length, opt={}) {
    // Default options
    options = { 'synth':null,
                'play_sound':null,
                'time':Tone.now(),
                }
    
    // Overwrite default with user input
    for (let key in opt) {
        if (!(key in options)) {
            console.log("Error: the key:" + key + " is not a valid option for the function play_note.");
        }
        options[key] = opt[key];
    }
    

    let synth;
    if (options['synth']==null) {
        if (elem.classList.contains("right_answer") || elem.classList.contains("sequence")) {
            synth = synthRight;
        } else {
            synth = synthWrong;
        }
    } else {
        synth = options['synth'];
    }

    let play_sound;
    if (options['play_sound'] == null) { // the default value allows the checkbox to be overriden (e.g. for the start button)
        if (document.getElementById('play_sound_checkbox').checked) {
            play_sound=true;
        } else {
            play_sound=false;
        }
    } else {
        play_sound = options['play_sound']
    }

    // console.log("play_sound:", play_sound);


    if (play_sound) {
        let this_note = elem.dataset.note.split(' ');
        let root_note = elem.dataset.rootnote;
        // console.log("this note: ", this_note);
        // console.log("root note: ", root_note);
        synth.triggerAttackRelease(this_note, note_length, options['time']);
        if (document.getElementById('play_bass_checkbox').checked) {
            synthBass.triggerAttackRelease(root_note, note_length, options['time']);
        }
    } 
}

// End sequence
// =====================================
function play_end_sequence () {
    console.log("end sequence")
    let wait_time=0;
    let now = Tone.now()
    let note_seq = [];
    let indices = [];
    let note_length = 0.75;

    let i_end, i_mod;
    if (I_noteToGuess<4) {
        i_end = -1;  i_mod = -1;
    } else {
        i_end =8;  i_mod = 1;   
    }

    for (let i=I_noteToGuess; i!==i_end; i+=i_mod) {
        console.log(i);
        indices.push(i);
        // note_seq.push([wait_time, note_names[i]]);
        note_seq.push([wait_time, i]);
        wait_time+=note_length;
    }
    
    let counter = 0
    const seq = new Tone.Part(
        (time, note_ind) => {
            // synthRight.triggerAttackRelease(note, 0.8*note_length, time);
            console.log("event!!", counter, time, note_ind);
            elem = document.getElementsByName("note")[note_ind];
            let cl = document.getElementById(notes[indices[counter]]).classList;
            if (cl.contains("wrong_answer")) {
                document.getElementById(notes[indices[counter]]).className = "note sequence";
            }
            play_note(elem, 0.8*note_length, {play_sound:true, time:time});
            counter++;
        }, 
        note_seq,
    ).start();
    console.log(Tone.Transport.state);
    
    return Tone.Transport.toSeconds(wait_time+1.0)*1000
}

// Cadence
// =====================================
function play_cadence() {
    answer_p.innerText = "Cadence";
    let note_length = 0.75;
    console.log("cadence");

    const seq = new Tone.Part (
        (time, note) => {
            synthRight.triggerAttackRelease(note, 0.8*note_length, time);                
        }, 
        [[note_length*0, ['E3', 'E4', 'G4', 'C5']], 
         [note_length*1, ['F3', 'D4', 'A4', 'C5']],
         [note_length*2, ['G3', 'D4', 'G4', 'B4']],
         [note_length*3, ['C3', 'E4', 'G4', 'C5']]]
    ).start();        
}


