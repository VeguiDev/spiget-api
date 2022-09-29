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
exports.PrepareParams = exports.APIClient = exports.APIError = void 0;
const axios_1 = __importDefault(require("axios"));
const Utils_1 = require("../util/Utils");
class APIError {
    constructor(code) {
        this.code = code;
    }
}
exports.APIError = APIError;
class APIClient {
    constructor(agent_name) {
        this.agentName = agent_name;
        this.cl = axios_1.default.create({
            baseURL: 'https://api.spiget.org/v2',
            validateStatus: (statusN) => statusN < 500,
            headers: {
                'User-Agent': this.agentName
            }
        });
    }
    static GETGITHUBRELEASE(urlx) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = axios_1.default.create({
                headers: {
                    "Accept": "application/vnd.github+json",
                    "User-Agent": process.env.SPIGETAPI_AGENT_NAME || "development-agent"
                },
                baseURL: "https://api.github.com"
            });
            let url = new URL(urlx);
            let path = url.pathname.split("/");
            let author = path[1], repository = path[2], pathIn = path[3], mustBeTag = path[4], tag = path[5];
            try {
                if (mustBeTag && tag) {
                    let res = yield client.request({
                        url: "repos/" + author + "/" + repository + "/releases/tags/" + tag,
                        method: 'GET'
                    });
                    let assets = [];
                    for (let asset of res.data.assets) {
                        assets.push({
                            name: asset.name,
                            url: asset.browser_download_url
                        });
                    }
                    return assets[0];
                }
                else {
                    let res = yield client.request({
                        url: "repos/" + author + "/" + repository + "/releases/latest",
                        method: 'GET'
                    });
                    let assets = [];
                    for (let asset of res.data.assets) {
                        assets.push({
                            name: asset.name,
                            url: asset.browser_download_url
                        });
                    }
                    return assets[0];
                }
            }
            catch (e) {
                console.error(e);
                return null;
            }
            return null;
        });
    }
    req(config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield this.cl.request(config);
                if (config.completeResponse)
                    return res;
                return res.data;
            }
            catch (e) {
                return "500_error";
            }
        });
    }
    static getInstance(agent) {
        if (!this.instance) {
            let aname = (0, Utils_1.makeRandomString)(20);
            if (agent) {
                aname = agent;
            }
            this.instance = new this(aname);
        }
        return this.instance;
    }
}
exports.APIClient = APIClient;
function PrepareParams(params) {
    let op = params;
    if (op) {
        for (let key of Object.keys(op)) {
            if (Array.isArray(op[key])) {
                op[key] = op[key].join(",");
            }
        }
        if (op.sort) {
            if (op.sort.must && op.sort.field) {
                let sortMode = true;
                if (op.sort.must == "most") {
                    sortMode = false;
                }
                op.sort = (sortMode ? '+' : '-') + op.sort.field;
            }
        }
    }
    return op;
}
exports.PrepareParams = PrepareParams;
