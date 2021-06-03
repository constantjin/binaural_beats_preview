import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import RatingScale from "../components/RatingScale";

export default function PreRating() {
  const [arousal, setArousal] = useState(0);
  const [dominance, setDominance] = useState(0);
  const [valence, setValence] = useState(0);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeColor, setTimeColor] = useState("text-black");

  let history = useHistory();
  const timerID = useRef();

  useEffect(() => {
    timerID.current = setInterval(() => {
      setElapsedTime((e) => e + 10);
    }, 10000);
  }, []);

  useEffect(() => {
    if (elapsedTime === 10) {
      setTimeColor("text-red-300");
    } else if (elapsedTime === 20) {
      setTimeColor("text-red-400");
    } else if (elapsedTime >= 30) {
      setTimeColor("text-red-500");
    }
  }, [elapsedTime]);

  useEffect(() => {
    const submitRating = async () => {
      if (finished) {
        setError("");
        if (timerID.current) {
          clearInterval(timerID.current);
        }
        history.push("/beats");
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
        className={`block font-medium tracking-wide text-base mt-5 text-center mb-3 ${timeColor}`}
      >
        {elapsedTime > 0
          ? `${elapsedTime}초 지났습니다.`
          : "최대한 빠르고 정확하게 응답해 주세요."}
      </span>
    </div>
  );
}
