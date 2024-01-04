import * as React from "react";
import { useEffect, useState } from "react";
import { useMyContext } from "../Context/MyContext";
export interface Root {
  uid: string;
  accountId: string;
  createdDate: string;
  lastUpdatedDate: string;
  resolvedDate: string;
  source: Source;
  entityFieldSuggestion: EntityFieldSuggestion;
  status: string;
  locked: boolean;
  comments: any[];
  approver: Approver;
}

export interface Source {
  userId: string;
}

export interface EntityFieldSuggestion {
  entity: Entity;
  existingContent: ExistingContent;
  suggestedContent: SuggestedContent;
}

export interface Entity {
  id: string;
  uid: string;
  type: string;
  language: string;
  folderId: string;
  labels: string[];
}

export interface ExistingContent {
  c_fAQs: CFAq[];
}

export interface CFAq {
  question: string;
  answer: string;
}

export interface SuggestedContent {
  c_fAQs: CFAq2[];
}

export interface CFAq2 {
  question: string;
  answer: string;
}

export interface Approver {
  userId: string;
}

export interface Source {
  userId: string;
}
const Suggestions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionsData, setSuggestionsData] = useState<Root[]>([]);
  const { userRole } = useMyContext();

  useEffect(() => {
    let isMounted = true;

    const getFieldConfig = async () => {
      const entityId = `4635269`;
      try {
        const response = await fetch(`/api/getSuggestions/${entityId}`);

        if (!isMounted) {
          return;
        }
        const mainJson: any = await response.json();
        const suggestions: Root[] = mainJson.response.suggestions
          .sort(
            (a: Root, b: Root) =>
              new Date(b.createdDate).getTime() -
              new Date(a.createdDate).getTime()
          )
          .filter((user: Root) => user.source.userId === userRole.id);
        console.log(JSON.stringify(suggestions.length));

        setSuggestionsData(suggestions);
      } catch (error) {
        console.error(
          `Failed to fetch field configuration for ${`4635269`}:`,
          error
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    getFieldConfig();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="px-4 py-3 ">
          <div
            className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      ) : userRole.acl[0].roleId === "1" ? (
        <div>There are no suggestions created</div>
      ) : (
        <div className="flex flex-col gap-2 px-4 centered-container text-sm text-slate-600 overflow-auto">
          {suggestionsData.map((item: Root, index: number) => (
            <div key={index} className="flex   border border-gray-300 w-full">
              <div className="border-r-2 border-gray-300 w-1/3 p-4">
                <div className="flex flex-col gap-4">
                  <div className="font-bold">Existing</div>
                  <div className="flex flex-col">
                    {Object.entries(
                      item.entityFieldSuggestion.existingContent
                    ).map(([key, value]) => (
                      <div key={index}>
                        <div>{key}</div>
                        <div>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className=" w-1/3 flex p-4 border-r-2 border-gray-300 ">
                <div className="flex flex-col gap-4 ">
                  <div className="font-bold">Suggested</div>
                  <div className="flex flex-col">
                    {Object.entries(
                      item.entityFieldSuggestion.suggestedContent
                    ).map(([key, value]) => (
                      <div key={index}>
                        <div>{key}</div>
                        <div>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className=" w-1/3 flex flex-col gap-2 p-4 ">
                <div className="flex flex-col ">
                  <div className="font-bold">Created</div>
                  <div>{item.createdDate}</div>
                </div>
                <div className="flex flex-col ">
                  <div className="font-bold">Status</div>
                  <div>{item.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Suggestions;
