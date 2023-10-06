import React from "react";
import { Light } from "./ThemeColor";
import "./Alert.css";

function Alert({ text }) {
  return (
    <div className="alertContainer">
      <span className="alertBox" style={{ backgroundColor: Light }}>
        {text.toUpperCase()}
      </span>
    </div>
  );
}

export default Alert;
