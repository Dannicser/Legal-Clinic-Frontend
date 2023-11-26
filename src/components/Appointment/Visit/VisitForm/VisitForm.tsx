import { useState } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { thunkEditAppointment, thunkGetRegisterAppointment, thunkRemoveAppointment } from "../../../../slices/appointmentSlice";

import axios from "../../../../config/axios";

import { NavLink, Navigate } from "react-router-dom";
import { PrivetRoutesNames } from "../../../../routers";

import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";

import "./VisitForm.scss";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DatePicker, Select, TimePicker, Input, Button, Space, Form, Typography, Row, Tooltip, Col, Alert, Popconfirm } from "antd";

import { AppointmentStatus, ICheckReservationResponse, IEditAppointmentData, ITimeResponse, Status } from "../../../../types/appointment";
const { TextArea } = Input;

interface IVisitFormProps {
  edit?: boolean;
}

interface IStateReservation extends ITimeResponse {}

export const VisitForm: React.FC<IVisitFormProps> = ({ edit }) => {
  console.log("render");

  const [reservation, setReservation] = useState<IStateReservation[]>([]);
  const [isLoadingReservation, setIsLoadingReservation] = useState<boolean>(false);
  const [isErrorReservation, setIsErrorReservation] = useState<boolean>(false);

  const [form] = Form.useForm();

  const isLoading = useAppSelector((state) => state.appointment.isLoading);
  const isError = useAppSelector((state) => state.appointment.isError);
  const problem = useAppSelector((state) => state.appointment.data.problem);
  const type = useAppSelector((state) => state.appointment.data.type);
  const phone = useAppSelector((state) => state.appointment.data.phone);
  const date = useAppSelector((state) => state.appointment.data.date);
  const time = useAppSelector((state) => state.appointment.data.time);

  const status = useAppSelector((state) => state.appointment.data.status);
  const isReserved = useAppSelector((state) => state.appointment.isReserved);

  const dispatch = useAppDispatch();

  const onFormError = () => {
    let isError = false;
    form.getFieldsError().map((el) => {
      if (el.errors.length) {
        isError = true;
      }
    });

    return isError;
  };

  const onGetReservationList = async (date: dayjs.Dayjs) => {
    try {
      console.log("request");
      setIsLoadingReservation(true);
      const { data } = await axios.post<ICheckReservationResponse>("/appointment/check-reservation", { date: date.format("MM-DD-YYYY") });
      form.resetFields(["time"]);
      setReservation(data.data);
    } catch (error) {
      setIsErrorReservation(true);
    } finally {
      setIsLoadingReservation(false);
    }
  };

  const onEditAppointment = () => {
    if (!onFormError() && form.isFieldsTouched()) {
      const data: IEditAppointmentData = {
        ...form.getFieldsValue(),
        time: form.getFieldValue("time").format("H:mm"),
        date: form.getFieldValue("date").format("MM-DD-YYYY"),
      };

      return dispatch(thunkEditAppointment(data));
    }
  };

  const onCancelAppointment = () => {
    dispatch(thunkRemoveAppointment());
  };

  const onRegisterAppointment = () => {
    if (!onFormError()) {
      const data = {
        ...form.getFieldsValue(),
        time: form.getFieldValue("time").format("H:mm"),
        date: form.getFieldValue("date").format("MM-DD-YYYY"),
      };

      dispatch(thunkGetRegisterAppointment(data));
    }
  };

  const initialValues = edit
    ? {
        problem,
        phone,
        type,
      }
    : { problem, phone, type };

  const contentEdit = (
    <Space>
      <Col>
        <Popconfirm
          title="Вы действительно хотите изменить ваше обращение?"
          description={
            <>
              Пожалуйста, проверьте правильность введенных вами данных.
              <br />
              Нажимая {""}
              <Typography.Text type="warning" strong>
                «да», вы подтверждаете обработку ваших персональных данных.
              </Typography.Text>
            </>
          }
          okText="Да"
          cancelText="Нет"
          onConfirm={onEditAppointment}
        >
          <Button loading={isLoading} htmlType="submit" type="primary">
            <EditOutlined />
          </Button>
        </Popconfirm>
      </Col>
      <Col>
        <Popconfirm
          title="Вы действительно хотите отменить ваше обращение?"
          description="В случае отмены, мы не сможем вам помочь:("
          okText="Да"
          cancelText="Нет"
          onConfirm={onCancelAppointment}
        >
          <Button danger type="primary">
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </Col>
    </Space>
  );

  const contentRegister = (
    <Col>
      <Popconfirm
        title="Вы действительно хотите записаться на посещение Юридической Клиники?"
        placement="top"
        description={
          <>
            Проверьте правильность введенных вами данных, если они будут некорректны, нам придется <span> </span>
            <Typography.Text type="danger" strong>
              отказать вам в обращении.
            </Typography.Text>
            <br />
            Нажимая {""}
            <Typography.Text type="warning" strong>
              «да», вы подтверждаете обработку ваших персональных данных.
            </Typography.Text>
          </>
        }
        okText="Да"
        cancelText="Нет"
        onConfirm={onRegisterAppointment}
      >
        <Button loading={isLoading} htmlType="submit" type="primary">
          Оформить обращение
        </Button>
      </Popconfirm>
    </Col>
  );

  if (edit && status !== AppointmentStatus.ACCEPTED) {
    return <Navigate to={PrivetRoutesNames.APPOINTMENT} />;
  }

  console.log(reservation);

  return (
    <div className="visit__wrapper">
      <Form form={form} initialValues={initialValues} name="basic" className="visit__form">
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
                message: "Выберите дату",
              },
            ]}
            name="date"
          >
            <DatePicker
              inputReadOnly
              disabled={isLoadingReservation}
              onSelect={onGetReservationList}
              locale={locale}
              disabledDate={(date) => {
                if (date.valueOf() <= Date.now() - 86400000 && date.format("dddd") === "вторник") {
                  return true;
                }

                if (date.format("dddd") !== "вторник") {
                  return true;
                } else {
                  return false;
                }
              }}
              placeholder={date || "Выберите дату"}
              showToday={false}
              renderExtraFooter={() => {
                return <Typography.Text type="secondary">Режим работы: вторник, 16:00-18:00</Typography.Text>;
              }}
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            rules={[
              () => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error("Выберите время"));
                  }

                  const arr = reservation.filter((el) => {
                    if (el.time === value.format("H:mm")) {
                      return true;
                    }

                    return false;
                  });

                  if (arr.length) {
                    return Promise.reject(new Error("Это время занято"));
                  }

                  if (isErrorReservation) {
                    return Promise.reject(new Error("Ошибка"));
                  }

                  const time = ["16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45"];
                  const isWorkTime = time.find((el) => el === value.format("H:mm"));

                  if (!isWorkTime) {
                    return Promise.reject(new Error("Недоступное время"));
                  }

                  return Promise.resolve();
                },
              }),
            ]}
            name="time"
          >
            <TimePicker
              inputReadOnly
              disabled={isLoadingReservation}
              placeholder={time || "Выберите время"}
              showNow={false}
              minuteStep={15}
              disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24]}
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

        <Form.Item>
          <Row className="mt-1" justify={"center"}>
            {edit ? contentEdit : contentRegister}
          </Row>
        </Form.Item>
        {isReserved && (
          <NavLink to={PrivetRoutesNames.APPOINTMENT_CALENDAR}>
            <Alert
              type="info"
              banner
              message={"К сожалению, данное время недоступно для резерва, кликните сюда, чтобы посмотреть доступное время для посещения клиники"}
            />
          </NavLink>
        )}

        {isErrorReservation && <Alert type="error" showIcon message={"Неудалось получить информацию о свободном времени посещения."} />}
        {isError && <Alert type="error" showIcon message={"Произошла непредвиденная ошибка, попробуйте еще раз."} />}
      </Form>
    </div>
  );
};
