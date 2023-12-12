import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import { fetch } from "@yext/pages/util";

const getFields = async (
  request: SitesHttpRequest
): Promise<SitesHttpResponse> => {
  const { method, pathParams } = request;

  const { userId } = pathParams;
  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;

  if (method !== "GET") {
    return { body: "Method not allowed", headers: {}, statusCode: 405 };
  }

  if (!userId) {
    return { body: "Missing entityId", headers: {}, statusCode: 400 };
  }

  const getFieldsResponse = await fetch(
    `https://sbx-api.yextapis.com/v2/accounts/me/users/${userId}?api_key=${api_key}&v=20230601`
  );

  const resp = await getFieldsResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getFields;
