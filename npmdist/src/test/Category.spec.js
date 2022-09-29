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
const Category_1 = require("../class/Category");
const Resource_1 = require("../class/Resource");
const SpigetAPI_1 = require("../class/SpigetAPI");
const api = new SpigetAPI_1.SpigetAPI("test");
jest.setTimeout(10000);
it("check if getAllCategories works", () => __awaiter(void 0, void 0, void 0, function* () {
    let categories = yield api.getCategories({
        size: 2
    });
    if (!categories) {
        expect(categories).not.toBeNull();
        return;
    }
    expect(categories).toBeInstanceOf(Array);
    expect(categories[0]).toBeInstanceOf(Category_1.Category);
}));
it("check if getCategoryByID works", () => __awaiter(void 0, void 0, void 0, function* () {
    let category = yield api.getCategoryByID(2);
    if (!category) {
        expect(category).not.toBeNull();
        return;
    }
    expect(category).toBeInstanceOf(Category_1.Category);
}));
test("not be null", () => __awaiter(void 0, void 0, void 0, function* () {
    let category = yield api.getCategoryByID(3);
    expect(category).not.toBeNull();
}));
test("testing getResources", () => __awaiter(void 0, void 0, void 0, function* () {
    let category = yield api.getCategoryByID(3);
    if (!category)
        return;
    let resources = yield category.getResources();
    if (!resources) {
        expect(resources).not.toBeNull();
        return;
    }
    expect(resources).toBeInstanceOf(Array);
    expect(resources[0]).toBeInstanceOf(Resource_1.Resource);
}));
test("check if invalid category return null", () => __awaiter(void 0, void 0, void 0, function* () {
    let category = yield api.getCategoryByID(1);
    expect(category).toBeNull();
}));
