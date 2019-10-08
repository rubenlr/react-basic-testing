import axios from "axios";

const defaultHeaders = {
  Accept: "application/json, */*",
  "Content-type": "application/json"
};

const createConfig = (method, url, header, body) => {
  return {
    url: url,
    method: method,
    data: body,
    headers: {
      ...defaultHeaders,
      ...header
    }
  };
};

async function execute(
  config,
  resp200,
  resp204,
  resp20X,
  error,
  error400,
  error403,
  error404,
  error40X,
  error500,
  errorConnectionAbort,
  errorServerNotFound,
  beginLoading,
  endLoading
) {
  try {
    if (beginLoading) {
      beginLoading();
    }

    const result = await axios.request(config);

    if (result.status >= 200 && result.status < 300) {
      if (resp20X) {
        resp20X(result.data, result);
      }

      if (result.status === 200 && resp200) {
        resp200(result.data, result);
      } else if (result.status === 204 && resp204) {
        resp204(result.data, result);
      }
    }
  } catch (err) {
    if (error) {
      error(err);
    }

    if (err) {
      const { status, code } = err;

      if (code === "ECONNABORTED" && errorConnectionAbort) {
        errorConnectionAbort(err);
      }

      const errorString = err.toString().toLowerCase();
      const networkError = errorString.indexOf("network error") > -1;

      if (networkError && errorServerNotFound) {
        errorServerNotFound(err);
      } else if (status >= 400 && status < 500) {
        if (error40X) {
          error40X(err.data, err);
        }
        if (status === 400 && error400) {
          error400(err.data, err);
        } else if (status === 403 && error403) {
          error403(err.data, err);
        } else if (status === 404 && error404) {
          error404(err.data, err);
        }
      } else if (status >= 500 && status < 600) {
        if (status === 500) {
          error500(err.data, err);
        }
      }
    }
  } finally {
    if (endLoading) {
      endLoading();
    }
  }
}

export const Fetch = async ({
  url,
  header,
  body,
  resp200,
  resp204,
  resp20X,
  error,
  error400,
  error403,
  error404,
  error40X,
  error500,
  errorConnectionAbort,
  errorServerNotFound,
  beginLoading,
  endLoading
}) => {
  const config = createConfig("GET", url, header, body);
  await execute(
    config,
    resp200,
    resp204,
    resp20X,
    error,
    error400,
    error403,
    error404,
    error40X,
    error500,
    errorConnectionAbort,
    errorServerNotFound,
    beginLoading,
    endLoading
  );
};
