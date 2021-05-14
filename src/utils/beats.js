import * as Tone from "tone";

export function initP5() {
  window.mergedChannel = new Tone.Merge().toMaster();
  window.leftEar = new Tone.Oscillator();
  window.rightEar = new Tone.Oscillator();
  window.leftEar.connect(window.mergedChannel.left);
  window.rightEar.connect(window.mergedChannel.right);
}

export function initBeat(hertz, freq) {
  const left_freq = hertz - freq / 2;
  const right_freq = hertz + freq / 2;

  window.leftEar.set("frequency", left_freq);
  window.rightEar.set("frequency", right_freq);
}

export function playBeat() {
  window.leftEar.start();
  window.rightEar.start();
}

export function stopBeat() {
  window.leftEar.stop();
  window.rightEar.stop();
}
