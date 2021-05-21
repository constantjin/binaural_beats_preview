import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { initTone } from "./utils/beats";

import VolumeTest from "./pages/VolumeTest";
import PreInstruction from "./pages/PreInstruction";
import PreSound from "./pages/PreSound";
import PreRating from "./pages/PreRating";
import BeatsSelector from "./pages/BeatsSelector";
import PostInstruction from "./pages/PostInstruction";
import PostSound from "./pages/PostSound";
import PostRating from "./pages/PostRating";
import End from "./pages/End";

export default function App() {
  useEffect(() => {
    initTone();
  }, []);
  return (
    <div className="flex flex-col items-center text-center justify-center h-screen">
      <Router basename="/binaural_beats_preview">
        <Switch>
          <Route path="/" exact component={VolumeTest} />
          <Route path="/pre_inst" exact component={PreInstruction} />
          <Route path="/pre_sound" exact component={PreSound} />
          <Route path="/pre_rating" exact component={PreRating} />
          <Route path="/beats" exact component={BeatsSelector} />
          <Route path="/post_inst" exact component={PostInstruction} />
          <Route path="/post_sound" exact component={PostSound} />
          <Route path="/post_rating" exact component={PostRating} />
          <Route path="/end" exact component={End} />
        </Switch>
      </Router>
    </div>
  );
}
