import axios from "axios";

const defaultHeaders = {
  Accept: "application/json, */*",
  "Content-type": "application/json"
};

const createConfig = (method, endpoint, header, body) => {
  return {
    url: endpoint,
    method: method,
    data: body,
    headers: {
      ...defaultHeaders,
      ...header
    }
  };
};

export const Fetch = async ({ url, header, body, resp200, resp204 }) => {
  //const config = createConfig("GET", url, header, body);

  const result = await axios.get(url);

  if (result.status === 200 && resp200) resp200(result.data, result);
  if (result.status === 204 && resp204) resp204(result.data, result);
};
