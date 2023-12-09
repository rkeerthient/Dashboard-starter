import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import { fetch } from "@yext/pages/util";

const putFields = async (
  request: SitesHttpRequest
): Promise<SitesHttpResponse> => {
  const { method, pathParams, queryParams } = request;

  const { putFieldsId } = pathParams;
  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;

  const { body, format } = queryParams;
  const getEntitiesResponse = await fetch(
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
  );

  const resp = await getEntitiesResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default putFields;