
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
        
    const synth = new Tone.PolySynth();
    const vol_main = new Tone.Volume(-8).toDestination();
    const vol_bass = new Tone.Volume(-8).toDestination();
    
    const synthBass  = new Tone.AMSynth().connect(vol_bass); 
    const synthRight = new Tone.PolySynth(Tone.FMSynth).connect(vol_main); 
    const synthWrong = new Tone.PolySynth(Tone.FMSynth).connect(vol_main); 
    synthRight.set(synthRightDict); 
    synthWrong.set(synthWrongDict); 
    synthBass.set(synthBassDict); 


    