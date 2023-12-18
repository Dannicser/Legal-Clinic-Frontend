import { useLayoutEffect, useState } from "react";

import { UseLocalStorage } from "../../hooks/useLocalStorage";

import { Button, Row, Typography } from "antd";

import cookie from "./assets/icons/cookie.png";

import "./Cookie.scss";

export const Cookie = () => {
  const [isShownCookie, isSetShownCookie] = useState<boolean>(true);

  useLayoutEffect(() => {
    if (UseLocalStorage({ key: "cookies", action: "get" })) {
      return isSetShownCookie(false);
    }
  }, []);

  const onTakeCookies = () => {
    UseLocalStorage({ key: "cookies", data: "true", action: "set" });
    isSetShownCookie(false);
  };

  return (
    <>
      {isShownCookie ? (
        <div className="cookie_wrapper">
          <Row justify={"start"}>
            <Typography.Text className="coolie_title" strong>
              Продолжая использовать веб-сайт, вы соглашаетесь с использованием файлов cookie <img className="cookie_icon" src={cookie} alt="" />
            </Typography.Text>{" "}
          </Row>

          <Row className="mt-1" justify={"center"}>
            <Button onClick={onTakeCookies} type="primary">
              Соглашаюсь
            </Button>
          </Row>

          <Row className="mt-1" justify={"start"}>
            <Typography.Text className="cookie_descr" type="secondary">
              Этот веб-сайт использует cookies для вашей быстрой и удобной работы с ним. Вы можете изменить настройки cookie-файлов в своём браузере,
              но функционал сайта в таком случае может быть ограничен.
            </Typography.Text>{" "}
          </Row>
        </div>
      ) : null}
    </>
  );
};
