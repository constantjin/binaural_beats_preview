import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BeatButton from "../components/BeatButton";
import Button from "../components/Button";
import { initStore, useStore } from "../stores";

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function BeatsSelector() {
  const [pairs, setPairs] = useState([]);
  const [pairsLength, setPairsLength] = useState(0);
  const [error, setError] = useState("");
  const binaural = useStore((state) => state.binaural);
  const num_listened = useStore((state) => state.num_listened);
  let history = useHistory();

  const handleNext = () => {
    if (num_listened < pairsLength) {
      setError("아직 듣지 않은 소리가 있습니다. 모든 소리를 들어 주세요.");
    } else if (binaural.hertz === 0 || binaural.freq === 0) {
      setError("가장 긍정적인 소리에 체크해 주세요.");
    } else {
      setError("");
      history.push("/post_inst");
    }
  };

  useEffect(() => {
    const hertzs = [300, 400, 500];
    const freqs = [2, 4, 8, 16, 24, 40];
    let hertz_freq_pairs = hertzs.flatMap((h) => freqs.map((f) => [h, f]));
    shuffle(hertz_freq_pairs);
    setPairs(hertz_freq_pairs);
    setPairsLength(hertz_freq_pairs.length);
    initStore();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-y-2 divide-y-2">
        <p>
          아래 스피커 버튼(🔈)을 눌러서 소리를 듣고 <br />
          가장 <b>긍정적인</b> 감정상태를 불러일으킨 소리에 체크해 주세요.
        </p>
        <p>청취한 소리 (✔️ 표시) 중 한 가지 소리만 선택 가능합니다.</p>
      </div>
      <br />
      <div className="grid grid-cols-4 gap-4">
        {pairs.map((pair) => {
          let [h, f] = pair;
          let k = `${h}_${f}`;
          return <BeatButton hertz={h} freq={f} key={k} />;
        })}
      </div>
      <br />
      <Button text="다음으로" onClick={handleNext} />
      <span className="block font-medium tracking-wide text-red-500 text-base mt-1 text-center mb-3">
        {error}
      </span>
    </div>
  );
}
