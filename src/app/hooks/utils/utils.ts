export const updateVolume = (
  analyser: AnalyserNode,
  dataArray: Uint8Array,
  bufferLength: number,
  setVolume: (volume: number) => void
) => {
  analyser.getByteFrequencyData(dataArray);
  const volume = dataArray.reduce((a, b) => a + b) / bufferLength;
  setVolume(volume);
  requestAnimationFrame(() =>
    updateVolume(analyser, dataArray, bufferLength, setVolume)
  );
};
