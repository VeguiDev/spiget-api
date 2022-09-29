"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Resource_1 = require("../class/Resource");
const SpigetAPI_1 = require("../class/SpigetAPI");
const api = new SpigetAPI_1.SpigetAPI("test");
jest.setTimeout(10000);
let resource = null;
describe('check if Resource Methods works', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        resource = yield api.getResource(28140);
    }));
    it('check if resource is not null', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(resource).not.toBeNull();
    }));
    it('check if GetDownloadURL Works', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!resource)
            return;
        let url = yield resource.getDownloadUrl();
        if (!url) {
            expect(url).not.toBeNull();
            return;
        }
        expect(url).toBeInstanceOf(Object);
        expect(typeof url.url == 'string').toBe(true);
        expect(typeof url.name == 'string').toBe(true);
    }));
    it('check if resource reviews', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!resource)
            return;
        let reviews = yield resource.getReviews();
        if (!reviews) {
            expect(reviews).not.toBeNull();
            return;
        }
        expect(reviews).toBeInstanceOf(Array);
        expect(reviews[0]).toBeInstanceOf(Resource_1.ResourceReview);
    }));
    it('check if resource updates', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!resource)
            return;
        let updates = yield resource.getUpdates();
        if (!updates) {
            expect(updates).not.toBeNull();
            return;
        }
        expect(updates).toBeInstanceOf(Array);
        expect(updates[0]).toBeInstanceOf(Resource_1.ResourceUpdate);
    }));
    it('check if resource update', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!resource)
            return;
        let update = yield resource.getUpdate("latest");
        if (!update) {
            expect(update).not.toBeNull();
            return;
        }
        expect(update).toBeInstanceOf(Resource_1.ResourceUpdate);
    }));
    it('check if resource invalid update returns null', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!resource)
            return;
        let update = yield resource.getUpdate(5465464);
        expect(update).toBeNull();
        expect(update).not.toBeInstanceOf(Resource_1.ResourceUpdate);
    }));
    it('check if resource versions', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!resource)
            return;
        let versions = yield resource.getVersions();
        if (!versions) {
            expect(versions).not.toBeNull();
            return;
        }
        expect(versions).toBeInstanceOf(Array);
        expect(versions[0]).toBeInstanceOf(Resource_1.ResourceVersion);
    }));
    it('check if resource version', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!resource)
            return;
        let version = yield resource.getVersion("latest");
        if (!version) {
            expect(version).not.toBeNull();
            return;
        }
        expect(version).toBeInstanceOf(Resource_1.ResourceVersion);
    }));
    it('check if resource description and links', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!resource)
            return;
        let description = resource.description;
        let links = resource.links;
        expect(typeof description == 'string').toBe(true);
        expect(typeof links == 'object').toBe(true);
    }));
    it('check if getDownloadURL ResourceVersion works', () => __awaiter(void 0, void 0, void 0, function* () {
        let version = yield (resource === null || resource === void 0 ? void 0 : resource.getVersion("latest"));
        if (!version)
            return;
        let url = yield version.getDownloadURL();
        if (!url) {
            expect(url).not.toBeNull();
            return;
        }
        expect(url).toBeInstanceOf(Object);
        expect(typeof url.url == 'string').toBe(true);
        expect(typeof url.name == 'string').toBe(true);
    }));
});
it('check if getResources works', () => __awaiter(void 0, void 0, void 0, function* () {
    let resources = yield api.getResources({
        size: 2
    });
    if (!resources) {
        expect(resources).not.toBeNull();
        return;
    }
    expect(resources).toBeInstanceOf(Array);
    expect(resources[0]).toBeInstanceOf(Resource_1.Resource);
}));
let resources = null;
it('check if getResources for version works', () => __awaiter(void 0, void 0, void 0, function* () {
    resources = resources = yield api.getResources({
        version: ["1.19"],
        size: 2
    });
    if (!resources) {
        expect(resources).not.toBeNull();
        return;
    }
    expect(resources).toBeInstanceOf(Array);
    expect(resources[0]).toBeInstanceOf(Resource_1.Resource);
}));
it('check if message Review works', () => __awaiter(void 0, void 0, void 0, function* () {
    let review = new Resource_1.ResourceReview({
        id: 0,
        message: "dGVzdA=="
    }, {}, {});
    expect(review.message).toBe("test");
}));
it('check if dscription update works', () => __awaiter(void 0, void 0, void 0, function* () {
    let update = new Resource_1.ResourceUpdate({
        id: 0,
        description: "dGVzdA=="
    }, {});
    expect(update.description).toBe("test");
}));
it('check if Gets DOWNLOAD URL OF GITHUB RESOURCE works', () => __awaiter(void 0, void 0, void 0, function* () {
    let resource = yield api.getResource(2124);
    if (!resource) {
        expect(resource).not.toBeNull();
        return;
    }
    let url = yield resource.getDownloadUrl();
    if (!url)
        return;
    expect(url).toBeInstanceOf(Object);
    expect(typeof url.url == 'string').toBe(true);
    expect(typeof url.name == 'string').toBe(true);
}));
