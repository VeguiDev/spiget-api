import { IconI } from "./SpigetAPI";

export interface AuthorIdentitiesI {
    [name:string]: string
}

export interface AuthorI {

    id:number;
    identities:AuthorIdentitiesI;
    icon:IconI;
    name:string;

}