import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { AllocationProvider } from "./context/AllocationContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <AllocationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AllocationProvider>
    </UserProvider>
  </React.StrictMode>
);
