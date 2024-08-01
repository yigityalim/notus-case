/**
 * @fileoverview main.tsx file
 * Main entry point of the application
 *
 * @author [Mehmet Yiğit Yalım](https://mehmetyigityalim.com)
 * @licence MIT
 * @version 1.0
 */

import ReactDOM from "react-dom/client";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>,
);
