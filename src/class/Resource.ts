import { Author, AuthorI, AuthorIcon } from "./Author";

export interface ResourceFileI {
    /**
     * Resource extension
     */
    type:string;

    /**
     * Resource size
     */
    size:number;

    /**
     * Resource size unit
     */
    sizeUnit:("B"|"KB"|"MB"|"GB"|string);

    /**
     * Resource File URL
     */
    url:string;
}

export interface ResourceRatingI {
    count:number;
    average: number;
}

export interface ResourceIcon extends AuthorIcon {

};

export interface ResourceI {

    id:number;
    external:boolean;
    file:ResourceFileI;
    likes:number;
    testedVersions:string[];
    links:{
        [link:string]: string;
    };
    name:string;
    tag:string;
    version:{
        id:number
    };
    author:Author;
    category:{
        id:number
    };
    rating:ResourceRatingI;
    releaseDate: number;
    updateDate:number;
    downloads:number;
    icon:ResourceIcon;
    existenceStatus:number;

}

export class Resource implements ResourceI {
    id:number;
    external:boolean;
    file:ResourceFileI;
    likes:number;
    testedVersions:string[];
    links:{
        [link:string]: string;
    };
    name:string;
    tag:string;
    version:{
        id:number
    };
    author:Author;
    category:{
        id:number
    };
    rating:ResourceRatingI;
    releaseDate: number;
    updateDate:number;
    downloads:number;
    icon:ResourceIcon;
    existenceStatus:number;

    constructor(rRaw:ResourceI) {

        this.id = rRaw.id;
        this.external = rRaw.external;
        this.file  = rRaw.file;
        this.likes = rRaw.likes;
        this.testedVersions = rRaw.testedVersions;
        this.links = rRaw.links;
        this.name = rRaw.name;
        this.tag = rRaw.tag;
        this.version = rRaw.version;
        this.author = rRaw.author;
        this.category = rRaw.category;
        this.rating = rRaw.rating;
        this.releaseDate = rRaw.releaseDate;
        this.updateDate = rRaw.updateDate;
        this.downloads = rRaw.downloads;
        this.icon = rRaw.icon;
        this.existenceStatus = rRaw.existenceStatus;
    
    }
}
