import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
type PhotoUploadProps = {
  imgUrls?: (value: string[]) => void;
};
const PhotoUpload = ({ imgUrls }: PhotoUploadProps) => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const { open } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    noClick: true,
    multiple: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) =>
        prevFiles.concat(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
      );
    },
  });
  const handleSaveClick = async () => {
    try {
      const uploadedUrls = await Promise.all(
        files.map(async (item) => {
          const formData = new FormData();
          formData.append("image", item);

          const response = await fetch(
            "https://api.imgbb.com/1/upload?key=2c1ac152abecc6a309f85ae34df7fce3",
            {
              method: "POST",
              body: formData,
            }
          );

          const responseData = await response.json();

          if (!response.ok) {
            console.error(
              "Error uploading image:",
              response.statusText,
              responseData
            );
            throw new Error("Image upload failed");
          }

          return responseData.data.display_url;
        })
      );

      // Update the parent component's state with the array of uploaded URLs
      imgUrls(uploadedUrls);
    } catch (error) {
      console.error("Error uploading images:", error.message);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
  return (
    <div className="w-full bg-white text-[#374151] p-4">
      <div className="flex flex-col gap-4 m-4">
        <div className="text-xl flex items-center">Add photos</div>
        <div className="bg-containerBG">
          <div className="flex flex-col p-8 items-center justify-end gap-4">
            <div>
              <img
                src="https://www.yextstatic.com/s/merrill/public/images/multi-content-selector/drag-drop-empty-cart.svg"
                alt=""
              />
            </div>
            <div className="font-bold m-1 cursor-none">Drop Photos Here</div>
            <div className="flex flex-row gap-4 justify-center">
              <button
                onClick={open}
                className="bg-fieldBlurBorder text-sm px-4 border rounded-[3px] h-8 flex items-center"
              >
                Upload Photos
              </button>

              <div className="bg-fieldBlurBorder text-sm px-4 border rounded-[3px] h-8 flex items-center">
                Enter URLs
              </div>
              <div className="bg-fieldBlurBorder text-sm px-4 border rounded-[3px] h-8 flex items-center">
                Select Assets
              </div>
            </div>
          </div>
          <div className="pl-1 pb-1 text-xs flex flex-row gap-2">
            <div>File Formats : JPG, PNG, WEBP, GIF (Static Only)</div>
            <div>Max File Size: 5mb</div>
            <div>Max File Count: 497</div>
          </div>
        </div>
        {files && files.length >= 1 && (
          <div className="max-h-[300px] overflow-auto flex flex-col items-center gap-4">
            <div className="text-xl flex items-center justify-start mr-auto">
              Photos
            </div>
            <div className="grid grid-cols-4 gap-1 w-[95%]">
              {files &&
                files.length >= 1 &&
                files.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="m-1 w-[150px] border flex justify-center items-center relative max-h-full h-[150px]"
                    >
                      <img
                        src={item.preview}
                        onLoad={() => {
                          URL.revokeObjectURL(item.preview);
                        }}
                      />
                      {/* <div>{URL.createObjectURL(item)}</div> */}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        <div className="flex justify-end gap-6">
          <div className="h-8 flex items-center bg-active rounded-md px-4 py-0 text-white text-sm">
            Cancel
          </div>
          <div
            className="h-8 flex items-center bg-active rounded-md px-4 py-0 text-white text-sm"
            onClick={handleSaveClick}
          >
            Continue
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
