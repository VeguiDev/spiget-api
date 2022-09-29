import { CategoryI } from "../interfaces/Category";
import { ResourceI } from "../interfaces/Resource";
import { RequestConfig } from "../interfaces/SpigetAPI";
import { Resource } from "./Resource";
export declare class Category {
    id: number;
    name: string;
    constructor(r: CategoryI);
    getResources(options?: RequestConfig<ResourceI>): Promise<Resource[] | null>;
    static findById(id: number): Promise<Category | null>;
    static findAll(options?: RequestConfig<CategoryI>): Promise<Category[] | null>;
}
