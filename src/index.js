import {
  LOCAL_STORAGE_KEY_QUOTA,
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_KEY_STATE,
  mode_serving,
  DEFAULT_QUOTA_IN_MB,
} from './constants.js';

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
    return mode_serving;
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
  if (getConsumedLocalStorageSize() / 1024 / 1024 > getQuota()) {
    return;
  }

  const persistedResponses = getPersistedResponses();
  persistedResponses[`GET ${uri}`] = responsePayload;

  console.log(`[offline mode] persist GET ${uri}`);
  getLocalStorage().setItem(LOCAL_STORAGE_KEY, JSON.stringify(persistedResponses));
};

const persistPost = (uri, responsePayload) => {
  if (getConsumedLocalStorageSize() / 1024 / 1024 > getQuota()) {
    return;
  }

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

const setQuota = (quotaInMb) => {
  getLocalStorage().setItem(LOCAL_STORAGE_KEY_QUOTA, quotaInMb);
};

const getQuota = () => {
  const quota = getLocalStorage().getItem(LOCAL_STORAGE_KEY_QUOTA);
  if (!quota) {
    return DEFAULT_QUOTA_IN_MB;
  }

  return quota;
};

const importPayloadCollection = (payloadCollection) => {
  if (payloadCollection.length / 1024 / 1024 > getQuota()) {
    console.warn('Could not import: payload collection size exceeds quota');
    return;
  }

  getLocalStorage().setItem(LOCAL_STORAGE_KEY, payloadCollection);
};

const getPersistedResponsesCount = () => {
  return Object.keys(getPersistedResponses()).length;
};

export {
  setup,
  setQuota,
  getQuota,
  clearStorage,
  getMode,
  persistGet,
  persistPost,
  getOfflineResponse,
  getConsumedLocalStorageSize,
  getPersistedResponsesCount,
  getPersistedResponses,
  importPayloadCollection,
};
