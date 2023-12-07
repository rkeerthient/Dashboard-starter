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
import { useState } from "react";
import { Switch } from "@headlessui/react";
import BarChart from "../components/BarChart";
import TasksSection from "../components/DashboardComps/TasksSection";
import DonutChart from "../components/DonutChart";
import SampleChart from "../components/SampleChart";
import { SectionData } from "../components/SectionsData";
import DBBanner from "../components/dbBanner";
import PageLayout from "../components/page-layout";
import CustomEditor from "../components/DashboardComps/LexicalRichText/LexicalRichTextEditor";
import PhotoUpload from "../components/DashboardComps/FieldComponents.tsx/PhotoUpload";
import TestEditor from "../components/DashboardComps/LexicalRichText/LexicalMarkdownEditor";
import LexicalMarkdownEditor from "../components/DashboardComps/LexicalRichText/LexicalMarkdownEditor";
import LexicalRichTextEditor from "../components/DashboardComps/LexicalRichText/LexicalRichTextEditor";
import ImgbbUploader from "../components/ImgbbUploader";
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
      "c_teamNameAndSite.teamEntityId",
      "c_teamNameAndSite.teamName",
      "c_teamNameAndSite.teamSite",
      "c_displayTeamName",
      "c_languagesV2",
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
    ],
    filter: {
      entityTypes: ["financialProfessional", "ce_dashboardEntity"],
      savedFilterIds: ["1306250257"],
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
  const {
    slug,
    id,
    name,
    meta,
    c_attestation,
    c_advisorNickname,
    c_recognitionTitle,
    c_jobTitle,
    c_jobTitleAbbreviation,
    c_titleDisplay,
    c_clientFocuses,
    c_aboutAdvisorShortDescription,
    c_expertiseComments,
    c_profileDelegates,
    c_teamNameAndSite,
    c_displayTeamName,
    c_languagesV2,
    mainPhone,
    address,
    c_registrations,
    c_educationDisplay,
    c_volunteeringDisplay,
    c_organizationsDisplay,
    c_awardsDashboard,
    c_industryLevelOfExperience,
    c_designations,
    c_hobbiesAndInterests,
    c_fAQs,
    c_fAQs1,
    c_assetRanges,
    c_meetingPreference,
    c_meetingPlacePreference,
    c_inTouchPreference,
    c_conversationPreference,
    c_conversationFocus,
    c_meetingTime,
    c_disagreements,
    c_recommendations,
    c_charts,
    c_introvertedOrExtroverted,
    c_planning,
    c_laidBack,
    c_homeRepairs,
    c_photoGallery,
    c_matchFinderPhoto,
    c_taskGroups,
    c_preferredFirstName,
    headshot,
  } = document;

  const data = [
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
  const tabs = ["About me", "My Team", "Analytics"];
  const [currentTab, setCurrentTab] = useState<string>(tabs[0]);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <PageLayout>
        <div className="space-y-4 bg-slate-200">
          {/* <DBBanner name={name} headshot={headshot}></DBBanner>
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
                  tasks={SectionData}
                  document={document}
                ></TasksSection>
              </div>
              <div className="w-2/5 flex flex-col gap-4">
                <div className="flex flex-col gap-4 p-5  bg-white">
                  <div className="font-bold text-gray-900">
                    Your Advisor Match Profile Progress
                  </div>
                  <div className="text-gray-900">
                    In order to participate in Merrill Advisor Match, your
                    profile must be 100% complete. Please fill out all required
                    fields – these are marked with an *asterisk*.
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
                        {data.map((row, index) => (
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
          ) : (
            `Team View`
          )} */}
        </div>
      </PageLayout>
    </>
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
