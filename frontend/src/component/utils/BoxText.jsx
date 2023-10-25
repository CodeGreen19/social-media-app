import React from "react";
import { useSelector } from "react-redux";

function BoxText({ text }) {
  const { darkMode } = useSelector((state) => state.user);
  return (
    <ul className={`boxStyledText ${darkMode && "darkMode"}`}>
      {text.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default BoxText;
