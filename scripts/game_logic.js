// Game type
// =====================================
function switch_game_type () {
    if (this.checked) {
        game_type = this.value;
        console.log("Here, ", game_type);
        init_game_type();
    }
}

function init_game_type() {
    if (game_type=='note') {
        document.getElementById('play_end_sequence_checkbox').checked = true;
        document.getElementById('play_end_sequence_checkbox').disabled = false;
        document.getElementById('play_bass_checkbox').checked = false;
        document.getElementById('play_bass_checkbox').disabled = true;
        document.getElementById('use_chord_inversion_checkbox').checked = false;
        document.getElementById('use_chord_inversion_checkbox').disabled = true;
    } else if (game_type=='chord' || game_type=='chord_progression') {
        document.getElementById('play_end_sequence_checkbox').checked = false;
        document.getElementById('play_end_sequence_checkbox').disabled = true;
        document.getElementById('use_chord_inversion_checkbox').checked = true;
        document.getElementById('use_chord_inversion_checkbox').disabled = false;
        document.getElementById('play_bass_checkbox').checked = true;
        document.getElementById('play_bass_checkbox').disabled = false;
    } else {
        console.log("Error: unknown game type:", game_type);
    }
    answer_p.innerText =  this.value;
    console.log("change game type");
    for (let i=0; i<notes.length;i++) {
        let m = midi_num[i];
        let elem = document.getElementById(notes[i])
        if (game_type=='note') {
            elem.innerText = notes[i];
            elem.dataset.note = note_names[i];
            elem.style.fontVariantCaps = "";
        }
        else if (game_type=='chord') {
            elem.innerText = chords[i];
            elem.dataset.note = chord_names[i];
            elem.style.fontVariantCaps = "normal";
        } else if (game_type=='chord_progression') {
            elem.innerText = chords[i];
            elem.dataset.note = chord_names[i];
            elem.style.fontVariantCaps = "normal";
        } else {
            console.log("Error: unknown game type:", game_type);
        }
        
        elem.onmousedown = answer;
        document.getElementById('start').innerHTML = "<span class=greeting_emoji></span><br>start";
        document.getElementById('start').className="start";
        document.getElementById('start').onclick = start;
        
    }
    document.addEventListener('keypress', logKey);
    console.log("game type: ", game_type);
}

// Start
// =====================================
function start(){
    Tone.Transport.start();
    new_game();
    document.getElementById('start').onclick =  new_game.bind(null, false);
}

// Sequence
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

