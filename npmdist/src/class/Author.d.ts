import { AuthorI } from "../interfaces/Author";
import { ResourceI } from "../interfaces/Resource";
import { ReviewI } from "../interfaces/Review";
import { AuthorSearchFields, IconI, RatingI, RequestConfig, SearchRequestConfig } from "../interfaces/SpigetAPI";
import { Resource } from "./Resource";
export declare class Author {
    id: number;
    name: string;
    icon: IconI;
    constructor(r: AuthorI);
    /**
     * Get Resources of this author.
     */
    getResources(options?: RequestConfig<ResourceI>): Promise<Resource[] | null>;
    /**
     * Get Reviews of this author.
     */
    getReviews(options?: RequestConfig<ReviewI>): Promise<Review[] | null>;
    static findByID(id: number): Promise<Author | null>;
    static findAll(options?: RequestConfig<AuthorI>): Promise<Author[] | null>;
    static search(options: SearchRequestConfig<AuthorI, AuthorSearchFields>): Promise<Author[] | null>;
}
export declare class Review {
    author: Author;
    rating: RatingI;
    private message_base64;
    version: string;
    date: number;
    resource?: Resource;
    id: number;
    constructor(r: ReviewI, author: Author, resource?: Resource);
    get message(): string;
}
