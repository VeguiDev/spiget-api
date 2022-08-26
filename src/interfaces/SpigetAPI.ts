export interface RequestConfig<T> {

    [name:string]: any;

    /**
     * Size of array returned. Default 10
     */
    size?:number;

    /**
     * Page number
     */
    page?:number;

    /**
     * Fields to return
     */
    fields?:string[]|(keyof T)[];
}

export interface CategoryRequestConfig<T> extends RequestConfig<T> {
}