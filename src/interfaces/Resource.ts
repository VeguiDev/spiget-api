import { AuthorI } from "./Author";

export interface ResourceFileI {

    type:(".jar"|string);
    size:number;
    sizeUnit:("B"|"KB"|"MB"|"GB");
    url:string;

}

export interface ResourceLinksI {

    [name:string]:string;

}

export interface ResourceSortI {

    external:boolean;
    id:number;
    file:ResourceFileI;
    likes:number;
    testedVersions: string[];
    links:ResourceLinksI;
    name:string;
    tag:string;
    version: {
        id:number;
        uuid:string;
    },
    author: AuthorI,
    category: {
        id:number;
    };
    icon: Icon
}
 