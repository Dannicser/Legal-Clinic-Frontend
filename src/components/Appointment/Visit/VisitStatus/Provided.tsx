import { Button, Divider, Input, Rate, Result, Space, Typography, Form, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { thunkRemoveAppointment } from "../../../../slices/appointmentSlice";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import axios from "../../../../config/axios";
import { UseLocalStorage } from "../../../../hooks/useLocalStorage";

import { SendOutlined } from "@ant-design/icons";

export const Provided: React.FC = () => {
  const [rate, setRate] = useState<number>(5);
  const [isReview, isSetReview] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { problem, type, date } = useAppSelector((state) => state.appointment.data);

  const onOpenReview = () => {
    isSetReview(true);
  };

  const onChangeReview = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setReview(event.target.value);
  };

  const onFetchData = async () => {
    await axios.post("./appointment/history", { review, rate, problem, type, date });
    dispatch(thunkRemoveAppointment());
    setIsFinished(true);
    UseLocalStorage({ key: "roadhelp", action: "remove" });
    console.log("delete");
  };

  if (isFinished) {
    return <Navigate to="/main" />;
  }

  return (
    <Result
      status={"success"}
      title="Услуга была оказана"
      subTitle={"Спасибо за ваше доверие! Просим вас оценить нашу работу"}
      extra={
        <>
          <Rate onChange={setRate} defaultValue={rate} />
          <Divider />
          <Button onClick={onOpenReview} type="primary">
            Оценить
          </Button>
          <Divider />
          {isReview ? (
            <>
              <Typography.Paragraph style={{ textAlign: "start" }} strong>
                Что не понравилось вам больше всего?
              </Typography.Paragraph>
              <Form initialValues={{ review: "" }}>
                <Form.Item
                  hasFeedback
                  name={"review"}
                  rules={[{ required: true, message: "Пожалуйста, заполните поле (до 100 символов)", min: 3, max: 100 }]}
                >
                  <Row justify={"space-between"}>
                    <Col span={20}>
                      <Input.TextArea rows={1} onChange={onChangeReview} placeholder="Мне понравилось всё!" />
                    </Col>
                    <Col style={{ marginTop: "5px" }} span={4}>
                      {review.length >= 3 && <SendOutlined onClick={onFetchData} />}
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </>
          ) : null}
        </>
      }
    />
  );
};
