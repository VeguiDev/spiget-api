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
exports.CategoryAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const APIClient_1 = require("../APIClient");
const API = APIClient_1.APIClient.getInstance();
class CategoryAPI {
    static getCategories(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = (0, APIClient_1.PrepareParams)(options);
            let res = yield API.req({
                method: 'GET',
                url: 'categories',
                params
            });
            if (axios_1.default.isAxiosError(res))
                return null;
            return res;
        });
    }
    static getCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // let params = options;
            let res = yield API.req({
                method: 'GET',
                url: 'categories/' + id
                // params
            });
            if (axios_1.default.isAxiosError(res))
                return null;
            return res;
        });
    }
    static getCategoryResources(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = (0, APIClient_1.PrepareParams)(options);
            let res = yield API.req({
                method: 'GET',
                url: 'categories/' + id + '/resources',
                params
            });
            if (axios_1.default.isAxiosError(res))
                return null;
            return res;
        });
    }
}
exports.CategoryAPI = CategoryAPI;
