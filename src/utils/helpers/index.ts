import dayjs from "dayjs";

export const onCutText = (text: string = "", start: number = 0, end: number = text.length, spread: boolean = false) => {
  const points = spread ? "..." : "";

  return text.slice(start, end) + points;
};

//function for safari support
export const onIsValidDate = (date: string) => {
  if (dayjs(date).locale("ru").format("D MMMM") === "Invalid Date") {
    return onTransformDate(date);
  } else {
    return dayjs(date).locale("ru").format("D MMMM");
  }
};

//function for safari support
export const onTransformDate = (date: string): string => {
  const [month, day] = date.split("-");

  const transformedMonth = onTransformMonth(month);
  const transformedDay = onTransformDay(day);

  return `${transformedDay} ${transformedMonth}`;
};

const onTransformDay = (day: string): string => {
  return Number(day) < 10 ? day.slice(1) : day;
};

const onTransformMonth = (month: string) => {
  switch (month) {
    case "01":
      return "Января";
    case "02":
      return "Февраля";
    case "03":
      return "Марта";
    case "04":
      return "Апреля";
    case "05":
      return "Мая";
    case "06":
      return "Июня";
    case "07":
      return "Июля";
    case "08":
      return "Августа";
    case "09":
      return "Сентября";
    case "10":
      return "Октября";
    case "11":
      return "Ноября";
    case "12":
      return "Декабря";
  }
};
