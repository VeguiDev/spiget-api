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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const APIClient_1 = require("../APIClient");
const API = APIClient_1.APIClient.getInstance();
class ResourceAPI {
    /**
     * Request List of all resources. (Free and premium)
     */
    static getResources(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = "resources";
            if (options && options.filter) {
                switch (options.filter) {
                    case "free":
                        url += "/free";
                        break;
                    case "new":
                        url += "/new";
                        break;
                    case "premium":
                        url += "/premium";
                        break;
                }
            }
            else if (options && !options.filter && options.version) {
                url += "/for/" + options.version.join(",");
            }
            let params = (0, APIClient_1.PrepareParams)(options);
            let res = yield API.req({
                method: "GET",
                url,
                params
            });
            if (axios_1.default.isAxiosError(res))
                return null;
            return res;
        });
    }
    static getResource(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // let params = options;
            let res = yield API.req({
                method: "GET",
                url: "resources/" + id
                // params
            });
            if (axios_1.default.isAxiosError(res))
                return null;
            return res;
        });
    }
    static getResourceReviews(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = (0, APIClient_1.PrepareParams)(options);
            let res = yield API.req({
                method: "GET",
                url: "resources/" + id + "/reviews",
                params
            });
            if (axios_1.default.isAxiosError(res))
                return null;
            return res;
        });
    }
    static getResourceUpdates(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = (0, APIClient_1.PrepareParams)(options);
            let res = yield API.req({
                method: "GET",
                url: "resources/" + id + "/updates",
                params
            });
            if (axios_1.default.isAxiosError(res))
                return null;
            return res;
        });
    }
    static getResourceUpdate(id, update_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // let params = PrepareParams(options);
            if (Number(update_id) == NaN && update_id != "latest")
                return null;
            let res = yield API.req({
                method: "GET",
                url: "resources/" + id + "/updates/" + update_id
                // params
            });
            if (axios_1.default.isAxiosError(res))
                return null;
            return res;
        });
    }
    static getResourceVersions(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = (0, APIClient_1.PrepareParams)(options);
            let res = yield API.req({
                method: "GET",
                url: "resources/" + id + "/versions",
                params
            });
            if (axios_1.default.isAxiosError(res))
                return null;
            return res;
        });
    }
    static getResourceVersion(id, version_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // let params = PrepareParams(options);
            let res = yield API.req({
                method: "GET",
                url: "resources/" + id + "/versions/" + version_id
                // params
            });
            if (axios_1.default.isAxiosError(res))
                return null;
            return res;
        });
    }
    static getResourceDownload(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // let params = options;
            let resource = yield this.getResource(id);
            if (!resource)
                return null;
            let reqUrl = 'resources/' + id + '/download';
            if (options) {
                if (options.version) {
                    if (!resource.external) {
                        let rUrl = "https://www.spigotmc.org/resources/" + resource.name + "." + resource.id + "/download?version=" + (options === null || options === void 0 ? void 0 : options.version);
                        let verID = resource.version.id;
                        if (options && options.version && options.version != "latest") {
                            verID = options.version;
                        }
                        let version = yield this.getResourceVersion(resource.id, verID);
                        let name = resource.name + "-" + verID + ".jar";
                        if (version) {
                            name = resource.name + "-" + version.name + ".jar";
                        }
                        ;
                        return {
                            url: rUrl,
                            name
                        };
                    }
                    reqUrl = "resources/" + id + "/versions/" + options.version + "/download";
                }
            }
            let res = yield API.req({
                method: "GET",
                url: reqUrl,
                completeResponse: true
            });
            if (axios_1.default.isAxiosError(res))
                return null;
            if (res == "500_error")
                return null;
            let url = new URL(res.request.res.responseUrl);
            if (url.host == "cdn.spiget.org") {
                let rUrl = url.toString();
                let verID = resource.version.id;
                if (options && options.version && options.version != 'latest') {
                    verID = options.version;
                }
                let version = yield this.getResourceVersion(resource.id, verID);
                let name = resource.name + "-" + verID + ".jar";
                if (version) {
                    name = resource.name + "-" + version.name + ".jar";
                }
                ;
                return {
                    url: rUrl,
                    name
                };
            }
            ;
            if (url.host == "github.com") {
                let githubDownload = yield APIClient_1.APIClient.GETGITHUBRELEASE(url.toString());
                return githubDownload;
            }
            return null;
        });
    }
    static searchResources(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = (0, APIClient_1.PrepareParams)(options);
            let res = yield API.req({
                method: "GET",
                url: "/search/resources/" + options.query,
                params
            });
            if (axios_1.default.isAxiosError(res))
                return null;
            return res;
        });
    }
}
exports.ResourceAPI = ResourceAPI;
