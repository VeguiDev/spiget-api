
import axios from "axios";
import { AuthorI } from "../../interfaces/Author";
import { ResourceI } from "../../interfaces/Resource";
import { ReviewI } from "../../interfaces/Review";
import { RequestConfig } from "../../interfaces/SpigetAPI";
import { APIClient, PrepareParams } from "../APIClient";

const API = new APIClient();

export class AuthorsAPI {

    /**
     * Request list of Authors
     */
    static async getAuthors(options?:RequestConfig<AuthorI>):Promise<AuthorI|null> {

        let params = PrepareParams(options);

        let res = await API.req({
            method: 'GET',
            url: 'authors',
            params
        });

        if(axios.isAxiosError(res)) return null;

        return res;

    }
    
    static async getAuthor(id:number):Promise<AuthorI|null> {


        let res = await API.req({
            method: 'GET',
            url: 'authors/'+id
        });

        if(axios.isAxiosError(res)) return null;

        return res;

    }

    static async getAuthorResources(id:number, options?:RequestConfig<ResourceI>):Promise<ResourceI[]|null> {

        let params = PrepareParams(options);

        let res = await API.req({
            method: 'GET',
            url: 'authors/'+id+'/resources',
            params
        });

        if(axios.isAxiosError(res)) return null;

        return res;

    }

    static async getAuthorReviews(id:number, options?:RequestConfig<ReviewI>):Promise<ReviewI[]|null> {

        let params = PrepareParams(options);

        let res = await API.req({
            method: 'GET',
            url: 'authors/'+id+'/reviews',
            params
        });

        if(axios.isAxiosError(res)) return null;

        return res;

    }

}