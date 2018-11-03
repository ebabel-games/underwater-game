'use strict';

const gain = (audioContext, gainST, gainSTC, gainET, gainETC, startTime, endTime) => {
  const envelope = audioContext.createGain();
  envelope.gain.value = 0;
  envelope.gain.setTargetAtTime(gainST, startTime, gainSTC);
  envelope.gain.setTargetAtTime(gainET, endTime, gainETC);

  return envelope;
}

const filter = (audioContext, biquadType, biquadFrequency, biquadRamp, startTime, endTime) => {
  const biquadFilter = audioContext.createBiquadFilter();
  biquadFilter.type = biquadType;
  biquadFilter.frequency.setValueAtTime(biquadFrequency, startTime);
  biquadFilter.frequency.linearRampToValueAtTime(biquadRamp, endTime);

  return biquadFilter;
};

class Sound {
  constructor(delay, frequency, duration, oscillatorType = 'triangle', gainST = null, gainSTC = null, gainET = 0, gainETC = null, biquadType = null, biquadFrequency = null, biquadRamp = null) {
    this.delay = delay;
    this.frequency = frequency;
    this.duration = duration;
    this.oscillatorType = oscillatorType;

    this.gainST = gainST;
    this.gainSTC = gainSTC;
    this.gainET = gainET;
    this.gainETC = gainETC;

    this.biquadType = biquadType;
    this.biquadFrequency = biquadFrequency;
    this.biquadRamp = biquadRamp;

    this.enableGain = (this.gainST && this.gainSTC && this.gainETC);
    this.enableBiquad = (this.biquadType && this.biquadFrequency && this.biquadRamp);
  }

  play() {
    const audioContext = new (AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    
    const startTime = audioContext.currentTime + this.delay;
    const endTime = startTime + this.duration;
    const _filter = (this.enableBiquad) ?
      filter(audioContext, this.biquadType, this.biquadFrequency, this.biquadRamp, startTime, endTime,)
      : null;
    const _gain = (this.enableGain) ?
      gain(audioContext, this.gainST, this.gainSTC, this.gainET, this.gainETC, startTime, endTime)
      : null;

    if (this.enableBiquad && this.enableGain) {
      _filter.connect(audioContext.destination);
      _gain.connect(_filter);
      oscillator.connect(_gain);
    }

    if (this.enableBiquad && !this.enableGain) {
      _filter.connect(audioContext.destination);
      oscillator.connect(_filter);
    }

    if (!this.enableBiquad && this.enableGain) {
      _gain.connect(audioContext.destination);
      oscillator.connect(_gain);
    }

    if (!this.enableBiquad && !this.enableGain) {
      oscillator.connect(audioContext.destination);
    }

    oscillator.type = this.oscillatorType;
    oscillator.frequency.value = this.frequency;
    oscillator.start(startTime);
    oscillator.stop(endTime + parseFloat((this.enableGain) ? this.gainST : 0));

    return oscillator;
  }
};

module.exports = Sound;
