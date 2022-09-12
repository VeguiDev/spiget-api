import axios from "axios";
import { ResourceFileI, ResourceI, ResourceLinksI, ResourceRatingI, ResourceVersionSortI, ResourceVersionI, ResourceUpdateI } from "../interfaces/Resource";
import { ReviewI } from "../interfaces/Review";
import { IconI, RatingI, RequestConfig, ResourceSearchFields, SearchRequestConfig } from "../interfaces/SpigetAPI";
import { Props } from "../interfaces/SpigetAPI_resources";
import { ResourceAPI } from "./api/Resource";
import { PrepareParams } from "./APIClient";
import { Author, Review } from "./Author";
import { Category } from "./Category";


export class Resource {

    id: number;
    external: boolean;
    file: ResourceFileI;
    likes: number;
    name: string;
    version: ResourceVersionSortI;
    author: Author;
    category: Category;
    rating: ResourceRatingI;
    icon: IconI;
    releaseDate: number;
    updateDate: number;
    downloads: number;
    premium: boolean;
    existenceStatus: number;
    versions: ResourceVersionSortI[];
    updates: {
        id: number;
    };
    reviews: {
        id: number;
    };
    price: number;

    private description_base64: string;
    private links_base64: ResourceLinksI;

    testedVersions?: ResourceVersionSortI[];
    contributors?: string;
    tag?: string;
    sourceCodeLink?: string;
    supportedLanguages?: string;
    
    constructor(r:ResourceI, author:Author, category:Category) {

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
    
    async getDownloadUrl(options?:{
        version?:number|'latest'
    }) {
        return await ResourceAPI.getResourceDownload(this.id, options);
    }

    async getReviews(options?:RequestConfig<ReviewI>) {

        let revs = await ResourceAPI.getResourceReviews(this.id, options);

        if(!revs) return null;

        let reviews = [];

        for(let rev of revs) {

            let author = await Author.findByID(rev.author.id);

            if(!author) continue;

            reviews.push(new ResourceReview(rev, this, author));

        }

        return reviews;

    }

    async getUpdates(options?:RequestConfig<ResourceUpdateI>) {

        let upts = await ResourceAPI.getResourceUpdates(this.id, options);

        if(!upts) return null;

        let updates = [];

        for(let udt of upts) {

            updates.push(new ResourceUpdate(udt, this));

        }

        return updates;

    }

    async getUpdate(id:number|"latest") {

        let upt = await ResourceAPI.getResourceUpdate(this.id, id);

        if(!upt || (upt as any).error == "update not found") return null;

        return new ResourceUpdate(upt, this);

    }

    async getVersions(options?:RequestConfig<ResourceVersionSortI>) {
        let vers = await ResourceAPI.getResourceVersions(this.id, options);

        if(!vers) return null;

        let versions = [];

        for(let ver of vers) {

            versions.push(new ResourceVersion(ver, this));

        }

        return versions;

    }

    async getVersion(id:number|"latest") {

        let ver = await ResourceAPI.getResourceVersion(this.id, id);

        if(!ver) return null;

        return new ResourceVersion(ver, this);

    }

    get description() {
        return Buffer.from(this.description_base64, 'base64').toString('utf-8');
    }

    get links() {
        let l:any = {};

        for(let lk of Object.keys(this.links_base64)) {
            l[Buffer.from(lk,"base64").toString("utf-8")] = Buffer.from(this.links_base64[lk],"base64").toString("utf-8");
        }

        return l;
    }

    static async search(options:SearchRequestConfig<ResourceI, ResourceSearchFields>) {

        let resources = await ResourceAPI.searchResources(options);

        if(!resources) return null;
        
        let resourcex = [];

        for(let resource of resources) {

            let author = await Author.findByID(resource.author.id),
                category = await Category.findById(resource.category.id)
            
            if(!author || !category) continue;

            resourcex.push(new Resource(resource, author, category));
        }

        return resourcex;
    }

    static async findByID(id:number) {

        let rese = await ResourceAPI.getResource(id);

        if(!rese || rese.error == "resource not found") return null;

        let author = await Author.findByID(rese.author.id),
            category = await Category.findById(rese.category.id)

        if(!author || !category) return null;

        return new Resource(rese, author, category);

    }

    static async findAll(options?:Props) {

        let rses = await ResourceAPI.getResources(options);

        if(!rses) return null;

        let rsesx;

        if(!Array.isArray(rses)) {
            let r:Resource[] = [];

            for(let rx of rses.match) {
                let reso = await Resource.findByID(rx.id);
                if(!reso) continue;

                r.push(reso);
            }

            return r;
        } else {
            rsesx = rses;
        }
        

        let f:Resource[] = [];

        for(let rese of rsesx) {

            let resource = await Resource.findByID(rese.id);

            if(!resource) continue;
            f.push(resource);

        }

        return f;

    }

}


export class ResourceReview {

    author:Author;

    rating:RatingI;

    /**
     * Base64 Encoded String
     */
    private message_base64:string;

    version:string;

    date:number;

    resource:Resource;

    id:number;

    constructor(r:ReviewI, resource:Resource, author:Author) {

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

export class ResourceUpdate {
    date:number;

    likes:number;

    private description_base64:string;

    title:string;

    resource:Resource;

    id:number;

    constructor(r:ResourceUpdateI, resource:Resource) {

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

export class ResourceVersion {

    id: number;
    uuid: string;
    downloads: number;
    rating: RatingI;
    url: string;
    name: string;
    releaseDate: number;
    resource: Resource;

    constructor(r:ResourceVersionI, resource:Resource) {

        this.id = r.id;
        this.uuid = r.uuid;
        this.downloads = r.downloads;
        this.rating = r.rating;
        this.url = r.url;
        this.name = r.name;
        this.releaseDate = r.releaseDate;
        this.resource = resource;

    }

    async getDownloadURL() {
        return await ResourceAPI.getResourceDownload(this.resource.id, {
            version: this.id
        });
    }

}