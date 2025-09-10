import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css"; // Use this to reset Ant Design styles
import "./css/index.css";
import { ThemeProvider } from "./context/Themeprovider";
import { UserProvider } from "./component/higherOrder/UserProvider";
const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);
