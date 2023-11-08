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
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import Banner from "../components/banner";
import Contact from "../components/contact";
import Cta from "../components/cta";
import Hours from "../components/hours";
import List from "../components/list";
import PageLayout from "../components/page-layout";
import StaticMap from "../components/static-map";
import "../index.css";
import TasksSection from "../components/DashboardComps/TasksSection";
import DBBanner from "../components/dbBanner";
import SampleChart from "../components/SampleChart";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-dashboard",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "richTextDescriptionV2",
      "name",
      "slug",
      "c_alternateDashboardHeroDescription",
      "c_currentBRStaging",
      "c_dashboardAlertBanner",
      "c_dashboardAlertBannerNoProducerID",
      "c_dashboardCompletionDescription",
      "c_dashboardCompletionETLErrorThreshold",
      "c_dashboardCompletionETLLastRuntime",
      "c_dashboardCompletionLabel",
      "c_dashboardHeroDescription",
      "c_dashboardMatchingSection1Description",
      "c_dashboardPagesURLText",
      "c_fieldsExemptFromAnnualReview",
      "c_fieldsThatScore",
      "c_hasAboutAdvisorShortDescription",
      "c_progressBarDescription",
      "c_taskGroups",
    ],
    filter: {
      entityIds: ["dashboard"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};
/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
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
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    richTextDescriptionV2,
    name,
    c_alternateDashboardHeroDescription,
    c_currentBRStaging,
    c_dashboardAlertBanner,
    c_dashboardAlertBannerNoProducerID,
    c_dashboardCompletionDescription,
    c_dashboardCompletionETLErrorThreshold,
    c_dashboardCompletionETLLastRuntime,
    c_dashboardCompletionLabel,
    c_dashboardHeroDescription,
    c_dashboardMatchingSection1Description,
    c_dashboardPagesURLText,
    c_fieldsExemptFromAnnualReview,
    c_fieldsThatScore,
    c_hasAboutAdvisorShortDescription,
    c_progressBarDescription,
    c_taskGroups,
  } = document;

  return (
    <>
      <PageLayout>
        <div className="space-y-4 bg-slate-200">
          <DBBanner name="Hwllo"></DBBanner>
          <div className="px-4 flex flex-row w-full gap-2">
            <div className="w-3/5">
              <TasksSection taskGroup={c_taskGroups}></TasksSection>
            </div>
            <div className="w-2/5 flex flex-col gap-4">
              <div className="flex flex-col gap-4 p-5  bg-white">
                <div className="font-bold text-gray-900">
                  Your Advisor Match Profile Progress
                </div>
                <div className="text-gray-900">
                  In order to participate in Merrill Advisor Match, your profile
                  must be 100% complete. Please fill out all required fields –
                  these are marked with an *asterisk*.
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
        </div>
      </PageLayout>
    </>
  );
};

export default Location;
