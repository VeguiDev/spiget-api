import { AuthorI } from "./Author";
import { IconI, RatingI } from "./SpigetAPI";

export interface ResourceFileI {

    type: (".jar" | string);
    size: number;
    sizeUnit: ("B" | "KB" | "MB" | "GB");
    url: string;
    name?: string;

}

export interface ResourceLinksI {

    [name: string]: string;

}

export interface ResourceVersionSortI {
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
    testedVersions: ResourceVersionSortI[];
    links: ResourceLinksI;
    name: string;
    tag: string;
    version: ResourceVersionSortI;
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
    versions: ResourceVersionSortI[];
    updates: {
        id: number;
    };
    reviews: {
        id: number;
    };
    price: number;
    sourceCodeLink: string;
    supportedLanguages: string;
    contributors: string;

};

export interface ResourceForI {

    check: string[];
    method: "any" | "all";
    match: {
        id: number;
        name: string;
        testedVersions: string[]
    }

}

export interface ResourceDownloadLinkI {

    name: string;
    url: string;

}

export interface ResourceVersionI extends ResourceVersionSortI {
    downloads: number;
    rating: RatingI;
    url: string;
    name: string;
    releaseDate: number;
    resource: number | ResourceI;
}