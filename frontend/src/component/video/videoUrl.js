import axios from "axios";
export const videoUploadApi =
  "https://api.cloudinary.com/v1_1/ddyrlplxn/video/upload";

export const videoDeleteFunc = async (publicId) => {
  console.log(publicId);
  const deleteUrl = `https://api.cloudinary.com/v1_1/ddyrlplxn/video/destroy/${publicId}`;
  await axios.delete(deleteUrl);
};
