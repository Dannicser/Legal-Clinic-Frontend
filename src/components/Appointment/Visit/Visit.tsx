import "./Visit.scss";
import { DatePicker, Select, TimePicker, Input, Button, Space, Form, Checkbox, Typography, Row, InputNumber, Tooltip, Col } from "antd";
import { IApointment, IApointmentState } from "../../../types/appointment";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { onValidateName } from "../../../utils/validators/auth";

const { TextArea } = Input;

export const Visit = () => {
  // const { name } = useAppSelector((state) => state.user);
  const name = "Моковый";

  const [toggle, setToggle] = useState(true);

  const onFinish = (values: IApointmentState) => {
    const data: IApointment = {
      ...values,
      date: values.date.format("DD-MM-YYYY"),
      time: values.time.format("H:mm"),
      id: Math.random(),
      name: toggle ? name : values.name,
    };

    console.log(data);
  };

  const content = toggle ? null : (
    <>
      <Row justify={"start"}>
        <Typography.Text strong>Введите ваше имя и отчество</Typography.Text>
      </Row>

      <Form.Item hasFeedback rules={[{ validator: onValidateName }]} name={"name"} className="mt-1">
        <Input placeholder="Иван Иванович" />
      </Form.Item>
    </>
  );

  return (
    <div className="visit__wrapper">
      <Form name="basic" className="visit__form" onFinish={onFinish}>
        <Row>
          <Col>
            <Typography.Text strong>Выберите дату и время посещения</Typography.Text>
          </Col>
        </Row>
        <Space>
          <Form.Item
            hasFeedback
            rules={[
              {
                required: true,
                message: "Выберите дату посещения",
              },
            ]}
            name="date"
          >
            <DatePicker
              inputReadOnly
              disabledDate={(date) => {
                if (date.format("dddd") !== "Wednesday") {
                  return true;
                } else {
                  return false;
                }
              }}
              placeholder="Выберите дату"
              showToday={false}
              renderExtraFooter={() => {
                return (
                  <>
                    <p style={{ paddingLeft: 20 }}>Режим работы: среда, 15:00 - 17:00</p>
                  </>
                );
              }}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            rules={[
              {
                required: true,
                message: "Выберите время посещения",
              },
            ]}
            name="time"
          >
            <TimePicker
              inputReadOnly
              placeholder="Выберите время"
              showNow={false}
              minuteStep={30}
              disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24]}
              format={"HH:mm"}
              hideDisabledOptions
            />
          </Form.Item>
        </Space>
        <Row>
          <Col>
            <Typography.Text strong>Выберите категорию вашего дела</Typography.Text>
          </Col>
        </Row>
        <Form.Item
          hasFeedback
          rules={[
            {
              required: true,
              message: "Выберите категорию дела",
            },
          ]}
          name={"type"}
        >
          <Select
            placeholder="Выберите вид правовых отношений"
            options={[
              {
                value: "civil",
                label: "Гражданско-правовые отношения",
              },
              {
                value: "criminal",
                label: "Уголовно-правовые отношения",
              },
              {
                value: "other",
                label: "Иные отношения",
              },
            ]}
          />
        </Form.Item>
        <Row>
          <Col>
            <Typography.Text strong>Опишите вашу проблему</Typography.Text>
          </Col>
        </Row>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Необходимо более детально описать проблему",
              min: 50,
              max: 1000,
            },
          ]}
          name={"problem"}
        >
          <TextArea rows={4} placeholder="Не более 1000 символов" maxLength={1000} />
        </Form.Item>
        <Row justify={"start"}>
          <Col style={{ textAlign: "start" }} span={24}>
            <Typography.Text strong>Введите ваш номер телефона. </Typography.Text>
            <Tooltip title="Наши специалисты свяжутся с вами и подтвердят запись на посещение клиники." color={"green"}>
              <Typography.Text strong style={{ color: "#00D024" }}>
                Зачем?
              </Typography.Text>
            </Tooltip>
          </Col>
          <Form.Item
            hasFeedback
            rules={[{ required: true, min: 10, max: 10, message: "Должен содержать 10 символов" }]}
            name={"phone"}
            className="mt-1"
          >
            <Input addonBefore="+7" placeholder={"9802343233"} />
          </Form.Item>
        </Row>
        <Row justify={"start"}>
          <Form.Item>
            <Checkbox onChange={() => setToggle(!toggle)} defaultChecked>
              <Typography.Text strong>Использовать ваше ФИО из профиля</Typography.Text>
            </Checkbox>
          </Form.Item>
        </Row>
        {content}
        <Form.Item>
          <div className="button__visit">
            <Button htmlType="submit" type="primary">
              Записаться
            </Button>
          </div>
        </Form.Item>{" "}
      </Form>
    </div>
  );
};
