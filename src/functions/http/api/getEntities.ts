import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import { fetch } from "@yext/pages/util";

const getEntities = async (
  request: SitesHttpRequest
): Promise<SitesHttpResponse> => {
  const { queryParams } = request;

  const { entityType, inputString, pageToken } = queryParams;
  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;
  console.log(
    `https://sbx-api.yextapis.com/v2/accounts/me/entities?entityTypes=${entityType}&api_key=${api_key}&v=20230601&limit=2&sortBys=[{"name":"ASCENDING"}]${
      pageToken ? `&pageToken=${pageToken}` : ""
    }${
      inputString ? `&filter={ "name": { "$contains": "${inputString}" } }` : ""
    }`
  );

  const getFieldsResponse = await fetch(
    `https://sbx-api.yextapis.com/v2/accounts/me/entities?entityTypes=${entityType}&api_key=${api_key}&v=20230601&limit=2&sortBys=[{"name":"ASCENDING"}]${
      pageToken ? `&pageToken=${pageToken}` : ""
    }${
      inputString ? `&filter={ "name": { "$contains": "${inputString}" } }` : ""
    }`
  );

  const resp = await getFieldsResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getEntities;