import { Provider } from "react-redux";
import AppRoutes from "./routes/App.routes";
import { store } from "@redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
   </Provider>
  );
}
