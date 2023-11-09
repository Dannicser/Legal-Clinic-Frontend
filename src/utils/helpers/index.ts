export const onCutText = (text: string, start: number = 0, end: number = text.length, spread: boolean = false) => {
  const points = spread ? "..." : "";

  return text.slice(start, end) + points;
};
