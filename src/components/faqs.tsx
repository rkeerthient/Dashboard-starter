import * as React from "react";
import MarkdownView from "react-showdown";
import { Image } from "@yext/sites-components";

export default function FAQs(inpData: any) {
  let data = inpData.inpData;
  let clData = data.c_associatedFAQs;
  let bgColor = inpData.bgColor;

  return (
    <div
      className="!text-white"
      style={bgColor ? { backgroundColor: bgColor } : { backgroundColor: `#025cae` }}
    >
      <div className="mx-auto px-8 py-16 pt-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 centered-container">
          <div className="lg:col-span-5">
            <h2 className="text-3xl  leading-10 tracking-tight headColor">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-base leading-7  ">
              Can’t find the answer you’re looking for? Reach out to our&nbsp;
              <a href="#" className="font-semibold underline ">
                customer support&nbsp;
              </a>
              team.
            </p>
          </div>
          <div
            className="mt-10 lg:col-span-7 lg:mt-0"
            style={{ height: "300px", overflow: "scroll" }}
          >
            <dl className="space-y-10">
              {clData &&
                clData.map((faq: any) => (
                  <div key={faq.question}>
                    <dt className="text-base font-semibold leading-7  ">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-base leading-7  ">
                      <MarkdownView
                        markdown={faq.answer}
                        options={{ tables: true, emoji: true }}
                      />
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
