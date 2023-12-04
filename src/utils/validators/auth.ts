export const onValidateEmail = (rule: any, value: string) => {
  const regex =
    /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  return new Promise((resolve, reject) => {
    if (value && value.length > 30) {
      reject("Слишком длинный адрес электронной почты");
    }
    if (value && value.includes(" ")) {
      reject("Запрещено использование пробелов");
    } else if (value && regex.test(value)) {
      resolve("");
    } else {
      reject("Введите корректный адрес электронной почты");
    }
  });
};

export const onValidateName = (rule: any, value: string) => {
  const regex = /^[А-я]/g;

  return new Promise((resolve, reject) => {
    if (value.includes(" ")) {
      reject("Удалите лишние пробелы");
    }
    if (!regex.test(value)) {
      reject("Только русские символы");
    } else {
      resolve("");
    }
  });
};

export const onValidatePassword = (rule: any, value: string) => {
  const regex = /(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
  return new Promise((resolve, reject) => {
    if (value && value.includes(" ")) {
      reject("Удалите лишние пробелы");
    }
    if (value && value.length < 6) {
      reject("Слишком короткий пароль");
    }
    if (value && value.length > 15) {
      reject("Слишком длинный пароль");
    } else if (regex.test(value && value)) {
      resolve("");
    } else {
      reject("Должен содержать цифровые и латинские символы ");
    }
  });
};
