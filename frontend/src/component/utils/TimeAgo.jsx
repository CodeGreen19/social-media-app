import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState("");
  const { darkMode } = useSelector((state) => state.user);

  useEffect(() => {
    const getTimeAgo = () => {
      const now = new Date();
      const pastTime = new Date(timestamp);
      const timeDifference = now - pastTime;
      const minutesAgo = Math.floor(timeDifference / (1000 * 60));
      const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
      const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const monthsAgo = Math.floor(
        timeDifference / (1000 * 60 * 60 * 24 * 30.44)
      ); // Approximate months

      if (minutesAgo < 60) {
        if (minutesAgo < 1) {
          setTimeAgo("just now");
        } else {
          setTimeAgo(`${minutesAgo} min ago`);
        }
      } else if (hoursAgo < 24) {
        setTimeAgo(`${hoursAgo} hours ago`);
      } else if (daysAgo < 30) {
        setTimeAgo(`${daysAgo} days ago`);
      } else {
        setTimeAgo(`${monthsAgo} months ago`);
      }
    };

    getTimeAgo();

    // Update the time every minute
    const intervalId = setInterval(getTimeAgo, 60000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span style={{ color: darkMode && "white" }}>{timeAgo}</span>;
};

export default TimeAgo;
