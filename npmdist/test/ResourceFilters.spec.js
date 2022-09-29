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
let api = new SpigetAPI_1.SpigetAPI("test");
jest.setTimeout(10000);
it('check if Get Resources New works', () => __awaiter(void 0, void 0, void 0, function* () {
    let resources = yield api.getResources({
        filter: 'new',
        size: 2
    });
    if (!resources) {
        expect(resources).not.toBeNull();
        return;
    }
    expect(resources).toBeInstanceOf(Array);
    expect(resources[0]).toBeInstanceOf(Resource_1.Resource);
}));
it('check if Get Resources Free works', () => __awaiter(void 0, void 0, void 0, function* () {
    let resources = yield api.getResources({
        filter: 'free',
        size: 2
    });
    if (!resources) {
        expect(resources).not.toBeNull();
        return;
    }
    expect(resources).toBeInstanceOf(Array);
    expect(resources[0]).toBeInstanceOf(Resource_1.Resource);
}));
it('check if Get Resources Premium works', () => __awaiter(void 0, void 0, void 0, function* () {
    let resources = yield api.getResources({
        filter: 'premium',
        size: 2
    });
    if (!resources) {
        expect(resources).not.toBeNull();
        return;
    }
    expect(resources).toBeInstanceOf(Array);
    expect(resources[0]).toBeInstanceOf(Resource_1.Resource);
}));
