import React, { Fragment, useState } from "react";
import axios from "axios";

function UploadVideo() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // State to store the upload progress

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "video_preset");

    const config = {
      onUploadProgress: (progressEvent) => {
        // Calculate and update the upload progress percentage
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
    };

    try {
      setLoading(true);
      let api = "https://api.cloudinary.com/v1_1/ddyrlplxn/video/upload";
      await axios.post(api, formData, config);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  return (
    <Fragment>
      <div>
        this is the vidoe
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />
        <button onClick={handleClick}>click to upload</button>
        <span>{loading && "loading"}</span>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div>Upload Progress: {uploadProgress}%</div>
        )}
      </div>
      <video
        src="https://res.cloudinary.com/ddyrlplxn/video/upload/v1697375803/g4g8fqz5ex78vjahkiwo.mp4"
        controls
        style={{ width: "400px" }}
      ></video>
    </Fragment>
  );
}

export default UploadVideo;
