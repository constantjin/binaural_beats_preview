import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import RatingScale from "../components/RatingScale";

export default function PostRating() {
  const [arousal, setArousal] = useState(0);
  const [dominance, setDominance] = useState(0);
  const [valence, setValence] = useState(0);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");
  let history = useHistory();
  const timerID = useRef();

  useEffect(() => {
    const submitRating = async () => {
      if (finished) {
        setError("");
        if (timerID.current) {
          clearTimeout(timerID.current);
        }
        history.push("/end");
      }
    };

    submitRating();
  }, [finished, arousal, dominance, valence, history]);

  useEffect(() => {
    timerID.current = setTimeout(() => {
      setFinished(true);
    }, 10000);
  }, []);

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
    </div>
  );
}
