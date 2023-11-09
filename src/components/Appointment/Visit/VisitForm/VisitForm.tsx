import "./VisitForm.scss";
import { DatePicker, Select, TimePicker, Input, Button, Space, Form, Checkbox, Typography, Row, InputNumber, Tooltip, Col, Alert } from "antd";

import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";

import { IRegisterApointmentData, IApointmentState } from "../../../../types/appointment";
import { useState } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { thunkGetRegisterAppointment } from "../../../../slices/appointmentSlice";

const { TextArea } = Input;

export const VisitForm = () => {
  const { user } = useAppSelector((state) => state.user);
  const { isLoading, isError } = useAppSelector((state) => state.appointment);
  const dispatch = useAppDispatch();

  const [toggle, setToggle] = useState(true);

  const onFinish = (values: IApointmentState) => {
    const data: IRegisterApointmentData = {
      ...values,
      phone: 8 + values.phone,
      date: values.date.format("MM-DD-YYYY"),
      time: values.time.format("H:mm"),
      first_name: toggle ? user.first_name : values.first_name,
      last_name: toggle ? user.last_name : values.last_name,
    };

    dispatch(thunkGetRegisterAppointment(data));
  };

  const content = toggle ? null : (
    <>
      <Row justify={"start"}>
        <Typography.Text strong>Введите ваше имя</Typography.Text>
      </Row>
      <Form.Item hasFeedback rules={[{ min: 2, max: 20, message: "Не менее 2 и не более 20 символов", required: true }]} name={"first_name"}>
        <Input placeholder="Иван" />
      </Form.Item>
      <Row justify={"start"}>
        <Typography.Text strong>Введите ваше отчество</Typography.Text>
      </Row>
      <Form.Item hasFeedback rules={[{ min: 2, max: 20, message: "Не менее 2 и не более 20 символов", required: true }]} name={"last_name"}>
        <Input placeholder="Иванович" />
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
              locale={locale}
              disabledDate={(date) => {
                if (date.valueOf() < Date.now()) {
                  return true;
                }
                if (date.format("dddd") !== "Wednesday" && date.valueOf() > Date.now()) {
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
                    <p style={{ paddingLeft: 20, color: "grey" }}>Режим работы: среда, 15:00 - 17:00</p>
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
              message: "от 30 до 1000 символов",
              min: 30,
              max: 1000,
            },
          ]}
          name={"problem"}
        >
          <TextArea rows={4} placeholder="Не более 1000 символов" maxLength={1001} />
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
            <Button loading={isLoading} htmlType="submit" type="primary">
              Записаться
            </Button>
          </div>
        </Form.Item>

        {isError && (
          <Alert
            type="error"
            style={{ fontWeight: 600, fontFamily: "font-family: Montserrat, sans-serif" }}
            showIcon
            message={"Произошла непредвиденная ошибка, попробуйте еще раз"}
          />
        )}
      </Form>
    </div>
  );
};
