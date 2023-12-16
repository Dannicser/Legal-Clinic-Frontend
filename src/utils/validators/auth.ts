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
