import * as React from "react";
import { useState } from "react";

const ImgbbUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=2c1ac152abecc6a309f85ae34df7fce3",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const responseData = await response.json();

      // Handle the response from ImgBB
      console.log("Image uploaded successfully:", responseData.data);
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImgbbUploader;
