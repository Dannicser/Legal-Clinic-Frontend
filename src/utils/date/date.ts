import dayjs from "dayjs";

export const onGetCurrentDate = (): string => {
  return new Date().toISOString().slice(0, 10).split("-").reverse().join(".");
};

export const onGetMonth = (date: string): string => {
  const month = dayjs(date).format("M");

  switch (month) {
    case "1":
      return "Января";
    case "2":
      return "Февраля";
    case "3":
      return "Марта";
    case "4":
      return "Апреля";
    case "5":
      return "Мая";
    case "6":
      return "Июня";
    case "7":
      return "Июля";
    case "8":
      return "Августа";
    case "9":
      return "Сентября";
    case "10":
      return "Октября";
    case "11":
      return "Ноября";
    case "12":
      return "Декабря";

    default:
      return month;
  }
};

export const onGetWeek = (date: string): string => {
  const week = dayjs(date).format("dddd");

  switch (week) {
    case "Monday":
      return "Понедельник";
    case "Tuesday":
      return "Вторник";
    case "Wednesday":
      return "Среда";
    case "Thursday":
      return "Четверг";
    case "Friday":
      return "Пятница";
    case "Saturday":
      return "Суббота";
    case "Sunday":
      return "Воскресенье";

    default:
      return "";
  }
};
