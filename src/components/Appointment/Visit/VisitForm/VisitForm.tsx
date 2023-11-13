import "./VisitForm.scss";
import {
  DatePicker,
  Select,
  TimePicker,
  Input,
  Button,
  Space,
  Form,
  Checkbox,
  Typography,
  Row,
  InputNumber,
  Tooltip,
  Col,
  Alert,
  Popconfirm,
} from "antd";

import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs, { Dayjs } from "dayjs";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AppointmentStatus, IEditAppointmentData, Status } from "../../../../types/appointment";

import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { thunkGetRegisterAppointment, thunkRemoveAppointment } from "../../../../slices/appointmentSlice";
import { Navigate } from "react-router-dom";
import { PrivetRoutesNames } from "../../../../routers";
import { useState } from "react";

const { TextArea } = Input;

interface IVisitFormProps {
  onGetState?: (state: IEditAppointmentData) => void;
  edit?: boolean;
  state?: IEditAppointmentData;
  status?: Status;
  isErrorEdit?: boolean;
  isLoadingEdit?: boolean;
}

export const VisitForm: React.FC<IVisitFormProps> = (props) => {
  console.log("render");
  const { onGetState, edit, state, status, isErrorEdit, isLoadingEdit } = props;
  const [changeMessage, setChangeMessage] = useState<string>("");

  const [form] = Form.useForm();

  const { isLoading, isError } = useAppSelector((state) => state.appointment);
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

  const onEditAppointment = () => {
    if (!onFormError() && form.isFieldsTouched() && onGetState) {
      const data: IEditAppointmentData = {
        ...form.getFieldsValue(),
        time: form.getFieldValue("time").format("H:mm"),
        date: form.getFieldValue("date").format("DD-MM-YYYY"),
      };

      setChangeMessage("");
      console.log("edit");

      return onGetState(data);
    }

    setChangeMessage("Вы не изменили данные в форме.");
  };

  const onCancelAppointment = () => {
    dispatch(thunkRemoveAppointment());
  };

  const onRegisterAppointment = () => {
    if (!onFormError()) {
      const data = {
        ...form.getFieldsValue(),
        time: form.getFieldValue("time").format("H:mm"),
        date: form.getFieldValue("date").format("DD-MM-YYYY"),
      };

      console.log("resister");

      dispatch(thunkGetRegisterAppointment(data));
    }
  };

  const initialValues = edit
    ? {
        problem: state?.problem,
        phone: state?.phone,
        type: state?.type,
        time: dayjs(state?.time, "HH:mm"),
        date: dayjs(state?.date, "DD-MM-YYYY"),
      }
    : {};

  const contentEdit = (
    <Space>
      <Col>
        <Popconfirm
          title="Вы действительно хотите изменить ваше обращение?"
          description={
            <>
              Пожалуйста, проверьте правильность введенных вами данных.
              <br />
            </>
          }
          okText="Да"
          cancelText="Нет"
          onConfirm={onEditAppointment}
        >
          <Button loading={isLoadingEdit} htmlType="submit" type="primary">
            <EditOutlined />
          </Button>
        </Popconfirm>
      </Col>
      <Col>
        <Popconfirm
          title="Вы действительно хотите отменить ваше обращение?"
          description="В случае отмены, мы не сможем вам помочь :("
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
        description={
          <>
            Проверьте правильность введенных вами данных, если они будут некорректны, нам придется <span> </span>
            <Typography.Text type="warning" strong>
              отказать вам в обращении.
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
                if (date.format("dddd") !== "Tuesday" && date.valueOf() > Date.now()) {
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
                    <p style={{ paddingLeft: 20, color: "grey" }}>Режим работы: вторник, 16:00 - 18:00</p>
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
          <Row justify={"center"}>{edit ? contentEdit : contentRegister}</Row>
        </Form.Item>
        {changeMessage && <Alert className="alert" type="warning" banner showIcon message={changeMessage} />}
        {isError ||
          (isErrorEdit && <Alert type="error" className="alert" showIcon message={"Произошла непредвиденная ошибка, попробуйте еще раз"} />)}
      </Form>
    </div>
  );
};
