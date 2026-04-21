import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "@/context/ConfigContext";
import router from "./router";

function App() {
  return (
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
