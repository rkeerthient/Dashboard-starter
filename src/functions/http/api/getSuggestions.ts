import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import { fetch } from "@yext/pages/util";

const GetSuggestions = async (
  request: SitesHttpRequest
): Promise<SitesHttpResponse> => {
  console.log(JSON.stringify(request));

  return {
    body: JSON.stringify("resp"),
    headers: {},
    statusCode: 200,
  };
};

export default GetSuggestions;
