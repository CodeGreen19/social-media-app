import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import BoxText from "./BoxText";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="notfoundPage">
      <div>
        <BoxText text={["N", "O", "T"]} />
        <BoxText text={["F", "O", "U", "N", "D"]} />
      </div>
      <button onClick={() => navigate("/")}>
        <HomeRoundedIcon />
      </button>
    </div>
  );
}

export default NotFound;
