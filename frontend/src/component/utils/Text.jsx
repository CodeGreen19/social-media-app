import React, { useState } from "react";

const Text = ({ text }) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="textSizing">
      {showAll
        ? text
        : text.length > 130
        ? `${text.substring(0, 130)}...`
        : text}
      {text.length > 130 && (
        <button onClick={toggleShowAll}>
          {showAll ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};

export default Text;
