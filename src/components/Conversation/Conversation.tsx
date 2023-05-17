import "./Conversation.scss";
import { Header } from "../UI/Header/Header";
import { Space, Input, Button } from "antd";
import worker from "./icons/worker.png";
import addiniotal from "./icons/additional.png";

export const Conversation = () => {
  return (
    <>
      <Header title="Диалог со специалистом" />

      <div className="conversation__wrapper">
        <div className="specialist__converstaion">
          <div>
            <img className="specialist__ava" src={worker} alt="" />
            <div className="specialist__name">Даниил Елфимов</div>
          </div>
          <img src={addiniotal} alt="" />
        </div>

        <div className="input__conversation">
          <Space.Compact style={{ width: "100%" }}>
            <Input placeholder="Введите сообщение" />
            <Button style={{ height: "40px", backgroundColor: "black" }} type="primary">
              Отправить
            </Button>
          </Space.Compact>
        </div>
      </div>
    </>
  );
};
