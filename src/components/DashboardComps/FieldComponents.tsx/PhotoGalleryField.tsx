import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PhotoUpload from "./PhotoUpload";
import { TrashIcon } from "@heroicons/react/20/solid";
interface PhotoGalleryFieldProps {
  fieldId?: string;
  initialValue?: any;
  passDataToParent?: boolean;
  setUrlData?: (urlData: string[]) => void;
  editMode?: boolean;
}
const PhotoGalleryField = ({
  fieldId,
  initialValue,
  passDataToParent = false,
  setUrlData,
  editMode = false,
}: PhotoGalleryFieldProps) => {
  const [open, setOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(editMode);

  const [imgUrls, setImgUrls] = useState<string[]>(
    initialValue && initialValue.map((item: any) => item.url)
  );
  const [isContentEdited, setIsContentEdited] = useState<boolean>(false);
  const handleClick = () => {
    setIsEditable(true);
  };

  const handleDelete = (imgUrl: string | string[]) => {
    setImgUrls(
      imgUrls.filter((item: any, currentIndex: any) => item !== imgUrl)
    );
  };
  useEffect(() => {
    passDataToParent && imgUrls && setUrlData(imgUrls);
    setIsContentEdited(
      JSON.stringify(imgUrls) !==
        JSON.stringify(
          initialValue && initialValue.map((item: any) => item.url)
        )
    );
  }, [imgUrls, initialValue]);

  const handleSave = async () => {
    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          [fieldId as string]: imgUrls.map((item: any) => {
            return { url: item };
          }),
        })
      );
      const response = await fetch(
        `/api/putFields/${`4635269`}?body=${requestBody}`
      );
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${JSON.stringify(error)}:`,
        error
      );
    }

    setIsEditable(false);
  };
  const handleCancel = () => {
    initialValue
      ? setImgUrls(initialValue.map((item: any) => item.url))
      : setImgUrls([]);
    setIsEditable(false);
  };
  return (
    <>
      <div
        className={`w-full px-4 py-3  max-h-96 overflow-scroll ${
          !editMode && isEditable ? `bg-containerBG` : `bg-transparent`
        }`}
      >
        {isEditable ? (
          <>
            <div className="flex flex-col gap-4">
              {imgUrls &&
                imgUrls.length &&
                imgUrls.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between border-b pb-4"
                    >
                      <div
                        className={`w-[160px] flex flex-col justify-center h-[160px] rounded-[3px]  border`}
                      >
                        <img
                          src={item}
                          className="  max-w-[160px] max-h-[160px] "
                          alt=""
                        />
                      </div>
                      <TrashIcon
                        className="w-4 h-4 hover:cursor-pointer"
                        onClick={() => handleDelete(item)}
                      />
                    </div>
                  );
                })}
              <button
                className={`text-xs text-linkColor mr-auto`}
                onClick={() => setOpen(true)}
              >
                Select Photos
              </button>
            </div>
          </>
        ) : (
          <div onClick={handleClick} className="hover:cursor-pointer">
            {
              <>
                <div className="flex flex-col gap-4">
                  {imgUrls ? (
                    imgUrls.length >= 1 &&
                    imgUrls.map((item: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className="w-[160px] flex flex-col justify-center h-[160px] border hover:border hover:border-fieldFocusBorder rounded-[3px] p-1"
                        >
                          <img
                            src={item}
                            className="  max-w-[160px] max-h-[160px] "
                            alt=""
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div>Clck here!</div>
                  )}
                </div>
              </>
            }
          </div>
        )}
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-full overflow-y-auto">
            <div className="flex min-h-full items-end justify-center text-center sm:items-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-2/4 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setImgUrls(initialValue);
                        setOpen(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <PhotoUpload
                      imgUrls={(newUrls) => {
                        setImgUrls((prevUrls: string[] | undefined) => [
                          ...(prevUrls || []),
                          ...newUrls,
                        ]);
                      }}
                      multiple={true}
                      isOpen={(val: boolean) => setOpen(val)}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {!editMode && isEditable && (
        <div className="flex w-full gap-2 text-xs pt-2 font-bold">
          <button
            onClick={handleSave}
            disabled={!isContentEdited}
            className={`w-fit flex justify-center h-8 py-1 font-normal px-4 rounded-s text-xs border items-center ${
              !isContentEdited
                ? `border-fieldAndBorderBGGrayColor bg-disabled text-disabledColor pointer-events-none`
                : `border-fieldAndBorderBGGrayColor bg-active text-white`
            }`}
          >
            Save for 1 Profile
          </button>
          <button onClick={handleCancel} className={`text-xs text-linkColor`}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default PhotoGalleryField;
