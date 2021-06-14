import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import RatingScale from "../components/RatingScale";

export default function PostRating() {
  const [arousal, setArousal] = useState(0);
  const [dominance, setDominance] = useState(0);
  const [valence, setValence] = useState(0);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");
  const [remainingTime, setRemainingTime] = useState(20);
  const [timeColor, setTimeColor] = useState("text-black");
  const [timeText, setTimeText] = useState(
    "최대한 빠르고 정확하게 응답해 주세요."
  );

  let history = useHistory();
  const timerID = useRef();

  useEffect(() => {
    timerID.current = setInterval(() => {
      setRemainingTime((e) => e - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (remainingTime === 10) {
      setTimeColor("text-red-300");
      setTimeText("10초 지났습니다.");
    } else if (remainingTime <= 5 && remainingTime >= 1) {
      setTimeColor("text-red-500");
      setTimeText(`${remainingTime}초 남았습니다.`);
    } else if (remainingTime <= 0) {
      clearInterval(timerID.current);
      setFinished(true);
    }
  }, [remainingTime]);

  useEffect(() => {
    const submitRating = async () => {
      if (finished) {
        setError("");
        if (timerID.current) {
          clearInterval(timerID.current);
        }
        history.push("/end");
      }
    };

    submitRating();
  }, [finished, arousal, dominance, valence, history]);

  useEffect(() => {
    if (!(arousal === 0 || dominance === 0 || valence === 0)) {
      console.log(
        `DEBUG: arousal: ${arousal}, dominance: ${dominance}, valence: ${valence}`
      );
      setFinished(true);
    }
  }, [arousal, dominance, valence]);

  return (
    <div>
      <span className="block font-medium tracking-wide text-red-500 text-base mt-1 text-center mb-3">
        {error}
      </span>
      <RatingScale
        ratingTitle="Arousal (자극적임)"
        leftText="← 안정적"
        rightText="자극적 →"
        setRating={setArousal}
      />
      <div className="mt-8">
        <RatingScale
          ratingTitle="Dominance (지배적임)"
          leftText="← 지배되는"
          rightText="지배하는 →"
          setRating={setDominance}
        />
      </div>
      <div className="mt-8">
        <RatingScale
          ratingTitle="Valence (감정가)"
          leftText="← 불쾌한"
          rightText="유쾌한 →"
          setRating={setValence}
        />
      </div>
      <span
        className={`block font-medium tracking-wide text-lg mt-5 text-center mb-3 ${timeColor}`}
      >
        {timeText}
      </span>
    </div>
  );
}
