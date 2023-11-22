import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import { fetch } from "@yext/pages/util";

const putFields = async (
  request: SitesHttpRequest
): Promise<SitesHttpResponse> => {
  const { method, pathParams, queryParams } = request;

  const { entityId } = pathParams;
  const api_key = import.meta.env.YEXT_PUBLIC_DEV_API_KEY as string;

  // Check if fieldId and fieldValue exist in queryParams
  const { fieldId, fieldValue } = queryParams;
  if (!fieldId || !fieldValue) {
    return {
      body: "Missing fieldId or fieldValue in queryParams",
      headers: {},
      statusCode: 400,
    };
  }

  // Construct the bodyData object
  let bodyData = { [fieldId]: ["fieldValue1", "FieldValue 2"] };

  if (!entityId) {
    return { body: "Missing entityId", headers: {}, statusCode: 400 };
  }

  const getEntitiesResponse = await fetch(
    `https://sbx-api.yextapis.com/v2/accounts/me/entities/${entityId}?api_key=${api_key}&v=20230601`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(bodyData),
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
