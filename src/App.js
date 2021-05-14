import React, { useEffect, useState } from "react";
import { initP5 } from "./utils/beats";

import BeatButton from "./components/BeatButton";

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [pairs, setPairs] = useState([]);
  // let hertz_freq_pairs = hertzs.flatMap((h) => freqs.map((f) => [h, f]));

  useEffect(() => {
    const hertzs = [200, 300];
    const freqs = [2, 4, 8, 16, 24, 40];
    let hertz_freq_pairs = hertzs.flatMap((h) => freqs.map((f) => [h, f]));
    shuffle(hertz_freq_pairs);
    setPairs(hertz_freq_pairs);
    initP5();
  }, []);

  return (
    <div className="flex flex-col items-center text-center justify-center h-screen">
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
    </div>
  );
}

export default App;
