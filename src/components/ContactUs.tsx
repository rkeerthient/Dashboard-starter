import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import { Fragment, useState } from "react";
import { IoClose } from "react-icons/io5";
type ContactProps = {
  showPopUp: (value: boolean) => void;
};
const ContactUs = (props: ContactProps) => {
  const { showPopUp } = props;
  const [open, setOpen] = useState(true);
  console.log(`enmtnered`);

  return (
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="  transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all  w-[700px]  sm:p-6 text-sm">
                <div className="flex flex-row justify-between w-full">
                  <div className="mx-auto flex h-44 w-full items-center justify-center rounded-full flex-col gap-4 ">
                    <img
                      className="w-16"
                      src="https://www.rbcroyalbank.com/dvl/v1.0/assets/images/logos/rbc-logo-shield.svg"
                      alt=""
                    />
                    <div className="font-light text-4xl">Contact RBC Team</div>
                    <div className="text-slate-400 text-lg font-light">
                      * Required Fields
                    </div>
                  </div>
                  <IoClose
                    className="hover:cursor-pointer"
                    onClick={() => {
                      setOpen(false);
                      showPopUp(false);
                    }}
                  />
                </div>
                <div className=" mt-5 flex flex-col gap-2 space-y-6 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="text-base font-medium">Your Name*</div>
                    <div className="flex justify-between w-full gap-6">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="border text-lg border-black rounded-full p-4 h-14 w-1/2"
                      />

                      <input
                        type="text"
                        placeholder="Last Name"
                        className="border text-lg border-black rounded-full p-4 h-14 w-1/2"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-base font-medium">
                      How can we contact you?*
                    </div>
                    <div className="flex w-full">
                      <input
                        type="email"
                        placeholder="Email"
                        className="border text-lg border-black rounded-full  p-4 h-14 w-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex justify-between w-full gap-6">
                      <input
                        placeholder="Work Phone (optional)"
                        type="phone"
                        className="border text-lg border-black rounded-full  p-4 h-14 w-1/2"
                      />

                      <input
                        type="phone"
                        placeholder="Work Phone (optional)"
                        className="border text-lg border-black rounded-full  p-4 h-14 w-1/2"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="  w-fit flex justify-center  mx-auto rounded-md bg-[#015cad] px-3 py-2  font-semibold text-white shadow-sm  "
                    onClick={() => {
                      setOpen(false);
                      showPopUp(false);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ContactUs;
