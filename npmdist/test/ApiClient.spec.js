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
let api = APIClient_1.APIClient.getInstance();
jest.setTimeout(10000);
it('api must be APIClient', () => {
    expect(api).toBeInstanceOf(APIClient_1.APIClient);
});
it('check request works', () => __awaiter(void 0, void 0, void 0, function* () {
    let status = yield api.req({
        method: 'GET',
        url: 'status'
    });
    expect(status).toBeInstanceOf(Object);
}));
it('check if params preparer works', () => __awaiter(void 0, void 0, void 0, function* () {
    let parsed = (0, APIClient_1.PrepareParams)({
        fields: ["a", "b", "c"],
        sort: {
            must: 'most',
            field: 'downloads'
        }
    });
    expect(parsed.fields).toBe("a,b,c");
    expect(parsed.sort).toBe("-downloads");
}));
it('check if catch of req works', () => __awaiter(void 0, void 0, void 0, function* () {
    let re = yield api.req({
        baseURL: 'https://spigot.org',
        timeout: 1000
    });
    expect(re).toBe("500_error");
}));
it('check if completeResponse works', () => __awaiter(void 0, void 0, void 0, function* () {
    let re = yield api.req({
        timeout: 1000,
        url: 'status',
        completeResponse: true
    });
    expect(re.data).toBeInstanceOf(Object);
}));
it('check if GITHUB RELEASE DOWNLOAD works', () => __awaiter(void 0, void 0, void 0, function* () {
    let githubUrl = yield APIClient_1.APIClient.GETGITHUBRELEASE("https://github.com/SkinsRestorer/SkinsRestorerX/releases/tag/14.2.3");
    if (!githubUrl) {
        expect(githubUrl).not.toBeNull();
        return;
    }
    expect(githubUrl).toBeInstanceOf(Object);
    expect(typeof githubUrl.url == 'string').toBe(true);
    expect(typeof githubUrl.name == 'string').toBe(true);
    githubUrl = yield APIClient_1.APIClient.GETGITHUBRELEASE("https://github.com/SkinsRestorer/SkinsRestorerX/releases");
    if (!githubUrl) {
        expect(githubUrl).not.toBeNull();
        return;
    }
    expect(githubUrl).toBeInstanceOf(Object);
    expect(typeof githubUrl.url == 'string').toBe(true);
    expect(typeof githubUrl.name == 'string').toBe(true);
}));
it('check if GITHUB RELEASE DOWNLOAD ERROR works', () => __awaiter(void 0, void 0, void 0, function* () {
    let githubUrl = yield APIClient_1.APIClient.GETGITHUBRELEASE("https://github.com/SkinsRestorer/SkinsRestorerX/releases/asdasdasd/14.2.3");
    expect(githubUrl).not.toBeNull();
}));
