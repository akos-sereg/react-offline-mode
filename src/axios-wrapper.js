import { persistGet, persistPost, getOfflineResponse } from "./index";

const wrapper = (axios) => {
  const originalGet = axios.get;
  const originalPost = axios.post;

  axios.get = async (uri, params) => {
    const url = new URL(uri);
    const endpointUri = `${url.pathname}${url.search}`;

    const persistedResponse = getOfflineResponse('GET', endpointUri);
    if (persistedResponse) {
      return persistedResponse;
    }

    const result = await originalGet(uri, params);
    persistGet(endpointUri, result);
    return result;
  };

  axios.post = async (uri, data, params) => {
    const url = new URL(uri);
    const endpointUri = `${url.pathname}${url.search}`;

    const persistedResponse = getOfflineResponse('POST', endpointUri);
    if (persistedResponse) {
      return persistedResponse;
    }

    const result = await originalPost(uri, data, params);
    persistPost(endpointUri, result);
    return result;
  };

  return axios;
};

export default wrapper;
