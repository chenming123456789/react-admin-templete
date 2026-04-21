import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@/styles/global.scss";
import dayjs from "dayjs";
import updateLocale from 'dayjs/plugin/updateLocale';
import "dayjs/locale/zh-cn";

dayjs.extend(updateLocale);
dayjs.updateLocale('zh-cn', {
  weekStart: 1,
});
dayjs.locale("zh-cn");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
