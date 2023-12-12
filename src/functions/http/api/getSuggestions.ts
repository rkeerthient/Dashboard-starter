import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import { fetch } from "@yext/pages/util";

const GetSuggestions = async (
  request: SitesHttpRequest
): Promise<SitesHttpResponse> => {
  const { queryParams } = request;

  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;

  const { body, format } = queryParams;

  const getEntitiesResponse = await fetch(
    `https://sbx-api.yextapis.com/v2/accounts/me/suggestions?v=20230601${api_key}&v=20230601`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
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

export default GetSuggestions;
