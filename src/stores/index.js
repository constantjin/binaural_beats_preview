import create from "zustand";

export const useStore = create(() => ({
  isPlaying: false,
  checked: false,
}));

export const getStore = () => {
  return useStore.getState();
};

export const setPlayingState = (playState) => {
  useStore.setState((state) => ({ isPlaying: playState }));
};

export const setChecked = (checkState) => {
  useStore.setState((state) => ({ ...state, checked: checkState }));
};
