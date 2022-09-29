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
exports.Category = void 0;
const Category_1 = require("./api/Category");
const Author_1 = require("./Author");
const Resource_1 = require("./Resource");
class Category {
    constructor(r) {
        this.id = r.id;
        this.name = r.name;
    }
    getResources(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let rses = yield Category_1.CategoryAPI.getCategoryResources(this.id, options);
            if (!rses)
                return null;
            let resources = [];
            for (let res of rses) {
                let author = yield Author_1.Author.findByID(res.author.id);
                if (!author)
                    continue;
                resources.push(new Resource_1.Resource(res, author, this));
            }
            return resources;
        });
    }
    // Static Methods
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let category = yield Category_1.CategoryAPI.getCategory(id);
            if (!category || category.error == "category not found")
                return null;
            return new Category(category);
        });
    }
    static findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let categories = yield Category_1.CategoryAPI.getCategories(options);
            if (!categories)
                return null;
            let cate = [];
            for (let category of categories) {
                cate.push(new Category(category));
            }
            return cate;
        });
    }
}
exports.Category = Category;
