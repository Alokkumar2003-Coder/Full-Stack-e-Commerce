const cloudinary = require("../controllers/Cloudinary");
const path = require("path");

const uploadToCloudinary = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: folder,
      resource_type: file.mimetype.startsWith("image/") ? "image" : "video", // Audio falls under 'video'
    });
    return { url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    throw new Error("Cloudinary upload failed");
  }
};

const uploadHandler = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedFiles = {};

    if (req.files.frontImage) {
      uploadedFiles.frontImage = await uploadToCloudinary(
        req.files.frontImage,
        "images"
      );
    }

    if (req.files.audioFile) {
      uploadedFiles.audioFile = await uploadToCloudinary(
        req.files.audioFile,
        "audio"
      );
    }

    req.uploadedFiles = uploadedFiles;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = uploadHandler;