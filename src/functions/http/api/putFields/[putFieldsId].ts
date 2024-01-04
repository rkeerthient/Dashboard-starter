import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import { fetch } from "@yext/pages/util";

const putFields = async (
  request: SitesHttpRequest
): Promise<SitesHttpResponse> => {
  const { method, pathParams, queryParams } = request;

  const { putFieldsId } = pathParams;
  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;
  const { body, format, userRole } = queryParams;
  let getEntitiesResponse;
  userRole === "19718"
    ? (getEntitiesResponse = await fetch(
        `https://sbx-api.yextapis.com/v2/accounts/me/suggestions?api_key=${api_key}&v=20230601${
          format ? `&format=${format}` : ""
        }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(buildBody(body, putFieldsId)),
        }
      ))
    : (getEntitiesResponse = await fetch(
        `https://sbx-api.yextapis.com/v2/accounts/me/entities/${putFieldsId}?api_key=${api_key}&v=20230601${
          format ? `&format=${format}` : ""
        }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: body,
        }
      ));

  const resp = await getEntitiesResponse.json();
  console.log(await resp);

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default putFields;

const buildBody = (extData: any, entityId: any) => {
  let suggestedContent = extData;

  if (typeof extData === "string") {
    suggestedContent = JSON.parse(extData);
  }

  return {
    entityFieldSuggestion: {
      entity: {
        id: entityId,
      },
      suggestedContent: {
        ...suggestedContent,
      },
    },
  };
};
