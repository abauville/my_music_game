// =======-
var context = null;
var oscillator = null;  
var gainNode = null;
function getOrCreateContext() {
    if (!context) {
        context = new AudioContext();
        oscillator = context.createOscillator();
        gainNode = context.createGain();
        gainNode.gain.setValueAtTime(0.001, context.currentTime); 
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        oscillator.start(0);
        isStarted = true; 
    }
    return context;
}

var isStarted = false;
function playSound(m, type) {
    getOrCreateContext();
    
    oscillator.frequency.setTargetAtTime(Math.pow(2,(m-69)/12)*440, context.currentTime, 0);
    gainNode.gain.setValueAtTime(gainNode.gain.value, context.currentTime); 
    gainNode.gain.exponentialRampToValueAtTime(0.5, context.currentTime + 0.02);
    if (!isStarted) {
        oscillator.start(0);
        isStarted = true;
    } else {
        context.resume();
    }
}

function stopSound() {
    gainNode.gain.setValueAtTime(gainNode.gain.value, context.currentTime); 
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.02);        
}

