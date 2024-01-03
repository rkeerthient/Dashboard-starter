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
} from "../../types/financial_professionals";
import PageLayout from "../page-layout";
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
  } = _data;
  console.log(c_designations);

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
              {" "}
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
    </PageLayout>
  );
};

export default Preview;
