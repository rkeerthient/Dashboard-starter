import * as React from "react";
import { Image } from "@yext/sites-components";
import BlogPosts from "../relatedBlogs";
import Hours from "../hours";
import { useMyContext } from "../Context/MyContext";
import StaticMap from "../static-map";
import { LexicalRichText } from "@yext/react-components";
import PhotoCarousel from "../PhotoCarousel";
import { EnumData } from "../EnumData";
import {
  C_awardsDashboard,
  C_clientFocuses,
  C_designations,
  C_hobbiesAndInterests,
  C_serviceAreas,
} from "../../types/financial_professionals";
import PageLayout from "../page-layout";
import ServiceAreaMap from "../ServiceAreaMap";
import ClientStories from "../clientStories";
import FAQs from "../faqs";
import Insights from "../relatedInsights";
import Solutions from "../solutions";
import TeamCarousel from "../TeamCarousel";
import Banner from "../banner";
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
  } = _data;

  const { name, mainPhone, photoGallery, c_associatedBlogs, hours, address } =
    data;
  console.log(c_template);

  return (
    <PageLayout _site={_site}>
      <div
        className={`bg-white py-16`}
        style={{
          fontFamily: c_fonts && c_fonts.toLowerCase().replaceAll(" ", ""),
        }}
      >
        <Banner
          headshot={photoGallery[0]}
          bannerImg={c_heroBanner}
          name={name.split("-")[0]}
          mainPhone={mainPhone}
          title={name.split("-")[1]}
        ></Banner>
        <div className="centered-container flex flex-col gap-4 text-[#252525]">
          {c_template !== "HORIZON" ? (
            <div className="centered-container my-4">
              <div className="flex w-full justify-evenly items-center">
                <div className=" ">
                  <div className="flex flex-col gap-2 ">
                    <div className="gap-y-8">
                      <div className="text-xl font-semibold mb-4">Address</div>
                      <div className=" gap-y-3">
                        <div>{address.line1}</div>
                        {address.line2 && <div>{address.line2}</div>}
                        <div>
                          {address.city}, {address.region} {address.postalCode}
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

                <div className="py-4 px-16 mx-auto my-auto hidden md:block h-3/4 w-3/4">
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
                    <div className="text-xl font-semibold mb-4">Address</div>
                    <div className="  gap-y-3">
                      <div>{address.line1}</div>
                      {address.line2 && <div>{address.line2}</div>}
                      <div>
                        {address.city}, {address.region} {address.postalCode}
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
                    <div className=" font-light">{yearsOfExperience} years</div>
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
                    <div className="font-semibold text-lg">Client Focuses</div>
                    <div className="flex flex-col font-light">
                      {c_clientFocuses.map((item, index) => (
                        <div key={item}>{C_clientFocuses[item]}</div>
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
              <div className="font-semibold text-lg">Volunteer Experience</div>
              <div className="flex flex-col font-light">
                {c_clientFocuses.map((item, index) => (
                  <div key={item}>{EnumData[item]}</div>
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
                          {item.yearsReceived?.sort((a, b) => a - b).join(", ")}
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
              <div className="font-semibold text-lg">Hobbies & Interests</div>
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
                .map((item, index) => C_serviceAreas[item])
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
    </PageLayout>
  );
};

export default Preview;
