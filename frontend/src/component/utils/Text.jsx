import React, { useState } from "react";
import { useSelector } from "react-redux";

const Text = ({ text }) => {
  const { darkMode } = useSelector((state) => state.user);
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="textSizing" style={{ color: darkMode && "white" }}>
      {showAll
        ? text
        : text?.length > 130
        ? `${text.substring(0, 130)}...`
        : text}
      {text?.length > 130 && (
        <button onClick={toggleShowAll}>
          {showAll ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};

export default Text;
