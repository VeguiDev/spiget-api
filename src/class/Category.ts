import { CategoryRequestConfig, RequestConfig } from "../interfaces/SpigetAPI";
import { APIClient } from "./APIClient";
import { Resource } from "./Resource";
import { SpigetAPI } from "./SpigetAPI";

export interface CategoryI {

    id:number;
    name:string;

}

export class Category {

    id:number;
    name:string;

    constructor(r:CategoryI) {

        this.id = r.id;
        this.name = r.name;

    }

    static fromRaw(r:CategoryI):Category
    static fromRaw(r:CategoryI[]):Category[]
    static fromRaw(r:CategoryI|CategoryI[]):Category|Category[] {

        if(Array.isArray(r)) {

            let categories = [];

            for(let cat of r) {

                categories.push(this.fromRaw(cat));

            }

            return categories;

        }

        return new Category(r);

    }

    async getResources(options?:CategoryRequestConfig<CategoryI>) {

        let defaultParams:any = {
            size: 10
        };

        if(options) {

            for(let key of Object.keys(options)) {
                if(key == "fields") {

                    defaultParams.fields = options.fields?.join(",");

                } else {
                    defaultParams[key] = options[key];
                }
            }

        }

        let res = await APIClient.req({
            method: 'GET',
            params: defaultParams,
            url: 'categories/'+this.id+'/resources'
        });

        let resources = [];

        for(let rec of res) {

            let author = await new SpigetAPI().getAuthor(rec.author.id);

            if(author) {
                rec.author = author;
            }

            rec.category = this;

            resources.push(rec);

        }

        return Resource.fromRaw(resources);

    }

}  