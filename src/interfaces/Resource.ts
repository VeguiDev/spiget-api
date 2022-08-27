import { AuthorI } from "./Author";
import { IconI } from "./SpigetAPI";

export interface ResourceFileI {

    type:(".jar"|string);
    size:number;
    sizeUnit:("B"|"KB"|"MB"|"GB");
    url:string;

}

export interface ResourceLinksI {

    [name:string]:string;

}

export interface ResourceVersion {
    id:number;
    uuid:string;
};

export interface ResourceSortI {

    external:boolean;
    id:number;
    file:ResourceFileI;
    likes:number;
    testedVersions: string[];
    links:ResourceLinksI;
    name:string;
    tag:string;
    versions: ResourceVersion[],
    author: AuthorI,
    category: {
        id:number;
    };
    icon: IconI;
    description:string;
    updates:{
        id:number;
    }[];
    reviews: {id:number}[];
    version:ResourceVersion;
    rating: {
        count:number;
        average:number;
    };
    releaseDate:number;
    updateDate:number;
    downloads:number;
    premium:boolean;
    price:0;
    sourceCodeLink: string;
    supportedLanguages:string;
    existenceStatus:number;
    contributors:string;
};
 