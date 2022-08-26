import { RequestConfig } from "../interfaces/SpigetAPI";
import { AuthorsRequestOptions } from "../interfaces/SpigetAPI_authors";
import { APIClient } from "./APIClient";
import { Author } from "./Author";
import { CategoryCached } from "./Category";

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

    async getCategories(options?:RequestConfig) {
    
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

        return CategoryCached.fromRaw(res);

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

}