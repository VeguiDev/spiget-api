import axios from "axios";
import { AuthorI } from "../interfaces/Author";
import { ResourceI } from "../interfaces/Resource";
import { ReviewI } from "../interfaces/Review";
import { IconI, RatingI, RequestConfig } from "../interfaces/SpigetAPI";
import { AuthorsAPI } from "./api/Author";
import { ResourceAPI } from "./api/Resource";
import { APIClient } from "./APIClient";

const API = new APIClient();

export class Author {

    id:number;
    name:string;
    icon:IconI;

    constructor(r:AuthorI) {

        this.id = r.id;
        this.name = r.name;
        this.icon = r.icon;

    }
    /**
     * Get Resources of this author.
     */
    async getResources(options?:RequestConfig<ResourceI>) {

        return await AuthorsAPI.getAuthorResources(this.id, options);

    }

    async getReviews(options?:RequestConfig<ReviewI>) {

        let reviews = await AuthorsAPI.getAuthorReviews(this.id, options);

        if(!reviews) return null;

        let rs = [];

        for(let rev of reviews) {
            
            let review;

            if(rev.resource) {
                let resource = await ResourceAPI.getResource(rev.resource);

                if(!resource) break;

                review = new Review(rev, this, resource);

            } else {

                review = new Review(rev, this);

            }

            
            
            
            rs.push(review);

        }

        return rs;
    }

    static async findByID(id:number) {

        let authorRaw = await AuthorsAPI.getAuthor(id);

        if(!authorRaw) return null;

        return new Author(authorRaw);

    }

    static async findAll(options?:RequestConfig<AuthorI>) {

        let authorsRaw = await AuthorsAPI.getAuthors(options);

        if(!authorsRaw) return null;

        let authors = [];

        for(let author of authorsRaw) {
            authors.push(new Author(author));
        }

        return authors;

    }

}

export class Review {

    author:Author;

    rating:RatingI;

    
    private message_base64:string;

    version:string;

    date:number;

    resource?:ResourceI;

    id:number;

    constructor(r:ReviewI, author:Author, resource?:ResourceI) {

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