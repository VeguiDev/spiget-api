import { AuthorI } from "../interfaces/Author";
import { CategoryI } from "../interfaces/Category";
import { RequestConfig } from "../interfaces/SpigetAPI";
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

    async getCategoryByID(id:number) {

        return await Category.findById(id);

    }

    async getCategories(options?:RequestConfig<CategoryI>) {

        return await Category.findAll(options);

    }

    async getResources(options?:Props) {
        return await Resource.findAll(options);
    }

    async getResource(id:number) {
        return await Resource.findByID(id);
    }

}