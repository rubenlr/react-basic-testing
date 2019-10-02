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

export const Fetch = async ({
  url,
  header,
  body,
  resp200,
  resp204,
  resp20X
}) => {
  //const config = createConfig("GET", url, header, body);

  try {
    const result = await axios.get(url);

    if (result.status >= 200 && result.status < 300 && resp20X) {
      resp20X(result.data, result);
    }

    if (result.status === 200 && resp200) {
      resp200(result.data, result);
    } else if (result.status === 204 && resp204) {
      resp204(result.data, result);
    }
  } catch (error) {
    console.log("Fetch.error", error);
  }
};
