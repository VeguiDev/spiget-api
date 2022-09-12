import { APIClient } from "../class/APIClient";

export interface RequestConfig<T> {

    /**
     * Size of array returned. Default 10
     */
    size?:number;

    /**
     * Sort by field
     * Example: Resources More Donwlaoded
     */
    sort?:{
        must: ('most'|'least');
        field: string;
    }

    /**
     * Page number
     */
    page?:number;

    /**
     * Fields to return
     */
    fields?:string[]|(keyof T)[];
}

export interface AuthorSearchFields {
    name:string;
}

export interface ResourceSearchFields {
    name:string;
    tag:string;
}

export interface SearchRequestConfig<T, U> extends RequestConfig<T> {

    query:string;
    field:keyof U;

}

export interface CategoryRequestConfig<T> extends RequestConfig<T> {
}

export interface IconI {

    url:string;
    hash:string;
    /**
     * Base64 encoded image data
     */
    data:string;
    

}

export interface RatingI {
    count:number;
    average:number;
}