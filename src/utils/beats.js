import * as Tone from "tone";
import { Howl } from "howler";

export function initTone() {
  window.mergedChannel = new Tone.Merge().toMaster();
  window.leftEar = new Tone.Oscillator();
  window.rightEar = new Tone.Oscillator();
  window.leftEar.connect(window.mergedChannel.left);
  window.rightEar.connect(window.mergedChannel.right);
  console.info("# DEBUG: Tone.js initialized.");
}

// Beat-related functions

export function initBeat(hertz, freq) {
  const left_freq = hertz - freq / 2;
  const right_freq = hertz + freq / 2;

  window.leftEar.set("frequency", left_freq);
  window.rightEar.set("frequency", right_freq);
  console.info(
    `# DEBUG: Tone.js - frequencies were set to ${left_freq} / ${right_freq}.`
  );
}

export function playBeat() {
  window.leftEar.start();
  window.rightEar.start();
  console.info("# DEBUG: Tone.js - a beat is playing.");
}

export function stopBeat() {
  window.leftEar.stop();
  window.rightEar.stop();
  console.info("# DEBUG: Tone.js - a beat was stopped.");
}

export function testBeat() {
  window.leftEar.set("frequency", 450);
  window.rightEar.set("frequency", 450);
  console.info("# DEBUG: Tone.js - test beat was set.");
}

export function setVolume(vol) {
  window.leftEar.set("volume", vol);
  window.rightEar.set("volume", vol);
}

// Carsound-related functions

function _initCarSoundPromise(sound_path, loop = false) {
  return new Promise((resolve, reject) => {
    if (window.player) {
      console.error(
        "# Error: Howler.js - window.howlPlayer should be cleared after each play!"
      );
      reject();
    } else {
      window.howlPlayer = new Howl({
        src: [sound_path],
        preload: true,
        loop: loop,
        html5: true,
        onload: () => {
          console.info(
            `# DEBUG: Howler.js - a carsound (${sound_path}) was loaded.`
          );
          resolve();
        },
      });
    }
  });
}

function _playAndStopCarSoundPromise() {
  return new Promise((resolve, reject) => {
    if (!window.howlPlayer) {
      console.error(
        "# Error: Howler.js - window.howlPlayer should be initialized!"
      );
      reject();
    } else {
      console.info(`# DEBUG: Howler.js - a carsound is playing.`);
      window.howlPlayer.once("end", () => {
        console.info(`# DEBUG: Howler.js - a carsound was stopped.`);
        resolve();
      });
      window.howlPlayer.play();
    }
  });
}

export async function playAndStopCarSound(sound_path) {
  try {
    await _initCarSoundPromise(sound_path);
    await _playAndStopCarSoundPromise();
    window.howlPlayer.unload();
    window.howlPlayer = null;
    console.info(`# DEBUG: Howler.js - a carsound was unloaded.`);
  } catch (e) {
    console.error(e);
  }
}

export async function playAndEndCarSound(sound_path) {
  try {
    await _initCarSoundPromise(sound_path);
    await _playAndStopCarSoundPromise();
  } catch (e) {
    console.error(e);
  }
}

export function setLoopAndPlayCarSound() {
  if (window.howlPlayer) {
    console.info(`# DEBUG: Howler.js - a carsound was set to LOOP.`);
    window.howlPlayer.loop(true);
    console.info(`# DEBUG: Howler.js - a LOOP carsound is playing.`);
    window.howlPlayer.play();
  }
}

export async function playLoopCarSound(sound_path) {
  try {
    await _initCarSoundPromise(sound_path, true);
    console.info(
      `# DEBUG: Howler.js - a LOOP carsound ${sound_path} was loaded.`
    );
    window.howlPlayer.play();
    console.info(`# DEBUG: Howler.js - a LOOP carsound is playing.`);
  } catch (e) {
    console.error(e);
  }
}

export function stopLoopCarSound() {
  window.howlPlayer.stop();
  console.info(`# DEBUG: Howler.js - a LOOP carsound was stopped.`);
  window.howlPlayer.unload();
  window.howlPlayer = null;
  console.info(`# DEBUG: Howler.js - a LOOP carsound was unloaded.`);
}

export function checkCarSoundPlaying() {
  if (!window.howlPlayer) {
    return false;
  } else {
    return window.howlPlayer.playing();
  }
}
