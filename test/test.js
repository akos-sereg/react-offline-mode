import { expect } from 'chai';
import { setup, persistGet, getOfflineResponse, getConsumedLocalStorageSize } from '../src/index.js';
import mockedLocalStorage from './mocked-local-storage.js';

describe('react-offline-mode', function () {
    beforeEach(() => {
        setup(new mockedLocalStorage());
    });

    it('should store response of GET request', function () {
        persistGet('/api/item/12', '{ id: 12, name: "item" }');
        const persistedPayload = getOfflineResponse('/api/item/12');
        expect(persistedPayload).equal('{ id: 12, name: "item" }');
    });

    it('should respond null in case response not found', function () {
        const persistedPayload = getOfflineResponse('/api/item/12');
        expect(persistedPayload).equal(null);
    });

    it('should calculate consumed space in lcoalStorage', function () {
        persistGet('/api/item/12', '{ id: 12, name: "item" }');
        const size = getConsumedLocalStorageSize();
        expect(size).equal('{"GET /api/item/12":"{ id: 12, name: \\"item\\" }"}'.length);
    });
});