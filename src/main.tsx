import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store } from "./Domain/storage/storage.ts";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
