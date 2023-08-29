import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_STATE, mode_capturing, mode_capturing_and_serving } from './constants.js';

let _localStorage;

const setup = (storage) => {
    _localStorage = storage;
};

const getLocalStorage = () => {
    if (_localStorage) {
        return _localStorage;
    }

    if (typeof localStorage !== 'undefined') {
        return localStorage;
    }

    throw Error('localStorage not available');
};

const getMode = () => {
  const localStorageMode = getLocalStorage().getItem(LOCAL_STORAGE_KEY_STATE);
  if (!localStorageMode) {
    return mode_capturing_and_serving;
  }

  return localStorageMode;
};

const getPersistedResponses = () => {
    const persistedResponses = getLocalStorage().getItem(LOCAL_STORAGE_KEY);

    if (!persistedResponses) {
        return {};
    }

    return JSON.parse(persistedResponses);
};

const persistGet = (uri, responsePayload) => {
    const persistedResponses = getPersistedResponses();
    persistedResponses[`GET ${uri}`] = responsePayload;

    console.log(`[offline mode] persist GET ${uri}`);
    getLocalStorage().setItem(LOCAL_STORAGE_KEY, JSON.stringify(persistedResponses));
};

const persistPost = (uri, responsePayload) => {
  const persistedResponses = getPersistedResponses();
  persistedResponses[`POST ${uri}`] = responsePayload;

  console.log(`[offline mode] persist POST ${uri}`);
  getLocalStorage().setItem(LOCAL_STORAGE_KEY, JSON.stringify(persistedResponses));
};

const getOfflineResponse = (method, uri) => {
    const persistedResponses = getPersistedResponses();
    const response = persistedResponses[`${method} ${uri}`] ?? null;

    if (response) {
      console.log(`[offline mode] serve: ${uri}`);
    }

    return response;
};

const clearStorage = () => {
    getLocalStorage().setItem(LOCAL_STORAGE_KEY, "{}");
};

const getConsumedLocalStorageSize = () => {
    return JSON.stringify(getPersistedResponses()).length;
};

const getPersistedResponsesCount = () => {
  return Object.keys(getPersistedResponses()).length;
}

export {
    setup,
    clearStorage,
    getMode,
    persistGet,
    persistPost,
    getOfflineResponse,
    getConsumedLocalStorageSize,
    getPersistedResponsesCount,
};
