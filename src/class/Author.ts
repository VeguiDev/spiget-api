import { ResourceI } from "./Resource";
import {APIClient} from "../class/APIClient";

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

    async getResources(config?:AuthorResourceConfig) {

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
            url: "authors/"+this.id+"/resources"
        });

        
        
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