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
  } = _data;
  console.log(c_serviceAreas);

  const { name, mainPhone, photoGallery, c_associatedBlogs, hours, address } =
    data;
  console.log(JSON.stringify(c_associatedBlogs));

  return (
    <PageLayout _site={_site}>
      <div
        className={`bg-white `}
        style={{
          fontFamily: c_fonts && c_fonts.toLowerCase().replaceAll(" ", ""),
        }}
      >
        <div className="relative text-center">
          {c_heroBanner && (
            <Image
              image={c_heroBanner}
              className="w-full !max-w-full"
              style={{ maxHeight: "470px" }}
            ></Image>
          )}
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2	">
            <div className="text-4xl headColor font-light h-64">
              <div className="flex gap-6">
                <div>
                  {photoGallery && (
                    <Image
                      className="inline-block h-32 !w-32 rounded-full"
                      image={photoGallery[0]}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <div>{name.includes("-") ? name.split("-")[0] : name}</div>
                  <div className="text-3xl">
                    {name.includes("-")
                      ? name.split("-")[1].replace("RBC Wealth Management ", "")
                      : ""}
                  </div>
                  <div className="text-2xl">
                    {mainPhone &&
                      mainPhone
                        .replace("+1", "")
                        .replace(/\D+/g, "")
                        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="centered-container flex flex-col gap-4 ">
          <div className="flex gap-4 mt-4 px-8">
            <div className="flex flex-col gap-2 w-4/5  ">
              <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold">About me</div>
                <div className="">{c_aboutAdvisorShortDescription}</div>
                <div className="py-4 px-16 mx-auto my-auto hidden md:block">
                  {geocodedCoordinate && (
                    <StaticMap
                      latitude={geocodedCoordinate.latitude}
                      longitude={geocodedCoordinate.longitude}
                    ></StaticMap>
                  )}
                </div>
              </div>
              <div className="flex w-full justify-between border-t pt-4">
                <div className="w-1/3 flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-lg">Experience</div>
                    <div>3 years</div>
                  </div>
                  {c_educationDisplay && (
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-lg">Education</div>
                      <div className="flex flex-col">
                        {c_educationDisplay.map((item, index) => (
                          <div key={index}>
                            {item.degree}, {item.school}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {c_languagesV2 && (
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-lg">Languages</div>
                      <div className="flex flex-col">
                        {c_languagesV2.map((item, index) => (
                          <div key={index}>{item}</div>
                        ))}{" "}
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-1/3 flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-lg">Client Focuses</div>
                    <div className="flex flex-col">
                      {c_clientFocuses.map((item, index) => (
                        <div key={item}>{C_clientFocuses[item]}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-1/3 flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-lg">Certifications</div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="text-xl font-semibold">Address</div>
                <div className="gap-y-3">
                  <div>{address.line1}</div>
                  {address.line2 && <div>{address.line2}</div>}
                  <div>
                    {address.city}, {address.region} {address.postalCode}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-xl">I'm available on</div>
                {hours && <Hours hours={hours}></Hours>}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 bg-yellow-100">
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
          <div className="grid grid-cols-3 w-full">
            <div className="flex flex-col gap-2">
              {c_organizationsDisplay && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-lg">Organizations</div>
                    <div className="flex flex-col">
                      {c_organizationsDisplay.map(
                        (item: string, index: number) => (
                          <div key={index}>{item}</div>
                        )
                      )}
                    </div>{" "}
                  </div>
                </div>
              )}
              {c_designations && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-lg">Designations</div>
                    <div className="flex flex-col">
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
              {c_awardsDashboard && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-lg">Awards</div>
                    <div className="flex flex-col">
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
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-lg">
                  Volunteer Experience
                </div>
                <div className="flex flex-col">
                  {c_clientFocuses.map((item, index) => (
                    <div key={item}>{EnumData[item]}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-lg">Hobbies & Interests</div>
                <div className="flex flex-col">
                  {c_hobbiesAndInterests.map((item, index) => (
                    <div key={index}>{C_hobbiesAndInterests[item]}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* {c_associatedClientStories && (
        <ClientStories inpData={cpy}></ClientStories>
      )}
      {c_associatedInsights && <Insights inpData={cpy} />}
      {c_associatedFAQs && <FAQs inpData={cpy}></FAQs>}
      {c_associatedSolutions && <Solutions inpData={cpy}></Solutions>} */}
        </div>
        <div className="mt-16">
          {c_associatedBlogs && <BlogPosts inpData={data}></BlogPosts>}
        </div>
      </div>
      <div className="centered-container mt-8">
        {c_teamName && c_teamDescriptionRTv2 && (
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {c_teamName}
                </h2>
                <LexicalRichText
                  serializedAST={JSON.stringify(c_teamDescriptionRTv2.json)}
                />
              </div>
              <ul
                role="list"
                className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
              >
                {c_teamMembers.map((person: any, index: any) => (
                  <li key={index}>
                    {person.photoGallery ? (
                      <img
                        className="aspect-[3/2] w-full rounded-2xl object-cover"
                        src={person.photoGallery[0].image.url}
                        alt=""
                      />
                    ) : (
                      <img
                        className="aspect-[3/2] w-full rounded-2xl object-cover"
                        src={`https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg`}
                        alt=""
                      />
                    )}
                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {person.name.split(" - ")[0]}
                    </h3>
                    <p className="text-base leading-7 text-gray-600">
                      {person.c_jobTitle}
                    </p>
                    <ul role="list" className="mt-6 flex gap-x-6">
                      <li>
                        <a
                          href={person.twitterUrl}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href={person.linkedinUrl}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          // <div className="flex-flex-col mx-auto justify-center">
          //   <div className="flex flex-col gap-2">
          //     <div>{c_teamName}</div>
          //     <div>
          //       <LexicalRichText
          //         serializedAST={JSON.stringify(c_teamDescriptionRTv2.json)}
          //       />
          //     </div>
          //     <TeamCarousel data={c_teamMembers}></TeamCarousel>
          //   </div>
          // </div>
        )}
      </div>
      {c_serviceAreas && (
        <div className="centered-container">
          <div className=" flex justify-between px-4 bg-white mt-8">
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
    </PageLayout>
  );
};

export default Preview;
