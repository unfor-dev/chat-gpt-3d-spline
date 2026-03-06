import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";

/* suppress noisy Spline runtime pivot logs */
const _warn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("Updating pivot")) return;
  _warn.apply(console, args);
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
