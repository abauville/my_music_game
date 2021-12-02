// Game type
// =====================================
function switch_game_type () {
    if (this.checked) {
        game_type = this.value;
        init_game_type();
    }
}

function init_game_type() {
    if (game_type=='note') {
        if (num_events==1) {
            document.getElementById('play_end_sequence_checkbox').checked = true;
            document.getElementById('play_end_sequence_checkbox').disabled = false;
        } else {
            document.getElementById('play_end_sequence_checkbox').checked = false;
            document.getElementById('play_end_sequence_checkbox').disabled = true;
        }
        
        document.getElementById('play_bass_checkbox').checked = false;
        document.getElementById('play_bass_checkbox').disabled = true;
        document.getElementById('use_chord_inversion_checkbox').checked = false;
        document.getElementById('use_chord_inversion_checkbox').disabled = true;
    } else if (game_type=='chord') {
        document.getElementById('play_end_sequence_checkbox').checked = false;
        document.getElementById('play_end_sequence_checkbox').disabled = true;
        document.getElementById('use_chord_inversion_checkbox').checked = true;
        document.getElementById('use_chord_inversion_checkbox').disabled = false;
        document.getElementById('play_bass_checkbox').checked = true;
        document.getElementById('play_bass_checkbox').disabled = false;
    } else {
        console.log("Error: unknown game type:", game_type);
    }
    
    answer_p.innerText =  game_type;
    
    
    // console.log("change game type");
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
        } else {
            console.log("Error: unknown game type:", game_type);
        }
        
        elem.onmousedown = answer;
        document.getElementById('start').innerHTML = "<span class=greeting_emoji></span><br>start";
        document.getElementById('start').className="start";
        document.getElementById('start').onclick = start;
        
    }
    document.addEventListener('keypress', logKey);
    // console.log("game type: ", game_type);
}

// Start
// =====================================
function start(){
    Tone.Transport.start();
    new_game();
    document.getElementById('start').onclick =  new_game.bind(null, false);
}

// Set button answer class
// =====================================
function set_button_answer_class(I_right){
    // Assign right/wrong_answer class to buttons
    for (let i=0; i<notes.length;i++) {
        let elem = document.getElementById(notes[i]);
        elem.className = "note"; // clear the classList
        if (i==I_right){
            elem.classList.add("right_answer");
            if (game_type == 'note') {
                elem.dataset.note = note_names[I_right];
            } else if (game_type == 'chord') {
                elem.dataset.note = chord_names[I_right];
            } else {
                console.log("Error: unknown game_type");
            }
        } else {
            elem.classList.add("wrong_answer");
        }   
    }
}


// Multi guesses logic
// =====================================
function init_num_events () {
    num_events = Number(this.value);
    I_guesses = Array(num_events).fill(0);
    document.getElementById("num_events_label").innerText = num_events;
    create_multiguess_buttons();
    init_game_type();    
}

function create_multiguess_buttons () {
    document.getElementById("multi_guess_tracker_div").innerHTML = ""; // clean up
    for (i=0; i<num_events; i++) {
        let btn = document.createElement("button");    
        btn.id = "multi_guess_tracker_" + i;
        btn.disabled = "disabled";
        document.getElementById("multi_guess_tracker_div").appendChild(btn);
    }   
    init_multiguess_buttons ()
}

function init_multiguess_buttons () {
    for (i=0; i<num_events; i++) {
        let btn = document.getElementById("multi_guess_tracker_" + i);
        btn.className = "tracker";
    }
}

