import { AuthorI } from "../../interfaces/Author";
import { ResourceI } from "../../interfaces/Resource";
import { ReviewI } from "../../interfaces/Review";
import { AuthorSearchFields, RequestConfig, SearchRequestConfig } from "../../interfaces/SpigetAPI";
export declare class AuthorsAPI {
    /**
     * Request list of Authors
     */
    static getAuthors(options?: RequestConfig<AuthorI>): Promise<AuthorI[] | null>;
    static searchAuthors(options: SearchRequestConfig<AuthorI, AuthorSearchFields>): Promise<any>;
    static getAuthor(id: number): Promise<AuthorI | null>;
    static getAuthorResources(id: number, options?: RequestConfig<ResourceI>): Promise<ResourceI[] | null>;
    static getAuthorReviews(id: number, options?: RequestConfig<ReviewI>): Promise<ReviewI[] | null>;
}
