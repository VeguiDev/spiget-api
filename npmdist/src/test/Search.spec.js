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
const Author_1 = require("../class/Author");
const Resource_1 = require("../class/Resource");
const SpigetAPI_1 = require("../class/SpigetAPI");
const API = new SpigetAPI_1.SpigetAPI("test");
jest.setTimeout(10000);
describe("Search testing", () => {
    it(" testing if authors search works", () => __awaiter(void 0, void 0, void 0, function* () {
        let authors = yield Author_1.Author.search({
            query: 'luck',
            field: 'name'
        });
        if (!authors) {
            expect(authors).not.toBeNull();
            return;
        }
        expect(authors).toBeInstanceOf(Array);
        expect(authors[0]).toBeInstanceOf(Author_1.Author);
    }));
    it(" testing if resource search works", () => __awaiter(void 0, void 0, void 0, function* () {
        let resources = yield Resource_1.Resource.search({
            query: 'luck',
            field: 'name'
        });
        if (!resources) {
            expect(resources).not.toBeNull();
            return;
        }
        expect(resources).toBeInstanceOf(Array);
        expect(resources[0]).toBeInstanceOf(Resource_1.Resource);
    }));
    it(" testing if resource search works using API.search", () => __awaiter(void 0, void 0, void 0, function* () {
        let resources = yield API.search('resource', {
            field: "name",
            query: "luck"
        });
        if (!resources) {
            expect(resources).not.toBeNull();
            return;
        }
        expect(resources).toBeInstanceOf(Array);
        expect(resources[0]).toBeInstanceOf(Resource_1.Resource);
    }));
    it(" testing if author search works using API.search", () => __awaiter(void 0, void 0, void 0, function* () {
        let authors = yield API.search('author', {
            field: "name",
            query: "luck"
        });
        if (!authors) {
            expect(authors).not.toBeNull();
            return;
        }
        expect(authors).toBeInstanceOf(Array);
        expect(authors[0]).toBeInstanceOf(Author_1.Author);
    }));
});
