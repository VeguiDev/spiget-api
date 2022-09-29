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
const APIClient_1 = require("../class/APIClient");
const Author_1 = require("../class/Author");
const Resource_1 = require("../class/Resource");
const SpigetAPI_1 = require("../class/SpigetAPI");
const api = new SpigetAPI_1.SpigetAPI("test");
jest.setTimeout(10000);
it('check if get author', () => __awaiter(void 0, void 0, void 0, function* () {
    let author = yield api.getAuthorByID(2);
    expect(author).toBeInstanceOf(Author_1.Author);
}));
it('check if get authors', () => __awaiter(void 0, void 0, void 0, function* () {
    let authors = yield api.getAuthors({
        size: 2
    });
    if (!authors) {
        expect(authors).not.toBeNull();
        return;
    }
    expect(authors).toBeInstanceOf(Array);
    expect(authors[0]).toBeInstanceOf(Author_1.Author);
}));
it("check if can get author resources", () => __awaiter(void 0, void 0, void 0, function* () {
    let author = yield api.getAuthorByID(100356);
    if (!author) {
        expect(author).not.toBeNull();
        return;
    }
    let resources = yield author.getResources({
        size: 2
    });
    if (!resources) {
        expect(resources).not.toBeNull();
        return;
    }
    expect(resources).toBeInstanceOf(Array);
    if (resources.length > 0) {
        expect(resources[0]).toBeInstanceOf(Resource_1.Resource);
    }
}));
it("check if works review class constructor", () => __awaiter(void 0, void 0, void 0, function* () {
    expect(new Author_1.Review({
        id: 0,
        message: "dGVzdA==",
        rating: {
            count: 1,
            average: 10
        },
        author: {
            id: 0
        },
        date: 1531651654,
        resource: 0,
        version: '1.19'
    }, {}, {})).toBeInstanceOf(Author_1.Review);
}));
it("check if works review message getter", () => __awaiter(void 0, void 0, void 0, function* () {
    let rev = new Author_1.Review({
        id: 0,
        message: "dGVzdA==",
        rating: {
            count: 1,
            average: 10
        },
        author: {
            id: 0
        },
        date: 1531651654,
        resource: 0,
        version: '1.19'
    }, {}, {});
    let isString = typeof rev.message == 'string';
    expect(isString).toBe(true);
}));
it("check if can get author reviews", () => __awaiter(void 0, void 0, void 0, function* () {
    let author = yield api.getAuthorByID(2);
    if (!author) {
        expect(author).not.toBeNull();
        return;
    }
    let reviews = yield author.getReviews();
    if (!reviews) {
        expect(reviews).not.toBeNull();
        return;
    }
    expect(reviews).toBeInstanceOf(Array);
    expect(reviews[0]).toBeInstanceOf(Author_1.Review);
}));
it('check if invalid author returns null', () => __awaiter(void 0, void 0, void 0, function* () {
    let author = yield api.getAuthorByID(200);
    expect(author).toBe(null);
}));
it("Check APIERROR constructor", () => {
    let apiMockError = new APIClient_1.APIError(400);
    expect(apiMockError).toBeInstanceOf(APIClient_1.APIError);
});
