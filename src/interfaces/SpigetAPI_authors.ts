import { AuthorI } from "../class/Author";

export interface AuthorsRequestOptions {

    /**
     * Size of array returned. Default: 10
     */
    size?:number;

    /**
     * Page number
     */
    page?:number;

    /**
     * Fields to return
     */
    fields?:string[]|(keyof AuthorI)[];

}