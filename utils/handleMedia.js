import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ secure: true });

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};

export { uploadImage };
