
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

    synthBassDict = {
        "harmonicity": 2.0,
        "oscillator": {
            "type": "triangle"
        },
        "envelope": {
            "attack": 0.003,
            "decay": 0.01,
            "sustain": 0.5,
            "release": 0.4
        },
        "modulation" : {
                "volume" : 18,
            "type": "sine"
        },
        "modulationEnvelope" : {
            "attack": 0.01,
            "decay": 0.01,
            "sustain": 0.5,
            "release": 0.1
        }
    }
        

    const synthBass  = new Tone.AMSynth().toDestination(); 
    const synthRight = new Tone.PolySynth(Tone.FMSynth).toDestination(); 
    const synthWrong = new Tone.PolySynth(Tone.FMSynth).toDestination(); 
    synthRight.set(synthRightDict); 
    synthWrong.set(synthWrongDict); 
    synthBass.set(synthBassDict); 
    