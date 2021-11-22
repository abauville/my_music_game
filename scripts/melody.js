intervals = [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6];
interval_probas = [.05, .1, .2, .2, .7, 1.0, .5, 1.0, .7, .2, .2, .1, .05];

function get_melody() {
    let local_proba = [0, 0, 0, 0, 0, 0, 0, 0];
    
    I_guesses[0] = getRandomIntWithWeights(probabilities); // random number
    let I_ref;
    let dist;
    console.log("num_events: ", num_events);
    for (i=1; i<num_events; i++) {
        I_ref = I_guesses[i-1];
        for (i_note=0; i_note<8; i_note++) {
            dist = Math.abs(i_note-I_ref);
            
            if (dist==0) { // offset the probability of unison, also avoids division by 0
                dist = 5;
            }
            dist = Math.pow(dist,1.5); // dilates the probabilities, accentuates the preference for small intervals
            console.log("dist, proba", dist, probabilities[i_note]);

            local_proba[i_note] = 1.0/dist * probabilities[i_note]; // compound probability that accounts for switch on/off of note (via probabilites) and the size of the interval
        }
        console.log("local_proba:", local_proba);
        I_guesses[i] = getRandomIntWithWeights(local_proba); // random number
    }
    console.log("melody, I_guesses:", I_guesses);
    return I_guesses;
}