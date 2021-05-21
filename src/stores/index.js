import create from "zustand";

export const useStore = create(() => ({
  isPlaying: false,
  checked: false,
  binaural: { hertz: 0, freq: 0 },
  num_listened: 0,
}));

export const getStore = () => {
  return useStore.getState();
};

export const initStore = () => {
  useStore.setState((state) => ({
    isPlaying: false,
    checked: false,
    binaural: { hertz: 0, freq: 0 },
    num_listened: 0,
  }));
};

export const setPlayingState = (playState) => {
  useStore.setState((state) => ({ ...state, isPlaying: playState }));
};

export const setChecked = (checkState) => {
  useStore.setState((state) => ({ ...state, checked: checkState }));
};

export const setBinaural = (hertz, freq) => {
  useStore.setState((state) => ({ ...state, binaural: { hertz, freq } }));
};

export const markListened = () => {
  useStore.setState((state) => ({
    ...state,
    num_listened: state.num_listened + 1,
  }));
};
