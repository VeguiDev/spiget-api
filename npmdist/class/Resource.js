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
exports.ResourceVersion = exports.ResourceUpdate = exports.ResourceReview = exports.Resource = void 0;
const Resource_1 = require("./api/Resource");
const Author_1 = require("./Author");
const Category_1 = require("./Category");
class Resource {
    constructor(r, author, category) {
        this.id = r.id;
        this.external = r.external;
        this.file = r.file;
        this.likes = r.likes;
        this.links_base64 = r.links;
        this.name = r.name;
        this.version = r.version;
        this.author = author;
        this.category = category;
        this.rating = r.rating;
        this.icon = r.icon;
        this.releaseDate = r.releaseDate;
        this.updateDate = r.updateDate;
        this.downloads = r.downloads;
        this.premium = r.premium;
        this.existenceStatus = r.existenceStatus;
        this.description_base64 = r.description;
        this.versions = r.versions;
        this.updates = r.updates;
        this.reviews = r.reviews;
        this.price = r.price;
        this.testedVersions = r.testedVersions;
        this.contributors = r.contributors;
        this.tag = r.tag;
        this.sourceCodeLink = r.sourceCodeLink;
        this.supportedLanguages = r.supportedLanguages;
    }
    /**
     * Generate download url for this resource
     */
    getDownloadUrl(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Resource_1.ResourceAPI.getResourceDownload(this.id, options);
        });
    }
    /**
     * Get list of reviews of this resource
     */
    getReviews(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let revs = yield Resource_1.ResourceAPI.getResourceReviews(this.id, options);
            if (!revs)
                return null;
            let reviews = [];
            for (let rev of revs) {
                let author = yield Author_1.Author.findByID(rev.author.id);
                if (!author)
                    continue;
                reviews.push(new ResourceReview(rev, this, author));
            }
            return reviews;
        });
    }
    /**
     * Get list of updates of this resource
     */
    getUpdates(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let upts = yield Resource_1.ResourceAPI.getResourceUpdates(this.id, options);
            if (!upts)
                return null;
            let updates = [];
            for (let udt of upts) {
                updates.push(new ResourceUpdate(udt, this));
            }
            return updates;
        });
    }
    /**
     * Get specific update of this resource
     */
    getUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let upt = yield Resource_1.ResourceAPI.getResourceUpdate(this.id, id);
            if (!upt || upt.error == "update not found")
                return null;
            return new ResourceUpdate(upt, this);
        });
    }
    /**
     * Get list of versions of this resource
     */
    getVersions(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let vers = yield Resource_1.ResourceAPI.getResourceVersions(this.id, options);
            if (!vers)
                return null;
            let versions = [];
            for (let ver of vers) {
                versions.push(new ResourceVersion(ver, this));
            }
            return versions;
        });
    }
    /**
     * Get specific version of this resource
     */
    getVersion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ver = yield Resource_1.ResourceAPI.getResourceVersion(this.id, id);
            if (!ver)
                return null;
            return new ResourceVersion(ver, this);
        });
    }
    get description() {
        return Buffer.from(this.description_base64, 'base64').toString('utf-8');
    }
    get links() {
        let l = {};
        for (let lk of Object.keys(this.links_base64)) {
            l[Buffer.from(lk, "base64").toString("utf-8")] = Buffer.from(this.links_base64[lk], "base64").toString("utf-8");
        }
        return l;
    }
    /**
     * Search a resource
     */
    static search(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let resources = yield Resource_1.ResourceAPI.searchResources(options);
            if (!resources)
                return null;
            let resourcex = [];
            for (let resource of resources) {
                let author = yield Author_1.Author.findByID(resource.author.id), category = yield Category_1.Category.findById(resource.category.id);
                if (!author || !category)
                    continue;
                resourcex.push(new Resource(resource, author, category));
            }
            return resourcex;
        });
    }
    /**
     * Find a resource by ID
     */
    static findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let rese = yield Resource_1.ResourceAPI.getResource(id);
            if (!rese || rese.error == "resource not found")
                return null;
            let author = yield Author_1.Author.findByID(rese.author.id), category = yield Category_1.Category.findById(rese.category.id);
            if (!author || !category)
                return null;
            return new Resource(rese, author, category);
        });
    }
    /**
     * Find all resources
     */
    static findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let rses = yield Resource_1.ResourceAPI.getResources(options);
            if (!rses)
                return null;
            let rsesx;
            if (!Array.isArray(rses)) {
                let r = [];
                for (let rx of rses.match) {
                    let reso = yield Resource.findByID(rx.id);
                    if (!reso)
                        continue;
                    r.push(reso);
                }
                return r;
            }
            else {
                rsesx = rses;
            }
            let f = [];
            for (let rese of rsesx) {
                let resource = yield Resource.findByID(rese.id);
                if (!resource)
                    continue;
                f.push(resource);
            }
            return f;
        });
    }
}
exports.Resource = Resource;
class ResourceReview {
    constructor(r, resource, author) {
        this.id = r.id;
        this.resource = resource;
        this.date = r.date;
        this.version = r.version;
        this.message_base64 = r.message;
        this.rating = r.rating;
        this.author = author;
    }
    get message() {
        return Buffer.from(this.message_base64, 'base64').toString('utf-8');
    }
}
exports.ResourceReview = ResourceReview;
class ResourceUpdate {
    constructor(r, resource) {
        this.id = r.id;
        this.resource = resource;
        this.date = r.date;
        this.description_base64 = r.description;
        this.likes = r.likes;
        this.title = r.title;
    }
    get description() {
        return Buffer.from(this.description_base64, 'base64').toString('utf-8');
    }
}
exports.ResourceUpdate = ResourceUpdate;
class ResourceVersion {
    constructor(r, resource) {
        this.id = r.id;
        this.uuid = r.uuid;
        this.downloads = r.downloads;
        this.rating = r.rating;
        this.url = r.url;
        this.name = r.name;
        this.releaseDate = r.releaseDate;
        this.resource = resource;
    }
    getDownloadURL() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Resource_1.ResourceAPI.getResourceDownload(this.resource.id, {
                version: this.id
            });
        });
    }
}
exports.ResourceVersion = ResourceVersion;
