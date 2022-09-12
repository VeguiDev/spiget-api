import { AuthorI } from "../interfaces/Author";
import { CategoryI } from "../interfaces/Category";
import { ResourceI } from "../interfaces/Resource";
import { AuthorSearchFields, RequestConfig, ResourceSearchFields, SearchRequestConfig } from "../interfaces/SpigetAPI";
import { Props } from "../interfaces/SpigetAPI_resources";
import { Author } from "./Author";
import { Category } from "./Category";
import { Resource } from "./Resource";


export class SpigetAPI {

    agent_name:string;

    constructor(agent_name:string) {

        this.agent_name = agent_name;
        process.env.SPIGETAPI_AGENT_NAME = agent_name;

    }

    async getAuthorByID(id:number) {

        return await Author.findByID(id);

    }

    async getAuthors(options?:RequestConfig<AuthorI>) {

        return await Author.findAll(options);

    }

    /**
     * Request category from spiget
     * @param id Id of category
     * @returns Category class or null (if fails or not found)
     */
    async getCategoryByID(id:number) {

        return await Category.findById(id);

    }

    /**
     * Request categories from spiget
     * @param options Basic Spiget Request Config
     * @returns Array of categories or null if it failts
     */
    async getCategories(options?:RequestConfig<CategoryI>) {

        return await Category.findAll(options);

    }

    /**
     * Request list of resources from spiget
     * @param options Basic Spiget Request Config
     * @returns Array of resources or null if it failts
     */
    async getResources(options?:Props) {
        return await Resource.findAll(options);
    }

    /**
     * Request a resource from spiget.
     * @param id Id of spigot resource. Example 2
     * @returns Resource class or null (if fails or not found)
     */
    async getResource(id:number) {
        return await Resource.findByID(id);
    }

    /**
     * Search entity on SpigetAPI
     * @param entity Name of the entity you want to search for
     * @param options Search configuration
     */
    async search(entity:"author", options:SearchRequestConfig<AuthorI, AuthorSearchFields>):Promise<Author[]|null>
    async search(entity:"resource", options:SearchRequestConfig<ResourceI, ResourceSearchFields>):Promise<Resource[]|null>
    async search(entity:("author"|"resource"), options:SearchRequestConfig<AuthorI|ResourceI, AuthorSearchFields|ResourceSearchFields>):Promise<Author[]|Resource[]|null> {

        if(entity == "author") {
            return await Author.search(options);
        } else if(entity == "resource") {
            return await Resource.search(options);
        } else {
            return null;
        }

    }

}