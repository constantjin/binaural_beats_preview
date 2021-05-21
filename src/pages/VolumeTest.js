import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import {
  testBeat,
  playBeat,
  stopBeat,
  setVolume,
  playLoopCarSound,
  stopLoopCarSound,
} from "../utils/beats";
import car_dummy from "../sounds/car_dummy2.wav";

export default function VolumeTest() {
  const [started, setStarted] = useState(false);
  const [currVolume, setCurrVolume] = useState(-20);
  let history = useHistory();
  return (
    <div>
      {!started ? (
        <div>
          <p className="text-base px-5 mb-5">
            간단한 사운드 테스트를 진행하겠습니다. <br />
            이어폰/헤드셋을 착용하신 후, <br />
            아래의 시작 버튼을 클릭해 주세요
          </p>
          <Button
            text="시작"
            onClick={() => {
              setStarted(true);
              testBeat();
              playBeat();
              playLoopCarSound(car_dummy);
            }}
          />
        </div>
      ) : (
        <div>
          <p>
            현재 <b>자동차 소리</b>와 함께 <br />
            삐- 소리의 <b>기계음</b>이 재생중입니다.
            <br />
            <br />
            <b>기계음</b>의 크기를 집중해야만 들을 수 있을 정도로
            <br />
            <b>작게</b> 조절하신 후 아래 버튼을 클릭해 주세요
          </p>
          <hr className="border-1 w-full my-4" />
          <label htmlFor="volume" className="mr-5">
            🔈 기계음 볼륨
          </label>
          <input
            type="range"
            id="volume"
            name="volume"
            min="-40"
            max="-20"
            step="0.1"
            value={currVolume}
            onChange={(event) => {
              setCurrVolume(event.target.value);
              setVolume(currVolume);
            }}
            className="block w-full h-3 mt-3"
          />
          <br />
          <Button
            text="다음 단계로"
            onClick={() => {
              stopBeat();
              stopLoopCarSound();
              history.push("/pre_inst");
            }}
          />
        </div>
      )}
    </div>
  );
}
