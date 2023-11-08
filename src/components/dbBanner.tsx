import * as React from "react";
import { FiRefreshCw, FiCheck } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { FcCancel } from "react-icons/fc";
export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type DBBanner = {
  name?: string;
  address?: Address;
  openTime?: string;
  children?: React.ReactNode;
};

const renderPrettyAddress = (address?: Address) => {
  return (
    <>
      {address && (
        <span>
          {address.line1} in {address.city}, {address.region}
        </span>
      )}
    </>
  );
};

const DBBanner = (props: DBBanner) => {
  const { name, address, children } = props;

  return (
    <>
      <div className="bg-[#032169]  text-white p-4 flex items-center justify-center flex-row space-x-20 w-full">
        <div className="flex items-center flex-row  gap-4">
          <div>
            <img
              src="http://a.mktgcdn.com/p/IZcDStz4s4N2XMnvQDUE3IUVVCQDTC8dNTUpT5jOSm8/200x200.jpg"
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="w-3/5 flex flex-col gap-4">
            <div className="text-3xl font-bold">Welcome, Scott!</div>
            <div>
              Welcome to your dashboard – your one-stop-shop to set up and
              manage your online profile for Merrill Advisor Match. Complete all
              required fields in each section below to become discoverable. Once
              edited, all changes will route for approval. For status of your
              enrollment, review the indicator on the right. For any questions,
              please contact merrillsupport@yext.com, or call 1-866-226-1723
              between 9AM-5PM EST, Monday-Friday.
            </div>
            <div className="flex gap-4">
              <div className="bg-slate-200 px-4 py-2 rounded-md text-gray-800 font-semibold text-xs ">
                Scott A'Hweam
              </div>
              <div className="bg-slate-200 px-4 py-2 rounded-md text-gray-800 font-semibold text-xs">
                Preview your Match page
              </div>
            </div>
          </div>
          <div className="bg-white text-center text-gray-800 m-auto flex justify-center items-center w-2/5 py-8 mx-auto">
            <div className="flex flex-col gap-4 w-full px-4">
              <div className="text-xl font-semibold">Approval Requests </div>
              <div>Last 60 Days</div>
              <div className="w-full grid grid-cols-4 justify-between">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="text-xl">0</div>
                  <div className="text-sm">Pending</div>
                  <FiRefreshCw className="h-3 w-3 text-orange-500" />
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="text-xl">4</div>
                  <div className="text-sm">Approved</div>
                  <FiCheck className="h-3 w-3 text-green-500" />
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="text-xl">0</div>
                  <div className="text-sm">Rejected</div>
                  <GrFormClose className="h-3 w-3 text-red-500" />
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="text-xl">1</div>
                  <div className="text-sm">Cancelled</div>
                  <FcCancel className="h-3 w-3 text-gray-800" />
                </div>
              </div>
              <div className="bg-gray-700 px-4 py-2 mx-auto rounded-md text-gray-50 text-sm   w-fit">
                View All Approval Requests
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default DBBanner;
