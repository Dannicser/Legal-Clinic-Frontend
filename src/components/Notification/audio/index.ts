import sound from "./sound.mp3";

export const onSoundEffect = () => {
  const audio = new Audio();
  audio.src = sound;

  audio.play();
};
