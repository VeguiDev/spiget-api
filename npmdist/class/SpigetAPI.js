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
exports.SpigetAPI = void 0;
const APIClient_1 = require("./APIClient");
const Author_1 = require("./Author");
const Category_1 = require("./Category");
const Resource_1 = require("./Resource");
class SpigetAPI {
    constructor(agent_name) {
        this.agent_name = agent_name;
        APIClient_1.APIClient.getInstance(agent_name);
    }
    /**
     * Get author by id
     */
    getAuthorByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Author_1.Author.findByID(id);
        });
    }
    /**
     * Get list of authors
     */
    getAuthors(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Author_1.Author.findAll(options);
        });
    }
    /**
     * Request category from spiget
     * @param id Id of category
     * @returns Category class or null (if fails or not found)
     */
    getCategoryByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category_1.Category.findById(id);
        });
    }
    /**
     * Request categories from spiget
     * @param options Basic Spiget Request Config
     * @returns Array of categories or null if it failts
     */
    getCategories(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category_1.Category.findAll(options);
        });
    }
    /**
     * Request list of resources from spiget
     * @param options Basic Spiget Request Config
     * @returns Array of resources or null if it failts
     */
    getResources(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Resource_1.Resource.findAll(options);
        });
    }
    /**
     * Request a resource from spiget.
     * @param id Id of spigot resource. Example 2
     * @returns Resource class or null (if fails or not found)
     */
    getResource(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Resource_1.Resource.findByID(id);
        });
    }
    search(entity, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entity == "author") {
                return yield Author_1.Author.search(options);
            }
            else if (entity == "resource") {
                return yield Resource_1.Resource.search(options);
            }
            else {
                return null;
            }
        });
    }
}
exports.SpigetAPI = SpigetAPI;
