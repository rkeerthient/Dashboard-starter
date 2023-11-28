import * as React from "react";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

const PhotoUpload = () => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const { open } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    noClick: true,
    multiple: true,
    noKeyboard: true,
    onDrop: (acceptedFiles: FileWithPath[]) => {
      setFiles((prevFiles) =>
        prevFiles.concat(
          acceptedFiles.map((file: any) => ({
            ...file,
            preview: URL.createObjectURL(file),
          }))
        )
      );
    },
  });
  const handleSaveClick = () => {
    // Access URLs from the files state and do something with them
    const imageUrls = files.map((file) => file.preview);
    console.log("Image URLs:", imageUrls);
    // Add your logic to save or process the URLs as needed
  };
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
