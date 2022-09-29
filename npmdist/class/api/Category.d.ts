import { CategoryI } from "../../interfaces/Category";
import { ResourceI } from "../../interfaces/Resource";
import { RequestConfig } from "../../interfaces/SpigetAPI";
export declare class CategoryAPI {
    static getCategories(options?: RequestConfig<CategoryI>): Promise<CategoryI[] | null>;
    static getCategory(id: number): Promise<CategoryI | null>;
    static getCategoryResources(id: number, options?: RequestConfig<ResourceI>): Promise<ResourceI[] | null>;
}
