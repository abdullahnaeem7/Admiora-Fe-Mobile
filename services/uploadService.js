// authService.ts
import { privateApi } from "@/libs/http/axios";

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();

    const fileName = file.split("/").pop() || "photo.jpg";
    let match = /.(\w+)$/.exec(fileName || "image/jpeg");
    let type = match ? `image/${match[1]}` : "image";
    formData.append("file", { uri: file, name: fileName, type });
    const response = await privateApi.post("/file-upload/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const url = response.data.url;
    return url;
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
};
