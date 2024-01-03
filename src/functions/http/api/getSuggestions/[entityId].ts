import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import { fetch } from "@yext/pages/util";

const getSuugestions = async (
  request: SitesHttpRequest
): Promise<SitesHttpResponse> => {
  const { method, queryParams, pathParams } = request;

  const { entityId } = pathParams;

  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;

  console.log(
    `https://sbx-api.yextapis.com/v2/accounts/me/suggestions?entityIds=${entityId}&api_key=${api_key}&v=20230601`
  );

  if (!entityId) {
    return {
      body: "Missing entitygetFieldTypesId",
      headers: {},
      statusCode: 400,
    };
  }
  const getFieldsResponse = await fetch(
    `https://sbx-api.yextapis.com/v2/accounts/me/suggestions?entityIds=${entityId}&api_key=${api_key}&v=20230601&sortBy=[{"lastUpdatedDate":"descending"}]`
  );

  const resp = await getFieldsResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getSuugestions;
