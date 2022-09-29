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
exports.Review = exports.Author = void 0;
const Author_1 = require("./api/Author");
const APIClient_1 = require("./APIClient");
const Category_1 = require("./Category");
const Resource_1 = require("./Resource");
const API = APIClient_1.APIClient.getInstance();
class Author {
    constructor(r) {
        this.id = r.id;
        this.name = r.name;
        this.icon = r.icon;
    }
    /**
     * Get Resources of this author.
     */
    getResources(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let rR = yield Author_1.AuthorsAPI.getAuthorResources(this.id, options);
            if (!rR)
                return null;
            let resources = [];
            for (let res of rR) {
                let category = yield Category_1.Category.findById(res.category.id);
                if (!category)
                    continue;
                resources.push(new Resource_1.Resource(res, this, category));
            }
            return resources;
        });
    }
    /**
     * Get Reviews of this author.
     */
    getReviews(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let reviews = yield Author_1.AuthorsAPI.getAuthorReviews(this.id, options);
            if (!reviews)
                return null;
            let rs = [];
            for (let rev of reviews) {
                let review;
                if (rev.resource) {
                    let resource = yield Resource_1.Resource.findByID(rev.resource);
                    if (!resource)
                        continue;
                    review = new Review(rev, this, resource);
                }
                else {
                    review = new Review(rev, this);
                }
                rs.push(review);
            }
            return rs;
        });
    }
    static findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let authorRaw = yield Author_1.AuthorsAPI.getAuthor(id);
            if (!authorRaw || authorRaw.error == "author not found")
                return null;
            return new Author(authorRaw);
        });
    }
    static findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let authorsRaw = yield Author_1.AuthorsAPI.getAuthors(options);
            if (!authorsRaw)
                return null;
            let authors = [];
            for (let author of authorsRaw) {
                authors.push(new Author(author));
            }
            return authors;
        });
    }
    static search(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let searchRaw = yield Author_1.AuthorsAPI.searchAuthors(options);
            if (!searchRaw)
                return null;
            let authors = [];
            for (let author of searchRaw) {
                authors.push(new Author(author));
            }
            return authors;
        });
    }
}
exports.Author = Author;
class Review {
    constructor(r, author, resource) {
        this.id = r.id;
        this.message_base64 = r.message;
        this.date = r.date;
        this.resource = resource;
        this.author = author;
        this.version = r.version;
        this.rating = r.rating;
    }
    get message() {
        return Buffer.from(this.message_base64, 'base64').toString('utf-8');
    }
}
exports.Review = Review;
