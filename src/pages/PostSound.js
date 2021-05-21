import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  initBeat,
  playBeat,
  stopBeat,
  playAndStopCarSound,
} from "../utils/beats";
import { getStore } from "../stores";
import car_dummy from "../sounds/car_dummy2.wav";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function PostSound() {
  let history = useHistory();
  const binaural = getStore().binaural;
  useEffect(() => {
    const asyncInit = async () => {
      initBeat(binaural.hertz, binaural.freq);
      playBeat();
      await sleep(1000 * 60); // 1 minute
      await playAndStopCarSound(car_dummy);
      stopBeat();
      history.push("/post_rating");
    };

    asyncInit();
  }, [history, binaural]);
  return (
    <div>
      <p className="text-7xl">+</p>
    </div>
  );
}
