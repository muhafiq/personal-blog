import fetch from "node-fetch";
import FormData from "form-data";
import { Buffer } from "buffer";
import prismaClient from "../config/database.js";

export const formatBlogContent = async (content, req) => {
  const imgTags = content.match(/<img [^>]*src="data:image\/[^>]*>/g) || [];

  const uploadedImages = await Promise.all(
    imgTags.map(async (imgTag) => {
      const dataUri = imgTag.match(/src="([^"]*)"/)[1];

      const response = await fetch(dataUri);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const formData = new FormData();
      formData.append("images", buffer, {
        filename: "image.png",
        contentType: response.headers.get("content-type"),
      });

      const uploadResponse = await fetch(
        `${req.protocol}://${req.get("host")}/api/v1/upload`,
        {
          method: "POST",
          body: formData,
          headers: formData.getHeaders(),
        }
      );

      const result = await uploadResponse.json();
      return result.file;
    })
  );

  let updatedContent = content;
  uploadedImages.forEach(async (url, index) => {
    updatedContent = updatedContent.replace(
      imgTags[index],
      `<img src="${url}">`
    );
  });

  return { updatedContent, uploadedImages };
};
