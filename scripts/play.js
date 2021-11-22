// Note
// =====================================
function play_note(elem, note_length='4n', play_sound=null, time=Tone.now()) {
    console.log("play_note: ", play_sound)
    let this_note = elem.dataset.note.split(' ');
    let rootnote = elem.dataset.rootnote;

    if (elem.classList.contains("right_answer")) {
        synth = synthRight;
    } else {
        synth = synthWrong;
    }

    if (play_sound == null) { // the default value allows the checkbox to be overriden (e.g. for the start button)
        if (document.getElementById('play_sound_checkbox').checked) {
            play_sound=true;
        } else {
            play_sound=false;
        }
    }

    if (play_sound) {
        
        synth.triggerAttackRelease(this_note, note_length, time);
        if (document.getElementById('play_bass_checkbox').checked) {
            synthBass.triggerAttackRelease(rootnote, note_length, time);
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
        note_seq.push([wait_time, note_names[i]]);
        wait_time+=note_length;
    }
    
    let counter = 0
    const seq = new Tone.Part(
        (time, note) => {
            synthRight.triggerAttackRelease(note, 0.8*note_length, time);
            console.log("event!!", counter, time, note);
            let cl = document.getElementById(notes[indices[counter]]).classList;
            if (cl.contains("wrong_answer")) {
                document.getElementById(notes[indices[counter]]).className = "note sequence";
            }
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


