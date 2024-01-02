import * as React from "react";
import { Image } from "@yext/sites-components";
import BlogPosts from "../relatedBlogs";
import Hours from "../hours";
import { useMyContext } from "../Context/MyContext";

const Preview = ({ data }: any) => {
  const { data: _data } = useMyContext();
  const { c_preferredFirstName } = _data;

  const { name, mainPhone, photoGallery, c_associatedBlogs, hours } = data;
  return (
    <div className="centered-container">
      <div className="bg-blue-500 text-white p-4">
        This is a Tailwind CSS component. {c_preferredFirstName}
      </div>
      <div className="bg-white w-full mb-4">
        <div>
          <div className="relative text-center">
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
                        ? name
                            .split("-")[1]
                            .replace("RBC Wealth Management ", "")
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

          <div className="w-full flex flex-col md:flex-row  mt-4 centered-container">
            <div className="w-full md:w-2/3 ">
              <div className="text-xl font-semibold mb-4">About me</div>
              {/* <div className="px-2">
                {c_advisorBio ? c_advisorBio : description}
              </div> */}

              {/* <div className="py-4 px-16 mx-auto my-auto hidden md:block">
                {geocodedCoordinate && (
                  <StaticMap
                    latitude={geocodedCoordinate.latitude}
                    longitude={geocodedCoordinate.longitude}
                  ></StaticMap>
                )}
              </div> */}
            </div>
            <div className="w-full md:w-1/3">
              <span className=" hidden md:block">
                <div className="  gap-y-5">
                  <div className="text-xl font-semibold mb-4">Address</div>

                  {/* <div className="  gap-y-3">
                    <div>{address.line1}</div>
                    {address.line2 && <div>{address.line2}</div>}
                    <div>
                      {address.city}, {address.region} {address.postalCode}
                    </div>
                  </div> */}
                </div>
              </span>
              <div className="mt-8">
                {hours && <Hours title={"I'm available on"} hours={hours} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {c_associatedBlogs && <BlogPosts inpData={c_associatedBlogs}></BlogPosts>}
      {/* {c_associatedClientStories && (
        <ClientStories inpData={cpy}></ClientStories>
      )}
      {c_associatedInsights && <Insights inpData={cpy} />}
      {c_associatedFAQs && <FAQs inpData={cpy}></FAQs>}
      {c_associatedSolutions && <Solutions inpData={cpy}></Solutions>} */}
    </div>
  );
};

export default Preview;
