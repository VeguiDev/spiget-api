import { RequestConfig } from "../interfaces/SpigetAPI";
import { AuthorsRequestOptions } from "../interfaces/SpigetAPI_authors";
import { APIClient } from "./APIClient";
import { Author } from "./Author";
import { Category, CategoryI } from "./Category";
import { Resource, ResourceI } from "./Resource";

export class SpigetAPI {

    async getAuthors(options?: AuthorsRequestOptions) {
        let defaultParams: any = {
            size: 10
        }

        if (options) {

            if (options.size) {
                defaultParams.size = options.size;
            }

            if (options.page) {
                defaultParams.page = options.page;
            }

            if (options.fields) {

                defaultParams.fields = options.fields.join(",");

            }

        }

        let authors = await APIClient.req({
            method: 'GET',
            url: 'authors',
            params: defaultParams
        });

        if (authors) {

            return authors;

        } else {
            return null;
        }

    }

    async getCategories(options?:RequestConfig<CategoryI>) {
    
        let defaultParams: any = {
            size: 10
        }

        if (options) {

            if (options.size) {
                defaultParams.size = options.size;
            }

            if (options.page) {
                defaultParams.page = options.page;
            }

            if (options.fields) {

                defaultParams.fields = options.fields.join(",");

            }

        }

        let res = await APIClient.req({
            method: 'GET',
            params: defaultParams,
            url: 'categories'
        });

        return Category.fromRaw(res);

    }

    async getCategory(id:number) {

        let nid = Number(id);

        if(nid == NaN) {
            throw new Error("Id must be number");
            return null;
        }

        let res = await APIClient.req({
            method:'GET',
            url: 'categories/'+nid
        });

        return Category.fromRaw(res);

    }

    async getAuthor(id: number) {
        let nid = Number(id);

        if (nid == NaN) {
            throw new Error("Author id must be a number.")
        } else {
            let re = await APIClient.req({
                method: 'GET',
                url: "authors/" + id
            });

            if (re) {
                return Author.fromRaw(re);
            } else {
                return null;
            }
        }

    }

    async getResources(options?:RequestConfig<ResourceI>) {
        let defaultParams: any = {
            size: 10
        }

        if (options) {

            if (options.size) {
                defaultParams.size = options.size;
            }

            if (options.page) {
                defaultParams.page = options.page;
            }

            if (options.fields) {

                defaultParams.fields = options.fields.join(",");

            }

        }
        
        let res = await APIClient.req({
            method: 'GET',
            params: defaultParams,
            url: 'resources'
        });

        let api = new SpigetAPI();

        let resources = [];

        for(let r of res) {

            let author = await api.getAuthor(r.author.id);

            if(author) {

                r.author = author;

            }

            let category = await api.getCategory(r.category.id);

            if(category) {

                r.category = category;

            }

            resources.push(r);

        }

        return Resource.fromRaw(resources);

    }

    async getNewResources(options?:RequestConfig<ResourceI>) {
        let defaultParams: any = {
            size: 10
        }

        if (options) {

            if (options.size) {
                defaultParams.size = options.size;
            }

            if (options.page) {
                defaultParams.page = options.page;
            }

            if (options.fields) {

                defaultParams.fields = options.fields.join(",");

            }

        }
        
        let res = await APIClient.req({
            method: 'GET',
            params: defaultParams,
            url: 'resources/new'
        });

        let api = new SpigetAPI();

        let resources = [];

        for(let r of res) {

            let author = await api.getAuthor(r.author.id);

            if(author) {

                r.author = author;

            }

            let category = await api.getCategory(r.category.id);

            if(category) {

                r.category = category;

            }

            resources.push(r);

        }

        return Resource.fromRaw(resources);

    }

    async getResource(id:number) {

        let res = await APIClient.req({
            method: 'GET',
            url: 'resources/'+id
        });

        

    }

}