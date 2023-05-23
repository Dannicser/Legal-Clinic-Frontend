import "./Visit.scss";
import { DatePicker, Select, TimePicker, Input, Button, Space, Form } from "antd";
import { IApointment, IApointmentState } from "../../../types/appointment";

const { TextArea } = Input;

export const Visit = () => {
  const onFinish = (values: IApointmentState) => {
    const data: IApointment = {
      ...values,
      date: values.date.format("DD-MM-YYYY"),
      time: values.time.format("H:mm"),
      id: Math.random(),
    };

    console.log(data);
  };

  return (
    <div className="visit__wrapper">
      <Form name="basic" className="visit__form" onFinish={onFinish}>
        <h2 className="time">Выберите дату и время посещения</h2>

        <Space>
          <Form.Item
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

        <h2 className="category">Выберите категорию вашего дела</h2>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Выберите категорию дела",
            },
          ]}
          name={"type"}
        >
          <Select
            showSearch
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

        <h2 className="problem">Опишите вашу проблему</h2>

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

        <Form.Item>
          <div className="button__visit">
            <Button htmlType="submit" type="primary">
              Записаться
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
