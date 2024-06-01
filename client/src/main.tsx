import React from "react";
import { createRoot } from "react-dom/client";
import Providers from "./providers";
import Routes from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </React.StrictMode>
);
