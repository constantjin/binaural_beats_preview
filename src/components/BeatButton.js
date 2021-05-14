import React, { useState } from "react";
import { initBeat, playBeat, stopBeat } from "../utils/beats";
import { useStore, setPlayingState, setChecked } from "../stores";

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
    } else {
      setThisChecked(false);
      setChecked(false);
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
        onClick={(e) => {
          e.preventDefault();
          if (!globalIsPlaying) {
            initBeat(hertz, freq);
            setPlayingState(true);
            setThisPlaying(true);
            playBeat();
            setTimeout(() => {
              setListened(true);
              stopBeat();
              setPlayingState(false);
              setThisPlaying(false);
            }, 10000);
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
