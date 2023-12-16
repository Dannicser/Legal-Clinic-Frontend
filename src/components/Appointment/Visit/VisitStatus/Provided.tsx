import { useState } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { thunkRemoveAppointment } from "../../../../slices/appointmentSlice";
import { UseLocalStorage } from "../../../../hooks/useLocalStorage";

import { Navigate } from "react-router-dom";

import axios from "../../../../config/axios";

import { Button, Divider, Input, Rate, Result, Typography, Form, Row, Col, Modal, Space, Alert } from "antd";

import { PrivetRoutesNames } from "../../../../routers";

export const Provided: React.FC = () => {
  const [rate, setRate] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const problem = useAppSelector((state) => state.appointment.data.problem);
  const date = useAppSelector((state) => state.appointment.data.date);
  const type = useAppSelector((state) => state.appointment.data.type);
  const phone = useAppSelector((state) => state.appointment.data.phone);

  const onRateService = () => {
    if (rate !== 5) {
      setIsModal(true);
    } else {
      onFetchData();
    }
  };

  const onCloseModal = () => {
    setIsModal(false);
  };

  const onGetReview = (review: string) => {
    setReview(review);
  };

  const onFetchData = async () => {
    try {
      setIsLoading(true);
      await axios.post("./appointment/history", { review, reason: "", rate, problem, type, date, phone });
      dispatch(thunkRemoveAppointment()); //weak place

      UseLocalStorage({ key: "statushelp", action: "remove" });
      UseLocalStorage({ key: "roadhelp", action: "remove" });

      setIsFinished(true);
      return;
    } catch (error) {
      console.log(error);

      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFinished) {
    return <Navigate to={PrivetRoutesNames.HOME} />;
  }

  return (
    <>
      <ModelReview
        isLoading={isLoading}
        isError={isError}
        onFetchData={onFetchData}
        onCloseModal={onCloseModal}
        onGetReview={(review) => onGetReview(review)}
        isModal={isModal}
        rate={rate}
      />
      <Result
        status={"success"}
        title="Услуга была оказана"
        subTitle={"Спасибо за ваше доверие! Просим вас оценить нашу работу"}
        extra={
          <>
            <Rate onChange={setRate} defaultValue={rate} />
            <Divider />
            <Button loading={isLoading} disabled={!rate} onClick={onRateService} type="primary">
              Оценить
            </Button>
            <Divider />
            {isError && <Alert type="error" message={"Произошла непредвиденная ошибка при добавлении записи в историю. Попробуйте позже."} />}
          </>
        }
      />
    </>
  );
};

interface IModelReviewProps {
  isModal: boolean;
  isError: boolean;
  isLoading: boolean;
  rate: number;
  onCloseModal: (param: boolean) => void;
  onFetchData: () => void;
  onGetReview: (review: string) => void;
}

const ModelReview: React.FC<IModelReviewProps> = ({ isModal, isError, isLoading, rate, onCloseModal, onFetchData, onGetReview }) => {
  const onChangeReview = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onGetReview(event.target.value);
  };

  const onSendData = () => {
    onFetchData();
  };

  const text =
    rate > 3 ? (
      <Typography.Text strong type="warning">
        {rate}
      </Typography.Text>
    ) : (
      <Typography.Text strong type="danger">
        {rate}
      </Typography.Text>
    );

  return (
    <Modal onCancel={() => onCloseModal(true)} cancelText={"Отмена"} title={<>Почему вы поставили нам {text} ?</>} open={isModal} footer={true}>
      <Typography.Text> Пожалуйста, расскажите, что вам не понравилось, </Typography.Text>{" "}
      <Typography.Text strong type="warning">
        мы обязательно исправим это в следующий раз.
      </Typography.Text>
      <Divider />
      <Form onFinish={onSendData} initialValues={{ review: "" }}>
        <Form.Item
          hasFeedback
          name={"review"}
          rules={[
            { required: true, message: "Не менее 5 символов", min: 5 },
            { message: "Не более 100 символов", max: 100 },
          ]}
        >
          <Input.TextArea rows={2} onChange={onChangeReview} placeholder="Мне понравилось всё!" />
        </Form.Item>

        <Form.Item>
          <Row justify={"end"}>
            <Space>
              <Col>
                <Button onClick={() => onCloseModal(false)} style={{ background: "#52c41a" }} type="primary">
                  Все хорошо
                </Button>
              </Col>
              <Col>
                <Button loading={isLoading} htmlType="submit" type="primary">
                  Отправить
                </Button>
              </Col>
            </Space>
          </Row>
        </Form.Item>
      </Form>
      {isError && <Alert type="error" message={"Произошла непредвиденная ошибка, попробуйте позже."} />}
    </Modal>
  );
};
