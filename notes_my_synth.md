# Principle

## Record a piano
record many notes with a range of intensity, without trying to hit at a specific intensity. Record until the sound dies for some notes to capture the ADSR enveloppe. For other notes recording for one second is enough (otherwise it would be too time consuming).

## Process

For all recordings:
- compute the spectogram
- get the relative intensity of each harmonic
- optimize a function to create this sound based on sinusoids (maybe just fft) and the decay of each harmonic -> ADSR enveloppe?
- The weight of harmonics should also be a function of the velocity (i.e. how strong the note is hit)
- 
