import React, { useState } from "react";
import {
  initBeat,
  playBeat,
  stopBeat,
  playAndEndCarSound,
  setLoopAndPlayCarSound,
  stopLoopCarSound,
  checkCarSoundPlaying,
} from "../utils/beats";
import {
  useStore,
  setPlayingState,
  setChecked,
  setBinaural,
  markListened,
} from "../stores";
import car_dummy from "../sounds/car_dummy.wav";

export default function BeatButton({ hertz, freq }) {
  const [listened, setListened] = useState(false);
  const [thisChecked, setThisChecked] = useState(false);
  const [thisPlaying, setThisPlaying] = useState(false);
  const globalIsPlaying = useStore((state) => state.isPlaying);
  const globalChecked = useStore((state) => state.checked);

  const handleCheckbox = (event) => {
    if (event.target.checked) {
      setThisChecked(true);
      setChecked(true);
      setBinaural(hertz, freq);
    } else {
      setThisChecked(false);
      setChecked(false);
      setBinaural(0, 0);
    }
  };

  const disableCheckbox = () => {
    if (!listened) {
      return true;
    } else {
      if (thisChecked) {
        return false;
      } else {
        return globalChecked;
      }
    }
  };

  return (
    <div className="m-5">
      <button
        className="h-10 px-3 border-2 rounded-lg"
        onClick={async (e) => {
          e.preventDefault();
          if (!globalIsPlaying) {
            if (checkCarSoundPlaying()) {
              stopLoopCarSound();
              stopBeat();
            }
            initBeat(hertz, freq);
            setPlayingState(true);
            setThisPlaying(true);
            playBeat();
            await playAndEndCarSound(car_dummy);
            if (!listened) {
              setListened(true);
              markListened();
            }
            setLoopAndPlayCarSound();
            setPlayingState(false);
            setThisPlaying(false);
          } else {
            console.log("One beat is currently playing!");
          }
        }}
      >
        <span>{thisPlaying ? "🎵" : listened ? "✔️" : "🔈"}</span>
        {/* {listened && <span className="ml-2">✔️</span>} */}
      </button>
      <input
        type="checkbox"
        name="select"
        disabled={disableCheckbox()}
        onChange={handleCheckbox}
        className="ml-4"
      />
    </div>
  );
}
