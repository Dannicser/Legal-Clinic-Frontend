import { useAppSelector } from "../../hooks/useAppSelector";

import { Col, Result, Row, Space, Typography } from "antd";

import vk from "./icons/vk.svg";
import whatsapp from "./icons/whatsapp.svg";
import telegram from "./icons/telegram.svg";
import support from "./img/support.png";

import { Header } from "../UI/Header/Header";
import { Layout } from "../Layout/Layout";
import { Helmet } from "react-helmet";

export const Support: React.FC = () => {
  const first_name = useAppSelector((state) => state.user.user.first_name);
  const last_name = useAppSelector((state) => state.user.user.last_name);
  return (
    <>
      <Header title="Поддержка" />
      <Layout internal={{ paddingTop: 15 }}>
        <Result
          icon={<img style={{ width: 150 }} src={support} />}
          title={
            <Typography.Title level={3}>
              {first_name} {last_name}
            </Typography.Title>
          }
          subTitle={
            "Если вы столкнулись с программной ошибкой или с каким-то недочетом в нашем приложении или у вас есть идеи по улучшению продукта, просим вас обратиться"
          }
          extra={
            <>
              <Helmet>
                <title>Поддержка - Юридическая клиника при ЕГУ.им И.А. Бунина</title>
                <meta
                  name="description"
                  content="Если вы столкнулись с программной ошибкой или с каким-то недочетом в нашем приложении или у вас есть идеи по улучшению продукта, просим вас обратиться в WhatsApp, Telegram, VK."
                />
                <meta name="keywords" content="помощь, ошибка, идеи, улучшения, клиника" />
              </Helmet>
              <Space>
                <Row justify={"space-between"}>
                  <Col style={{ width: "65px" }}>
                    <a target="_blank" href={"https://vk.com/id265357621"}>
                      <img src={vk} alt="" />
                    </a>
                  </Col>
                  <Col style={{ width: "65px" }}>
                    <a href="https://api.whatsapp.com/send?phone=79802647236" target="_blank">
                      <img src={whatsapp} alt="" />
                    </a>
                  </Col>{" "}
                  <Col style={{ width: "65px" }}>
                    <a href="https://t.me/+79802647236" target="_blank">
                      <img src={telegram} alt="" />
                    </a>
                  </Col>
                </Row>
              </Space>
            </>
          }
        />
        <Col>
          <Typography.Text type="success" strong>
            Спасибо, мы трудимся именно для вас!
          </Typography.Text>
        </Col>
      </Layout>
    </>
  );
};
