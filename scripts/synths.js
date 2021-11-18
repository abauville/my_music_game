
    synthRightDict = {"harmonicity":8,
    "modulationIndex": 2,
    "oscillator" : {
        "type": "sine"
    },
    "envelope": {
        "attack": 0.001,
        "decay": 2,
        "sustain": 0.1,
        "release": 2
    },
    "modulation" : {
        "type" : "square"
    },
    "modulationEnvelope" : {
        "attack": 0.002,
        "decay": 0.2,
        "sustain": 0,
        "release": 0.2
    }
    }
    synthWrongDict = {
    "harmonicity":8,
    "modulationIndex": 2,
    "oscillator" : {
        "type": "triangle"
    },
    "envelope": {
        "attack": 0.015,
        "decay": 2,
        "sustain": 0.1,
        "release": 2
    },
    "modulation" : {
        "type" : "square"
    },
    "modulationEnvelope" : {
        "attack": 0.02,
        "decay": 0.2,
        "sustain": 0,
        "release": 0.2
    }
    }

    const synthBass  = new Tone.FMSynth().toDestination(); 
    const synthRight = new Tone.PolySynth(Tone.FMSynth).toDestination(); 
    const synthWrong = new Tone.PolySynth(Tone.FMSynth).toDestination(); 
    synthRight.set(synthRightDict); 
    synthWrong.set(synthWrongDict); 