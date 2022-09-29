import { AuthorI } from "../interfaces/Author";
import { CategoryI } from "../interfaces/Category";
import { ResourceI } from "../interfaces/Resource";
import { AuthorSearchFields, RequestConfig, ResourceSearchFields, SearchRequestConfig } from "../interfaces/SpigetAPI";
import { Props } from "../interfaces/SpigetAPI_resources";
import { Author } from "./Author";
import { Category } from "./Category";
import { Resource } from "./Resource";
export declare class SpigetAPI {
    agent_name: string;
    constructor(agent_name: string);
    /**
     * Get author by id
     */
    getAuthorByID(id: number): Promise<Author | null>;
    /**
     * Get list of authors
     */
    getAuthors(options?: RequestConfig<AuthorI>): Promise<Author[] | null>;
    /**
     * Request category from spiget
     * @param id Id of category
     * @returns Category class or null (if fails or not found)
     */
    getCategoryByID(id: number): Promise<Category | null>;
    /**
     * Request categories from spiget
     * @param options Basic Spiget Request Config
     * @returns Array of categories or null if it failts
     */
    getCategories(options?: RequestConfig<CategoryI>): Promise<Category[] | null>;
    /**
     * Request list of resources from spiget
     * @param options Basic Spiget Request Config
     * @returns Array of resources or null if it failts
     */
    getResources(options?: Props): Promise<Resource[] | null>;
    /**
     * Request a resource from spiget.
     * @param id Id of spigot resource. Example 2
     * @returns Resource class or null (if fails or not found)
     */
    getResource(id: number): Promise<Resource | null>;
    /**
     * Search entity on SpigetAPI
     * @param entity Name of the entity you want to search for
     * @param options Search configuration
     */
    search(entity: "author", options: SearchRequestConfig<AuthorI, AuthorSearchFields>): Promise<Author[] | null>;
    search(entity: "resource", options: SearchRequestConfig<ResourceI, ResourceSearchFields>): Promise<Resource[] | null>;
}
