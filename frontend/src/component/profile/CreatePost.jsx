import React, { useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import BoxText from "../utils/BoxText";
import "./CreatePost.css";
import ImageIcon from "@mui/icons-material/Image";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

export default function CreatePost({ open, setOpen }) {
  const create = ["C", "R", "E", "A", "T", "E"];
  const post = ["P", "O", "S", "T"];
  const fileInputRef = useRef();
  const [uploadImg, setUploadImg] = useState("");

  // handle button to change image
  const handleImgClick = () => {
    fileInputRef.current.click();
  };

  // handle image change
  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setUploadImg(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "scroll",
      }}
    >
      <div className="createPostBox">
        <div className="createBoxText">
          <BoxText text={create} />
          <BoxText text={post} />
        </div>
        <div className="postImgBox">
          <button onClick={handleImgClick}>
            <ImageIcon /> add image
          </button>
          <button>
            <OndemandVideoIcon /> add video
          </button>
        </div>
        {uploadImg ? (
          <div className="postImgPreviewBox">
            <img
              src={uploadImg}
              style={{ width: "100%", borderRadius: "4px" }}
              alt="uploadImg"
            />
          </div>
        ) : (
          ""
        )}
        <textarea cols="10" rows="2" placeholder="caption here.."></textarea>
        <button className="postButton">POST</button>
        {/* upload image */}
        <div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChangeImage}
            hidden
          />
        </div>
        {/* upload image */}
      </div>
    </Modal>
  );
}
