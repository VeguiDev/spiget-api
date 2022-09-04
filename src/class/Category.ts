import { CategoryI } from "../interfaces/Category";
import { ResourceI } from "../interfaces/Resource";
import { RequestConfig } from "../interfaces/SpigetAPI";
import { CategoryAPI } from "./api/Category";


export class Category {

    id:number;
    name:string;

    constructor(r:CategoryI) {

        this.id = r.id;
        this.name = r.name;

    }

    async getResources(options?:RequestConfig<ResourceI>) {

        return await CategoryAPI.getCategoryResources(this.id, options);

    }

    // Static Methods
    static async findById(id:number):Promise<Category|null> {

        let category = await CategoryAPI.getCategory(id);

        if(!category) return null;

        return new Category(category);

    }

    static async findAll(options?:RequestConfig<CategoryI>) {

        let categories = await CategoryAPI.getCategories(options);

        if(!categories) return null;

        let cate = [];

        for(let category of categories) {

            cate.push(new Category(category));

        }
        
        return cate;

    }

}