const demoCode = async (context) => {
    await context.audioWorklet.addModule('bypass-processor.js');
    const oscillator = new OscillatorNode(context);
    const bypasser = new AudioWorkletNode(context, 'bypass-processor');
    oscillator.connect(bypasser).connect(context.destination);
    oscillator.start();
  };

    const audioContext = new AudioContext();

    // Creates a button and its logic.
    let isFirstClick = true;
    const eButton = document.getElementById('start');
    eButton.textContent = 'START';
    eButton.disabled = _detectAudioWorklet() ? false : true;
    eButton.onclick = (event) => {
      if (eButton.textContent === 'START') {
        if (isFirstClick) {
          demoCode(audioContext);
          isFirstClick = false;
        }
        audioContext.resume();
        console.log('Context resumed.');
        eButton.textContent = 'STOP';
      } else {
        audioContext.suspend();
        console.log('Context suspended.');
        eButton.textContent = 'START';
      }
    };

    function _detectAudioWorklet() {
      let context = new OfflineAudioContext(1, 1, 44100);
      return Boolean(
          context.audioWorklet &&
          typeof context.audioWorklet.addModule === 'function');
    }