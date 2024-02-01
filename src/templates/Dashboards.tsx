/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import "../index.css";
import { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import TasksSection from "../components/DashboardComps/TasksSection";
import DonutChart from "../components/DonutChart";
import SampleChart from "../components/SampleChart";
import DBBanner from "../components/DashboardComps/dbBanner";
import PageLayout from "../components/page-layout";
import { Image } from "@yext/sites-components";
import { Main } from "../layout/main";
import Suggestions from "../components/DashboardComps/Suggestions";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-prof-dashboard",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "slug",
      "id",
      "name",
      "uid",
      "meta",
      "c_attestation",
      "c_advisorNickname",
      "c_recognitionTitle",
      "c_jobTitle",
      "c_jobTitleAbbreviation",
      "c_titleDisplay",
      "c_clientFocuses",
      "c_aboutAdvisorShortDescription",
      "c_expertiseCommentsRTv2",
      "c_expertiseComments",
      "c_profileDelegates.delegateEmail",
      "c_profileDelegates.delegateUserID",
      "c_profileDelegates.giveProfileControl",
      "c_associatedInsights.id",
      "c_languagesV2",
      "photoGallery",
      "emails",
      "hours",
      "mainPhone",
      "address.line1",
      "address.line2",
      "address.line3",
      "address.postalCode",
      "headshot",
      "address.region",
      "address.sublocality",
      "addressHidden",
      "c_inGoodStanding",
      "address.city",
      "address.countryCode",
      "address.extraDescription",
      "c_registrations",
      "c_educationDisplay.degree",
      "c_educationDisplay.school",
      "c_volunteeringDisplay",
      "c_organizationsDisplay",
      "c_awardsDashboard.nameOfAwardOrHonor",
      "c_awardsDashboard.yearsReceived",
      "c_industryLevelOfExperience",
      "c_designations.abbreviation",
      "c_designations.date",
      "c_designations.name",
      "c_hobbiesAndInterests",
      "c_fAQs.answer",
      "c_fAQs.question",
      "c_assetRanges",
      "c_meetingPreference",
      "c_preferredFirstName",
      "c_meetingPlacePreference",
      "c_inTouchPreference",
      "c_conversationPreference",
      "c_conversationFocus",
      "c_meetingTime",
      "c_disagreements",
      "c_recommendations",
      "c_charts",
      "c_introvertedOrExtroverted",
      "c_planning",
      "c_laidBack",
      "c_homeRepairs",
      "c_photoGallery.alternateText",
      "c_photoGallery.height",
      "c_photoGallery.url",
      "c_photoGallery.width",
      "c_matchFinderPhoto.alternateText",
      "c_matchFinderPhoto.height",
      "c_matchFinderPhoto.url",
      "c_matchFinderPhoto.width",
      "c_taskGroups",
      "c_teamMembers.name",
      "c_teamMembers.c_jobTitle",
      "c_teamMembers.slug",
      "c_teamMembers.photoGallery",
      "c_UpcomingEvents.name",
      "c_UpcomingEvents.id",
      "c_UpcomingEvents.photoGallery",
      "c_UpcomingEvents.time",
      "c_color",
      "c_fonts",
      "c_heroBanner",
      "c_template",
      "geocodedCoordinate",
      "c_teamDescriptionRTv2",
      "c_teamName",
      "c_serviceAreas",
      "c_associatedBlogs.landingPageUrl",
      "c_associatedBlogs.description",
      "c_associatedBlogs.name",
      "c_associatedBlogs.id",
      "c_associatedBlogs.c_category",
      "c_associatedBlogs.c_datePublished",
      "c_associatedBlogs.photoGallery",
      "c_associatedClientStories.landingPageUrl",
      "c_associatedClientStories.title",
      "c_associatedClientStories.description",
      "c_associatedClientStories.name",
      "c_associatedClientStories.photoGallery",
      "c_associatedInsights.title",
      "c_associatedInsights.description",
      "c_associatedInsights.name",
      "c_associatedInsights.externalArticlePostDate",
      "c_associatedInsights.c_category",
      "c_associatedInsights.photoGallery",
      "c_associatedSolutions.landingPageUrl",
      "c_associatedSolutions.title",
      "c_associatedSolutions.description",
      "c_associatedSolutions.name",
      "c_associatedSolutions.c_category",
      "c_associatedSolutions.photoGallery",
      "c_associatedFAQs.answer",
      "c_associatedFAQs.question",
      "yearsOfExperience",
    ],
    filter: {
      entityTypes: ["financialProfessional"],
      savedFilterIds: ["1151082997"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};
/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};
declare global {
  interface Window {
    YEXT_AUTH: { visitor: { externalId: string } };
  }
}
/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Dashboards: Template<TemplateRenderProps> = ({ document }) => {
  const analyticsData = [
    {
      SearchTerm: "RBC Services",
      Impressions: 56000,
      Clicks: 1500,
      CTR: 2.68,
      Position: 4.7,
    },
    {
      SearchTerm: "Online RBC",
      Impressions: 31000,
      Clicks: 1200,
      CTR: 3.87,
      Position: 6.2,
    },
    {
      SearchTerm: "RBC Banking",
      Impressions: 42000,
      Clicks: 1800,
      CTR: 4.29,
      Position: 2.4,
    },
    {
      SearchTerm: "RBC Accounts",
      Impressions: 69000,
      Clicks: 2500,
      CTR: 3.62,
      Position: 8.1,
    },
    {
      SearchTerm: "RBC Finance",
      Impressions: 48000,
      Clicks: 900,
      CTR: 1.88,
      Position: 3.5,
    },
    {
      SearchTerm: "RBC Online",
      Impressions: 36000,
      Clicks: 2000,
      CTR: 5.56,
      Position: 7.8,
    },
    {
      SearchTerm: "RBC Cards",
      Impressions: 55000,
      Clicks: 2800,
      CTR: 5.09,
      Position: 5.3,
    },
    {
      SearchTerm: "RBC Solutions",
      Impressions: 4200,
      Clicks: 800,
      CTR: 19.05,
      Position: 1.9,
    },
    {
      SearchTerm: "RBC Support",
      Impressions: 27000,
      Clicks: 1500,
      CTR: 5.56,
      Position: 9.0,
    },
    {
      SearchTerm: "RBC Info",
      Impressions: 61000,
      Clicks: 1200,
      CTR: 1.97,
      Position: 4.1,
    },
  ];
  const tabs = [
    "About me",
    "My Team",
    "Analytics",
    "Suggestions",
    "Learning & Support",
  ];
  const [styleSheetRef, setStyleSheetRef] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>(tabs[0]);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  useEffect(() => {
    const element = window.parent.document
      .querySelector(`head>link`)
      ?.getAttribute("href");
    element && setStyleSheetRef(element);
  }, []);

  return (
    <Main>
      <PageLayout _site={document._site} document={document}>
        <div className="space-y-4 bg-slate-200 ">
          <DBBanner
            styleSheetRef={styleSheetRef}
            name={document.name}
            _site={document._site}
            headshot={document.headshot}
            color={document.c_color}
          ></DBBanner>
          <div className="px-6">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                value={currentTab}
                onChange={(e) => setCurrentTab(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10  focus:border-black focus:outline-none focus:ring-[#4492d3]  "
              >
                {tabs.map((tab) => (
                  <option key={tab} value={tab}>
                    {tab}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a
                      key={tab}
                      className={classNames(
                        tab === currentTab
                          ? "border-[#4492d3] border-b-4 text-black font-bold"
                          : "border-transparent border-b-4 text-[#4492d3] hover:border-gray-300 hover:text-gray-700 font-medium",
                        "  border-b-2 py-4 px-1 hover:cursor-pointer"
                      )}
                      onClick={() => setCurrentTab(tab)}
                    >
                      {tab}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {currentTab === "About me" ? (
            <div className="px-4 flex flex-row w-full gap-2">
              <div className="w-3/5">
                <TasksSection
                  tasks={document._site.c_taskGroups}
                  document={document}
                ></TasksSection>
              </div>
              <div className="w-2/5 flex flex-col gap-4">
                <div className="flex flex-col gap-4 p-5  bg-white">
                  <div className="font-bold text-gray-900">
                    {document._site.c_dashboardCompletionLabel}
                  </div>
                  <div className="text-gray-900">
                    {document._site.c_dashboardCompletionDescription}
                  </div>
                  <SampleChart></SampleChart>
                </div>
                <div className="flex flex-col gap-4 border p-5  bg-white">
                  <div className="font-bold text-gray-900">
                    Remaining Incomplete Fields
                  </div>
                  <div className="text-gray-900">
                    Fill out the required fields listed below to complete your
                    profile
                  </div>
                </div>
              </div>
            </div>
          ) : currentTab === "Analytics" ? (
            <div className="flex flex-row gap-4">
              <div className="p-4 bg-4 w-1/2 bg-white flex flex-col gap-4">
                <div className="text-3xl">Your Website Analytics</div>
                <BarChart />
              </div>
              <div className="p-4 bg-4 w-1/2 bg-white flex flex-col gap-4">
                <div className="text-3xl capitalize">
                  How users find my website
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-center items-center text-xs">
                    <table className="w-4/5 border-collapse">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border p-2">Search Term</th>
                          <th className="border p-2">Impressions</th>
                          <th className="border p-2">Clicks</th>
                          <th className="border p-2">CTR</th>
                          <th className="border p-2">Position</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analyticsData.map((row, index) => (
                          <tr key={index} className="border">
                            <td className="border p-2">{row.SearchTerm}</td>
                            <td className="border p-2">{row.Impressions}</td>
                            <td className="border p-2">{row.Clicks}</td>
                            <td className="border p-2">{row.CTR}</td>
                            <td className="border p-2">{row.Position}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <DonutChart />
                </div>
                <div className="bg-white text-center border-t text-gray-800 m-auto flex justify-center items-center w-full py-8 mx-auto">
                  <div className="flex flex-col gap-4 w-full px-4">
                    <div className="text-xl font-semibold">
                      Email, Contact Me, and Phone Call Clicks
                    </div>
                    <div>Last 60 Days</div>
                    <div className="w-full grid grid-cols-3 justify-between">
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="text-xl">18</div>
                        <div className="text-sm">Total Email Clicks</div>
                      </div>
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="text-xl">4</div>
                        <div className="text-sm">Form Fills</div>
                      </div>
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="text-xl">4</div>
                        <div className="text-sm">Total Phone Call Clicks</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : currentTab === "Suggestions" ? (
            <Suggestions />
          ) : currentTab === "Learning & Support" ? (
            <div className="flex flex-col p-4 pb-12  m-4 gap-16  bg-white w-2/3">
              <div className="text-2xl font-bold text-[#003168]">
                Learning Center
              </div>
              <div className="flex justify-center gap-8  ">
                <div className="flex flex-col gap-2 text-center">
                  <img
                    className="w-60 mx-auto"
                    src="https://www.pngplay.com/wp-content/uploads/5/Live-Webinar-Gray-Logo-PNG.png"
                    alt=""
                  />
                  <div className="font-bold text-sm">Webinars</div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Register for Yext 101: New Agent Website Set-Up
                  </div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Register for Yext 201: SEO & Reviews
                  </div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Register for Yext 201: Google Business Profile & Community
                    Engagement
                  </div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Register for Yext 301: Analytics & Website Performance
                  </div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Register for Yext Monthly Special Feature Webinar
                  </div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Sign Up for White Glove Office Hours
                  </div>
                </div>
                <div className="flex flex-col gap-2  text-center">
                  <img
                    className="w-32 mx-auto"
                    src="https://www.seekpng.com/png/full/242-2425880_one-click-support-customer-service-icon-png.png"
                    alt=""
                  />
                  <div className="font-bold text-sm mt-12 ">
                    One-on-one Call with an Advisor
                  </div>
                  <div className="text-left">
                    As part of the Agency Program, you receive assistance with
                    optimizing your website from a Yext advisor.
                  </div>
                  <div></div>
                  <div className="text-sm hover:cursor-pointer text-blue-700">
                    Schedule a call
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border m-4 p-4 bg-white space-y-4">
              <div className="text-2xl font-bold text-[#003168]">
                {document.c_displayTeamName
                  ? document.c_displayTeamName
                  : `Team name`}
              </div>
              <div className=" font-medium text-[#003168]">
                A team is defined as a group of people who perform
                interdependent tasks to work toward accomplishing a common
                mission or specific objective. Some teams have a limited life:
                for example, a design team developing a new product, or a
                continuous proces
              </div>
              {document.c_teamMembers && (
                <div className="grid grid-cols-4 gap-4 border  p-8">
                  {document.c_teamMembers.map((item: any, index: any) => (
                    <div className=" border  !w-[250px] flex flex-col gap-2">
                      <div>
                        {item.photoGallery ? (
                          <Image
                            image={item.photoGallery[0]}
                            className=""
                          ></Image>
                        ) : (
                          <img
                            src="https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg"
                            alt=""
                            className="h-[250px] w-[250px]"
                          />
                        )}
                      </div>
                      <div className="text-[#003168] font-bold text-lg px-2">
                        {item.name.split(" - ")[0]}
                      </div>
                      <a
                        href={`/{item.slug}`}
                        className="w-auto flex justify-between items-center text-center border bg-[#e2e8f0] text-black px-8 py-1 rounded-md mx-auto"
                      >
                        View Profile
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </PageLayout>
    </Main>
  );
};

export default Dashboards;
export const identifyDataType = (data: any) => {
  try {
    JSON.parse(data);
    return "object";
  } catch (error) {
    return "string";
  }
};
