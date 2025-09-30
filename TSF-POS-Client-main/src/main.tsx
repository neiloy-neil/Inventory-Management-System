import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/configureStore.ts";
import { PersistGate } from "redux-persist/integration/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
// import PaymentDue from "./pages/PaymentDue/PaymentDue.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Toaster />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <App />
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  </>
);