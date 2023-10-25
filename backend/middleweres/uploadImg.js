const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// upload image on cloudinary
exports.uploadImage = async (imagePath) => {
  const uploadResult = await cloudinary.uploader.upload(imagePath);
  return uploadResult;
};

// delete image from cloudinary
exports.deleteImage = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId);
  if (result.result === "ok") {
    return result.secure_url;
  } else {
    throw new Error("Failed to delete image.");
  }
};
