import axios from "axios";
export const uploadFileDirectly = async (file: File) => {
    const CLOUD_NAME = "dcsn0xcuj";
    const UPLOAD_PRESET = "Testimonial_Preset";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        formData
      );
    return response
      console.log("Uploaded file URL:", response.data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };