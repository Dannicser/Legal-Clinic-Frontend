import dayjs from "dayjs";

export const onCutText = (text: string, start: number = 0, end: number = text.length, spread: boolean = false) => {
  const points = spread ? "..." : "";

  return text.slice(start, end) + points;
};

//function for safari support
export const onIsValidDate = (date: string) => {
  if (dayjs(date).locale("ru").format("D MMMM") === "Invalid Date") {
    return date;
  } else {
    return dayjs(date).locale("ru").format("D MMMM");
  }
};
