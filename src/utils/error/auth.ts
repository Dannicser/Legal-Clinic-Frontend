export const onGetErrorMessage = (message: any) => {
  console.log(message);

  switch (message) {
    case "EMAIL_EXISTS":
      return "Пользователь с таким email уже существует";
    case "INVALID_EMAIL":
      return "Невозможно использовать данный email для создания аккаунта";
    case "OPERATION_NOT_ALLOWED":
      return "Для этой учетной записи отключен вход с паролем";
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      return "Заподозрена необычная активность. Вход в приложение заблокирован на некоторое время";
    //
    case "EMAIL_NOT_FOUND":
      return "Пользователь с таким email не найден";
    case "INVALID_PASSWORD":
      return "Неправильный пароль";
    case "USER_DISABLED":
      return "Пользователь был заблокирован администрацией";
    //
    case "RESET_PASSWORD_EXCEED_LIMIT":
      return "Превышено число отправки сообщений на почту, попробуйте позже";

    case "TRY_LATER":
      return "Ошибка соединения, попробуйте позже";

    default:
      return "Непредвиденная ошибка";
  }
};
