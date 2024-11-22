const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function profileImageUpload(req) {
  // Check if file exists in the request
  if (!req.file) {
    // No file provided, return null 
    return null;
  }

  const filePath = req.file.path;

  try {
    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'School-Management-System', // Folder name in Cloudinary
    });

    // Remove local file after upload
    fs.unlinkSync(filePath);

    // Generate optimized delivery URL
    const optimizeUrl = cloudinary.url(result.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
    });

    // Return the optimized URL
    return optimizeUrl;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
}

module.exports = { profileImageUpload };
