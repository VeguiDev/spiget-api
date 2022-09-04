import { AuthorI } from "./Author";
import { IconI } from "./SpigetAPI";

export interface ResourceFileI {

    type: (".jar" | string);
    size: number;
    sizeUnit: ("B" | "KB" | "MB" | "GB");
    url: string;

}

export interface ResourceLinksI {

    [name: string]: string;

}

export interface ResourceVersion {
    id: number;
    uuid: string;
};

export interface ResourceRatingI {
    count: number;
    average: number;
}

export interface ResourceShortI {
    external: boolean;
    file: ResourceFileI;
    likes: number;
    testedVersions: ResourceVersion[];
    links: ResourceLinksI;
    name: string;
    tag: string;
    version: ResourceVersion;
    author: AuthorI;
    category: {
        id: number
    };
    rating: ResourceRatingI;
    icon: IconI;
    releaseDate: number;
    updateDate: number;
    downloads: number;
    premium: boolean;
    existenceStatus: number;
    id: number;
};

export interface ResourceI extends ResourceShortI {

    description: string;
    versions: ResourceVersion[];
    updates: {
        id:number;
    };
    reviews: {
        id:number;
    };
    price: number;
    sourceCodeLink: string;
    supportedLanguages: string;
    contributors: string;

};

export interface ResourceForI {

    check:string[];
    method:"any"|"all";
    match: {
        id: number;
        name:string;
        testedVersions: string[]
    }

}