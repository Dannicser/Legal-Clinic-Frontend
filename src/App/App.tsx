import "./App.scss";
import { AppRouter } from "../routers/AppRouter";
import { Notification } from "../components/Notification/Notification";

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Notification />
    </div>
  );
}

export default App;
