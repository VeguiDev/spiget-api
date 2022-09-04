
import axios from "axios";
import { AuthorI } from "../interfaces/Author";
import { CategoryI } from "../interfaces/Category";
import { ResourceI } from "../interfaces/Resource";
import { ReviewI } from "../interfaces/Review";
import { RequestConfig } from "../interfaces/SpigetAPI";
import { APIClient, PrepareParams } from "./APIClient";

const API = new APIClient();

export class CategoryAPI {

    static async getCategories(options?:RequestConfig<CategoryI>):Promise<CategoryI[]|null> {
        let params = PrepareParams(options);

        let res = await API.req({
            method: 'GET',
            url: 'categories',
            params
        });

        if(axios.isAxiosError(res)) return null;

        return res;

    }

    static async getCategory(id:number):Promise<CategoryI|null> {
        // let params = options;

        let res = await API.req({
            method: 'GET',
            url: 'categories/'+id
            // params
        });

        if(axios.isAxiosError(res)) return null;

        return res;

    }

    static async getCategoryResources(id:number, options?:RequestConfig<ResourceI>):Promise<ResourceI[]|null> {
        let params = PrepareParams(options);

        let res = await API.req({
            method: 'GET',
            url: 'categories/'+id+'/resources',
            params
        });

        if(axios.isAxiosError(res)) return null;

        return res;

    }

}