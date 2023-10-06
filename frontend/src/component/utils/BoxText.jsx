import React from "react";

function BoxText({ text }) {
  return (
    <ul className="boxStyledText">
      {text.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default BoxText;
