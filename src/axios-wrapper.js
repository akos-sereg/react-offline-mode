import { persistGet, persistPost, getOfflineResponse, getMode } from "./index";
import { mode_off, mode_capturing, mode_capturing_and_serving } from "./constants";

const wrapper = (axios) => {
  const originalGet = axios.get;
  const originalPost = axios.post;

  axios.get = async (uri, params) => {
    const url = new URL(uri);
    const endpointUri = `${url.pathname}${url.search}`;

    if (getMode() === mode_capturing_and_serving) {
      const persistedResponse = getOfflineResponse('GET', endpointUri);
      if (persistedResponse) {
        return persistedResponse;
      }
    }

    const result = await originalGet(uri, params);
    if (getMode() !== mode_off) {
      persistGet(endpointUri, result);
    }

    return result;
  };

  axios.post = async (uri, data, params) => {
    const url = new URL(uri);
    const endpointUri = `${url.pathname}${url.search}`;

    if (getMode() === mode_capturing_and_serving) {
      const persistedResponse = getOfflineResponse('POST', endpointUri);
      if (persistedResponse) {
        return persistedResponse;
      }
    }

    const result = await originalPost(uri, data, params);
    if (getMode() !== mode_off) {
      persistPost(endpointUri, result);
    }
    return result;
  };

  return axios;
};

export default wrapper;
