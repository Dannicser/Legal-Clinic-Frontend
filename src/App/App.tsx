import "./App.scss";
import { AppRouter } from "../routers/AppRouter";

import { Alert } from "../components/Alert/Alert";
import { NotSupport } from "../components/NotSupport/NotSupport";

import dayjs from "dayjs";

dayjs.locale("ru");

function App() {
  if (window.innerWidth > 768) {
    return <NotSupport />;
  }

  return (
    <div className="App">
      <AppRouter />
      <Alert />
    </div>
  );
}

export default App;
