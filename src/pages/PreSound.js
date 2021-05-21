import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { playAndStopCarSound } from "../utils/beats";
import car_dummy from "../sounds/car_dummy2.wav";

export default function PreSound() {
  let history = useHistory();
  useEffect(() => {
    const asyncInit = async () => {
      await playAndStopCarSound(car_dummy);
      history.push("/pre_rating");
    };

    asyncInit();
  }, [history]);
  return (
    <div>
      <p className="text-7xl">+</p>
    </div>
  );
}
