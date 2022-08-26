import { Resource, ResourceI } from "./Resource";
import {APIClient} from "../class/APIClient";
import { RequestConfig } from "../interfaces/SpigetAPI";
import { SpigetAPI } from "./SpigetAPI";
import { Review } from "./Review";

export interface AuthorIcon {
    /**
     * Url to author icon
     */
    url:string;

    /**
     * The base64 encoded author icon
     */
    data:string;

    info:number;

    hash:string;
}

export interface AuthorI {
    id:number;
    name:string;
    icon:AuthorIcon;
    identities:AuthorIdentities;

}

export interface AuthorIdentities {
    iam:string;
    twitter:string;
    facebook:string;
}

export interface AuthorResourceConfig {
    /**
     * Size of array returned. Default 10
     */
    size?:number;

    /**
     * Page number
     */
    page?:number;

    /**
     * Fields to return
     */
    fields?:string[]|(keyof ResourceI)[];
}

export class Author {

    name:string;
    icon:AuthorIcon;
    id:number;
    identities:AuthorIdentities;
    
    constructor(authorRaw:AuthorI) {

        this.id = authorRaw.id;
        this.icon = authorRaw.icon;
        this.name = authorRaw.name;

        this.identities = authorRaw.identities;

    }

    async getResources(config?:AuthorResourceConfig):Promise<Resource[]|null> {

        let defaultConfig:any = {
            size:10
        };

        if(config) {

            if(config.size) {
                defaultConfig.size = config.size;
            }

            if(config.fields) {
                defaultConfig.fields = config.fields.join(",");
            }

            if(config.page) {
                defaultConfig.page = config.page;
            }

        }

        let res = await APIClient.req({
            method: 'GET',
            url: "authors/"+this.id+"/resources",
            params: defaultConfig
        });

        if(!Array.isArray(res)) return null;

        return Resource.fromRaw(res, this);
        
    }

    async getReviews(config?:RequestConfig<AuthorI>) {

        let spiget = new SpigetAPI();

        let defaultConfig:any = {
            size:10
        };

        if(config) {

            if(config.size) {
                defaultConfig.size = config.size;
            }

            if(config.fields) {
                defaultConfig.fields = config.fields.join(",");
            }

            if(config.page) {
                defaultConfig.page = config.page;
            }

        }

        let res = await APIClient.req({
            method: 'GET',
            url: "authors/"+this.id+"/reviews",
            params: defaultConfig
        });

        if(!Array.isArray(res)) return null;

        let reviews = [];

        for(let rev of res) {

            rev.author = await spiget.getAuthor(rev.author.id);

            reviews.push(rev);

        }

        return Review.fromRaw(reviews);

    }

    static fromRaw(raw:AuthorI):Author
    static fromRaw(raw:AuthorI[]):Author[]
    static fromRaw(raw:AuthorI|AuthorI[]):Author|Author[] {

        if(Array.isArray(raw)) {

            let authors:Author[] = [];

            for(let aRaw of raw) {
                authors.push(new Author(aRaw));
            }

            return authors;

        }

        return new Author(raw);

    }

}