import "./Visit.scss";
import dayjs from "dayjs";
import type { DatePickerProps } from "antd";
import { DatePicker, Select, TimePicker, Input, Button, Space } from "antd";

const { TextArea } = Input;

export const Visit = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date);
  };

  const format = "H:mm";

  return (
    <div className="visit__wrapper">
      <h2 className="time">Выберите дату и время посещения</h2>

      <Space>
        <DatePicker onChange={onChange} />
        <TimePicker minuteStep={30} defaultValue={dayjs("12:00", format)} format={format} />
      </Space>

      <h2 className="category">Выберите категорию вашего дела</h2>
      <Select
        showSearch
        placeholder="Выберете вид правовых отношений"
        options={[
          {
            value: "1",
            label: "Гражданско-правовые отношения",
          },
          {
            value: "2",
            label: "Уголовно-правовые отношения",
          },
          {
            value: "3",
            label: "Иные отношения",
          },
        ]}
      />
      <h2 className="problem">Опишите вашу проблему</h2>
      <TextArea rows={4} placeholder="Не более 1000 символов" maxLength={1000} />

      <div className="button__visit">
        <Button type="primary" danger>
          Записаться
        </Button>
      </div>
    </div>
  );
};
