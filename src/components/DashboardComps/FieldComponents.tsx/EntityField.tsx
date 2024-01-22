import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import LexicalMarkdownEditor from "../LexicalRichText/LexicalMarkdownEditor";
import Ce_blog from "../../../types/blog";
import PhotoGalleryField from "./PhotoGalleryField";
import { useMyContext } from "../../Context/MyContext";
import * as React from "react";
interface EntityFieldProps {
  initialValue?: Ce_blog[];
  fieldId: string;
}

const EntityField = ({ initialValue }: EntityFieldProps) => {
  const [blogPosts, setBlogPosts] = useState<Ce_blog[]>(initialValue || []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [newBlog, setNewBlog] = useState<Ce_blog>({});
  const { userRole } = useMyContext();
  const handleClick = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          ...newBlog,
          c_associatedBlogs: ["4635269"],
        })
      );

      const response = await fetch(`/api/createEntity?body=${requestBody}`);
      const resp = await response.json();
      const buildRespJson = {
        c_category: await resp.response.c_category,
        name: await resp.response.name,
        id: await resp.response.meta.id,
      };
      resp &&
        buildRespJson &&
        setBlogPosts((prevPosts: any) => {
          return [...prevPosts, buildRespJson];
        });
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${JSON.stringify(error)}:`,
        error
      );
    } finally {
      setIsEditable(false);
      setOpen(false);
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
    setIsEditable(false);
  };
  return (
    <>
      <div
        className={`w-full px-4 py-3 ${
          isEditable ? `bg-containerBG` : `bg-transparent`
        }`}
      >
        {isLoading && <div>isLoading...</div>}
        {isEditable ? (
          <>
            <div className="space-y-2">
              {blogPosts.map((item, index) => (
                <div className="flex flex-col" key={index}>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-sm">{item.id}</div>
                </div>
              ))}
            </div>
            <div
              className={`text-sm text-linkColor mt-2 hover:cursor-pointer`}
              onClick={() => setOpen(true)}
            >
              + Add blog
            </div>
          </>
        ) : (
          <div onClick={handleClick} className="hover:cursor-pointer">
            {(blogPosts && (
              <div className="space-y-2">
                {blogPosts.map((item, index) => (
                  <div className="flex flex-col" key={index}>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm">{item.id}</div>
                  </div>
                ))}
              </div>
            )) ||
              "Click to add"}
          </div>
        )}
      </div>
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={React.Fragment}
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
                as={React.Fragment}
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
                        setOpen(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="p-8 text-sm">
                    <div className="flex flex-col gap-6">
                      <div className="text-xl font-bold">New Blog</div>

                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>Name</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <input
                            type="text"
                            className="border w-full p-1"
                            onChange={(e) =>
                              setNewBlog({
                                ...newBlog,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>Landing page Url</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <input
                            type="text"
                            className="border w-full p-1"
                            onChange={(e) =>
                              setNewBlog({
                                ...newBlog,
                                landingPageUrl: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>Category</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <input
                            type="text"
                            className="border w-full p-1"
                            onChange={(e) =>
                              setNewBlog({
                                ...newBlog,
                                c_category: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>PhotoGallery</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <PhotoGalleryField
                            passDataToParent={true}
                            setUrlData={(urlData: string[]) =>
                              setNewBlog((prevNewBlog: any) => ({
                                ...prevNewBlog,
                                photoGallery: urlData.map((url) => ({
                                  image: {
                                    url: url,
                                  },
                                })),
                              }))
                            }
                            editMode={true}
                            fieldId={""}
                            initialValue={undefined}
                          ></PhotoGalleryField>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>Date posted</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <input
                            type="text"
                            className="border w-full p-1"
                            onChange={(e) =>
                              setNewBlog({
                                ...newBlog,
                                c_datePublished: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <div className="font-semibold text-[#5a6370] w-1/5">
                          <div className="flex flex-col gap-1">
                            <div className="flex  gap-2 items-center relative">
                              <div>Body</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <LexicalMarkdownEditor
                            serializedAST={""}
                            editable={true}
                            setChangedData={(richText: string) => {
                              setNewBlog({
                                ...newBlog,
                                c_body: richText,
                              });
                            }}
                          ></LexicalMarkdownEditor>
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-6 gap-3 justify-end">
                      <div
                        className={`h-8 flex items-center bg-active rounded-md px-4 py-0 text-white text-sm ${
                          isLoading
                            ? `bg-disabled pointer-events-none`
                            : `bg-active hover:cursor-pointer`
                        }`}
                        onClick={handleSave}
                      >
                        Continue
                      </div>
                      <button
                        onClick={handleCancel}
                        className={`text-xs text-linkColor`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default EntityField;
