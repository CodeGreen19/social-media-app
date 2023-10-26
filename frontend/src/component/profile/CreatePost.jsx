import React, { useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import BoxText from "../utils/BoxText";
import "./CreatePost.css";
import ImageIcon from "@mui/icons-material/Image";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  getMyPosts,
  uploadVideoAction,
} from "../../action/postAction";
import { loadUser } from "../../action/userAction";
import axios from "axios";
import { videoUploadApi } from "../video/videoUrl";

export default function CreatePost({ open, setOpen }) {
  const { user, darkMode } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const create = ["C", "R", "E", "A", "T", "E"];
  const post = ["P", "O", "S", "T"];
  const fileInputRef = useRef();
  const videoFileInputRef = useRef();
  const [uploadImg, setUploadImg] = useState("");
  const [uploadVideo, setUploadVideo] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadVideoLocal, setUploadVideoLocal] = useState("");
  const [caption, setCaption] = useState("");

  // handle button to change image
  const handleImgClick = () => {
    setUploadVideo("");
    setUploadVideoLocal("");
    fileInputRef.current.click();
  };
  // handle button to change image
  const handleVideoClick = () => {
    setUploadImg("");
    videoFileInputRef.current.click();
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
  // to upload a new video
  const handleChangeVideo = (e) => {
    const selectedVideo = e.target.files[0];
    setUploadVideo(selectedVideo);
    setUploadVideoLocal(URL.createObjectURL(selectedVideo));
  };

  // to upload a new video

  const handleClose = () => {
    setOpen(false);
  };
  const postHandler = (e) => {
    e.preventDefault();
    const info = {
      caption,
      uploadImg,
    };
    dispatch(createPost(info)).then(() => {
      dispatch(getMyPosts(user._id));
      dispatch({ type: "myPostsTrue", payload: true });
      dispatch(getMyPosts());
      dispatch(loadUser());
      handleClose();
      setUploadImg("");
      setCaption("");
    });
  };

  // to post video handler
  const postVideoHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", uploadVideo);
    formData.append("upload_preset", "video_preset");

    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
    };

    try {
      const { data } = await axios.post(videoUploadApi, formData, config);
      const info = {
        caption,
        videoUrl: data.secure_url,
        publicId: data.public_id,
      };
      dispatch(uploadVideoAction(info));
      handleClose();
      setCaption("");
      setUploadVideo("");
      setUploadProgress(0);
    } catch (error) {
      console.log("error", error);
    }
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
        zIndex: 50,
      }}
    >
      <div className={`createPostBox ${darkMode && "darkMode"}`}>
        <div className="createBoxText">
          <BoxText text={create} />
          <BoxText text={post} />
        </div>
        <div className="postImgBox">
          <button onClick={handleImgClick}>
            <ImageIcon /> add image
          </button>
          <button onClick={handleVideoClick}>
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
        {uploadVideoLocal ? (
          <div className="videoPreviewBox">
            <video src={uploadVideoLocal} controls></video>
          </div>
        ) : (
          ""
        )}
        <textarea
          cols="10"
          rows="2"
          placeholder="caption here.."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
        {uploadVideo ? (
          <button
            className="postButton"
            onClick={postVideoHandler}
            disabled={uploadProgress > 0 ? true : false}
          >
            {uploadProgress > 0 ? `${uploadProgress} %` : "POST"}
          </button>
        ) : (
          <button className="postButton" onClick={postHandler}>
            POST
          </button>
        )}
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
        {/* upload video */}
        <div>
          <input
            type="file"
            accept="video/*"
            ref={videoFileInputRef}
            onChange={handleChangeVideo}
            hidden
          />
        </div>
        {/* upload video */}
      </div>
    </Modal>
  );
}
