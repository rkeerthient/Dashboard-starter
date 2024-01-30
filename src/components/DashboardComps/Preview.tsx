import { LexicalRichText } from "@yext/react-components";
import * as React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  C_awardsDashboard,
  C_clientFocuses,
  C_designations,
  C_hobbiesAndInterests,
  C_serviceAreas,
} from "../../types/financial_professionals";
import { useMyContext } from "../Context/MyContext";
import { EnumData } from "../EnumData";
import PhotoCarousel from "../PhotoCarousel";
import ServiceAreaMap from "../ServiceAreaMap";
import TeamCarousel from "../TeamCarousel";
import Banner from "../banner";
import ClientStories from "../clientStories";
import FAQs from "../faqs";
import Hours from "../hours";
import PageLayout from "../page-layout";
import BlogPosts from "../relatedBlogs";
import Insights from "../relatedInsights";
import Solutions from "../solutions";
import StaticMap from "../static-map";
const Preview = ({ data }: any) => {
  const { data: _data } = useMyContext();
  const {
    c_preferredFirstName,
    c_heroBanner,
    c_aboutAdvisorShortDescription,
    c_expertiseCommentsRTv2,
    c_hobbiesAndInterests,
    c_clientFocuses,
    c_languagesV2,
    geocodedCoordinate,
    c_fonts,
    c_educationDisplay,
    c_organizationsDisplay,
    _site,
    c_designations,
    c_awardsDashboard,
    c_teamName,
    c_teamDescriptionRTv2,
    c_teamMembers,
    c_serviceAreas,
    c_associatedClientStories,
    c_associatedFAQs,
    c_associatedInsights,
    c_associatedSolutions,
    yearsOfExperience,
    c_template,
    c_associatedBlogs,
    c_UpcomingEvents,
  } = _data;
  const [showPopUp, setShowPopUp] = useState(false);
  const { name, mainPhone, photoGallery, hours, address } = data;

  return (
    <div>
      {showPopUp && (
        <div className="relative z-10">
          <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div>
                <div className="  transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all  w-[700px]  sm:p-6 text-sm">
                  <div className="flex flex-row justify-between w-full">
                    <div className="mx-auto flex h-44 w-full items-center justify-center rounded-full flex-col gap-4 ">
                      <img
                        className="w-16"
                        src="https://www.rbcroyalbank.com/dvl/v1.0/assets/images/logos/rbc-logo-shield.svg"
                        alt=""
                      />
                      <div className="font-light text-4xl">
                        Contact RBC Team
                      </div>
                      <div className="text-slate-400 text-lg font-light">
                        * Required Fields
                      </div>
                    </div>
                    <IoClose
                      className="hover:cursor-pointer"
                      onClick={() => {
                        // setOpen(false);
                        setShowPopUp(false);
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
                        // setOpen(false);
                        setShowPopUp(false);
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <PageLayout _site={_site}>
        <div
          style={{
            fontFamily: c_fonts && c_fonts.toLowerCase().replaceAll(" ", ""),
          }}
        >
          <div className={`bg-white py-16`}>
            <Banner
              headshot={photoGallery[0]}
              bannerImg={c_heroBanner}
              name={name.split("-")[0]}
              mainPhone={mainPhone}
              title={name.split("-")[1]}
              showPopUp={(e) => setShowPopUp(e)}
            ></Banner>
            <div className="centered-container flex flex-col gap-4 text-[#252525]">
              {c_template !== "HORIZON" ? (
                <div className="centered-container my-4">
                  <div className="flex w-full justify-evenly items-center">
                    <div className=" ">
                      <div className="flex flex-col gap-2 ">
                        <div className="gap-y-8">
                          <div className="text-xl font-semibold mb-4">
                            Address
                          </div>
                          <div className=" gap-y-3">
                            <div>{address.line1}</div>
                            {address.line2 && <div>{address.line2}</div>}
                            <div>
                              {address.city}, {address.region}{" "}
                              {address.postalCode}
                            </div>
                          </div>
                          <div className="w-fit mt-4 text-sm hover:border-b bg-[#025cae] text-white py-2 px-4 rounded-full font-bold border hover:cursor-pointer hover:border-[#d62211] hover:bg-white hover:text-[#d62211]">
                            Get Directions
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      {geocodedCoordinate && (
                        <StaticMap
                          latitude={geocodedCoordinate.latitude}
                          longitude={geocodedCoordinate.longitude}
                        ></StaticMap>
                      )}
                    </div>
                    <div className=" ">
                      {hours && (
                        <div className="mt-2 !text-sm">
                          {JSON.stringify(hours) !== "{}" && (
                            <Hours title={"I'm available on"} hours={hours} />
                          )}
                        </div>
                      )}
                      {c_UpcomingEvents && (
                        <div className="flex flex-col gap-2 mt-8">
                          <div className="font-bold">Upcoming Events</div>
                          {c_UpcomingEvents.map((item, index) => (
                            <div key={index}>
                              {item.name} at{" "}
                              {new Date(item.time.start).toLocaleDateString(
                                "en-US"
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 my-4 mb-8">
                    <div className="text-xl font-semibold ">About me</div>
                    <div className="">{c_aboutAdvisorShortDescription}</div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex  flex-row gap-14 mt-4 centered-container">
                  <div className="w-full md:w-2/3 ">
                    <div className="text-xl font-semibold ">About me</div>
                    <div className="">{c_aboutAdvisorShortDescription}</div>
                    <div className="py-4 px-16 mx-auto my-auto hidden md:block  h-3/4 w-3/4">
                      {geocodedCoordinate && (
                        <StaticMap
                          latitude={geocodedCoordinate.latitude}
                          longitude={geocodedCoordinate.longitude}
                        ></StaticMap>
                      )}
                    </div>
                  </div>
                  <div className="w-full md:w-1/3">
                    <span className=" hidden md:block">
                      <div className="gap-y-5">
                        <div className="text-xl font-semibold mb-4">
                          Address
                        </div>
                        <div className="  gap-y-3">
                          <div>{address.line1}</div>
                          {address.line2 && <div>{address.line2}</div>}
                          <div>
                            {address.city}, {address.region}{" "}
                            {address.postalCode}
                          </div>
                        </div>
                      </div>
                    </span>
                    {hours && (
                      <div className="mt-8">
                        {JSON.stringify(hours) !== "{}" && (
                          <Hours title={"I'm available on"} hours={hours} />
                        )}
                      </div>
                    )}

                    {c_UpcomingEvents && (
                      <div className="flex flex-col gap-2 mt-8">
                        <div className="font-bold">Upcoming Events</div>
                        {c_UpcomingEvents.map((item, index) => (
                          <div key={index}>
                            {item.name} at{" "}
                            {new Date(item.time.start).toLocaleDateString(
                              "en-US"
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="centered-container flex flex-col gap-4 text-[#252525]">
              <div className="flex gap-4 mt-4 px-8">
                <div className="flex flex-col gap-2 w-4/5  text-[#252525]">
                  <div className="flex w-full justify-between border-t pt-4 px-8">
                    <div className=" flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold text-lg">Experience</div>
                        <div className=" font-light">
                          {yearsOfExperience} years
                        </div>
                      </div>
                      {c_languagesV2 && (
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold text-lg">Languages</div>
                          <div className="flex flex-col font-light">
                            {c_languagesV2.map((item, index) => (
                              <div key={index}>{item}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className=" flex flex-col gap-6">
                      {c_educationDisplay && (
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold text-lg">Education</div>
                          <div className="flex flex-col font-light">
                            {c_educationDisplay.map((item, index) => (
                              <div key={index}>
                                {item.degree}, {item.school}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className=" flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold text-lg">
                          Client Focuses
                        </div>
                        <div className="flex flex-col font-light">
                          {c_clientFocuses.map((item, index) => (
                            <div key={index}>{C_clientFocuses[item]}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full !bg-[#025cae] !text-white ">
            <div className="flex flex-col gap-2 p-4 py-16 centered-container">
              <div className="text-xl font-semibold">
                More about {c_preferredFirstName}!
              </div>
              <div>
                <LexicalRichText
                  serializedAST={JSON.stringify(c_expertiseCommentsRTv2.json)}
                />
              </div>
              <PhotoCarousel data={photoGallery}></PhotoCarousel>
            </div>
          </div>
          <div className="w-full bg-white text-[#252525]">
            <div className="flex justify-between max-w-screen-2xl mx-auto p-16 py-10">
              <div className="w-1/3 px-4 flex flex-col gap-6">
                {c_organizationsDisplay && (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-lg">Organizations</div>
                      <div className="flex flex-col font-light">
                        {c_organizationsDisplay.map(
                          (item: string, index: number) => (
                            <div key={index}>{item}</div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {c_designations && (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-lg">Designations</div>
                      <div className="flex flex-col font-light">
                        {c_designations.map(
                          (item: C_designations, index: number) => (
                            <div key={index}>
                              {item.name}{" "}
                              {item.abbreviation && `(${item.abbreviation})`} -{" "}
                              {item.date.toLocaleString("en-US")}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex px-4 w-1/3 flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-lg">
                    Volunteer Experience
                  </div>
                  <div className="flex flex-col font-light">
                    {c_clientFocuses.map((item, index) => (
                      <div key={index}>{EnumData[item]}</div>
                    ))}
                  </div>
                </div>
                {c_awardsDashboard && (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-lg">Awards</div>
                      <div className="flex flex-col font-light">
                        {c_awardsDashboard.map(
                          (item: C_awardsDashboard, index: number) => (
                            <div key={index}>
                              {item.nameOfAwardOrHonor} -{" "}
                              {item.yearsReceived
                                ?.sort((a, b) => a - b)
                                .join(", ")}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex px-4 w-1/3 flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-lg">
                    Hobbies & Interests
                  </div>
                  <div className="flex flex-col font-light">
                    {c_hobbiesAndInterests.map((item, index) => (
                      <div key={index}>{C_hobbiesAndInterests[item]}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            {c_associatedClientStories && (
              <ClientStories inpData={_data}></ClientStories>
            )}
            {c_associatedInsights && <Insights inpData={_data} />}
            {c_associatedFAQs && <FAQs inpData={_data}></FAQs>}
            {c_associatedSolutions && <Solutions inpData={_data}></Solutions>}
            {c_associatedBlogs && <BlogPosts inpData={data}></BlogPosts>}
          </div>
          {c_serviceAreas && (
            <div className="w-full bg-white ">
              <div className=" flex justify-between px-4 py-8 centered-container">
                <div className="w-1/2 flex justify-between items-center">
                  {c_preferredFirstName} is based out of {address.city},
                  {address.region}, but is licensed in the following states:{" "}
                  {c_serviceAreas
                    .map((item) => C_serviceAreas[item])
                    .join(", ")}
                </div>
                <div className="w-1/2">
                  <ServiceAreaMap />
                </div>
              </div>
            </div>
          )}
          <div className="!bg-[#025cae] !text-white">
            {c_teamName && c_teamMembers && (
              <div className=" bg-[#f7f0e4] teamCarousel">
                <TeamCarousel
                  teamName={c_teamName}
                  teamMembersData={c_teamMembers}
                  teamDescription={c_teamDescriptionRTv2}
                ></TeamCarousel>
              </div>
            )}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Preview;
