import * as React from "react";
import { FiRefreshCw, FiCheck } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { FcCancel } from "react-icons/fc";
import { Image } from "../../types/financial_professionals";
import RTF from "../RTF";
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
  headshot: Image;
  _site?: any;
  color: string;
};

const DBBanner = (props: DBBanner) => {
  const { name, children, headshot, color = "#032169" } = props;

  return (
    <>
      <div
        style={{ background: color }}
        className="text-white p-4 flex items-center justify-center flex-row space-x-20 w-full"
      >
        <div className="flex items-center flex-row  gap-4">
          <div>
            {headshot && (
              <img src={headshot.url} className="w-full h-full"></img>
            )}
          </div>
          <div className="w-3/5 flex flex-col gap-4">
            <div className="text-3xl font-bold">
              Welcome, {name?.split("-")[0]}!
            </div>
            <div>
              {props._site.c_dashboardHeroDescription && (
                <RTF>{props._site.c_dashboardHeroDescription}</RTF>
              )}
            </div>
            <div className="flex gap-4">
              <div className="bg-slate-200 px-4 py-2 rounded-md text-gray-800 font-semibold text-xs ">
                {props.name?.split("-")[0]}
              </div>
              <div className="bg-slate-200 px-4 py-2 rounded-md text-gray-800 font-semibold text-xs">
                {/* <a href="/preview.html"> */}
                {props._site.c_dashboardPagesURLText}
                {/* </a> */}
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
