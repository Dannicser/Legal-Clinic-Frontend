import { Collapse, ConfigProvider, Divider, Typography } from "antd";
import { Header } from "../UI/Header/Header";
import { Layout } from "../Layout/Layout";

import "./FAQ.scss";

export const FAQ = () => {
  return (
    <>
      <Header title="Частые вопросы" />
      <Layout internal={{ paddingTop: 50 }}>
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                headerBg: "#e6f4ff",
              },
            },
          }}
        >
          <Divider orientation="center">Общие</Divider>
          <Collapse
            className="faq_item"
            size="middle"
            items={[
              {
                key: "0",
                label: "О нас",
                children: (
                  <p className="faq_text">
                    <strong className="strong"> Юридическая клиника</strong> - центр правового просвещения, оказывающий{" "}
                    <strong className="strong">бесплатную</strong> юридическую помощь всем обратившимся гражданам и организациям. <br />
                  </p>
                ),
              },
              {
                key: "1",
                label: "Наш график работы",
                children: (
                  <p className="faq_text">
                    Мы оказываем юридические услуги каждый вторник <Typography.Text strong> c 16:00 - 18:00</Typography.Text>
                  </p>
                ),
              },
              {
                key: "2",
                label: "Где мы находимся?",
                children: (
                  <p className="faq_text">
                    Наш офис располагается по адресу: <br />{" "}
                    <Typography.Text strong>г. Елец, ул. Советская, д. 72 (редакция газеты "Красное Знамя")</Typography.Text>
                  </p>
                ),
              },
              {
                key: "3",
                label: "Как связаться с нами?",
                children: (
                  <p className="faq_text">
                    Вы можете позвонить нам просто кликнув на этот номер телефона <br />
                    <a className="faq_number" href="tel:+79103596633">
                      <Typography.Text strong> +7 (910) 359-66-33</Typography.Text>
                    </a>
                    <Divider />
                    Связь также возможна по электронной почте
                    <a href="mailto:vic80@rambler.ru">
                      <Typography.Text strong> vic80@rambler.ru </Typography.Text>
                    </a>
                    при обращении кликните на нее
                  </p>
                ),
              },
            ]}
          />
          <Divider orientation="center">Правовые вопросы</Divider>
          <Collapse
            className="faq_item"
            size="middle"
            items={[
              {
                key: "1",
                label: "Чем мы можем вам помочь?",
                children: (
                  <p className="faq_text">
                    <section>
                      Мы составим вам различные документы строго правового характера, в том числе
                      <strong className="strong"> жалобы, заявления, обращения, иски и т.п. </strong>
                    </section>
                    <section>
                      Мы можем <strong className="strong">представлять вас</strong> в государственных органах, коммерческих и некоммерческих
                      организациях, в отношениях с физическими лицами.
                    </section>
                    <section>
                      Мы разъясним вам спорные моменты <strong className="strong"> в любой отрасли права </strong>и
                      <strong className="strong"> решим вашу проблему!</strong>
                    </section>
                  </p>
                ),
              },
            ]}
          />
        </ConfigProvider>
      </Layout>
    </>
  );
};
