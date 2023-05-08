import ReactDOM from "react-dom/client";
import "./style/index.scss";
import App from "./App/App";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
