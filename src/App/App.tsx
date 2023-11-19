import "./App.scss";

import { AppRouter } from "../routers/AppRouter";
import { Alert } from "../components/Alert/Alert";

import dayjs from "dayjs";
dayjs.locale("ru");

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Alert />
    </div>
  );
}

export default App;
