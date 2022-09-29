import { ResourceFileI, ResourceI, ResourceRatingI, ResourceVersionSortI, ResourceVersionI, ResourceUpdateI } from "../interfaces/Resource";
import { ReviewI } from "../interfaces/Review";
import { IconI, RatingI, RequestConfig, ResourceSearchFields, SearchRequestConfig } from "../interfaces/SpigetAPI";
import { Props } from "../interfaces/SpigetAPI_resources";
import { Author } from "./Author";
import { Category } from "./Category";
export declare class Resource {
    id: number;
    external: boolean;
    file: ResourceFileI;
    likes: number;
    name: string;
    version: ResourceVersionSortI;
    author: Author;
    category: Category;
    rating: ResourceRatingI;
    icon: IconI;
    releaseDate: number;
    updateDate: number;
    downloads: number;
    premium: boolean;
    existenceStatus: number;
    versions: ResourceVersionSortI[];
    updates: {
        id: number;
    };
    reviews: {
        id: number;
    };
    price: number;
    private description_base64;
    private links_base64;
    testedVersions?: ResourceVersionSortI[];
    contributors?: string;
    tag?: string;
    sourceCodeLink?: string;
    supportedLanguages?: string;
    constructor(r: ResourceI, author: Author, category: Category);
    /**
     * Generate download url for this resource
     */
    getDownloadUrl(options?: {
        version?: number | 'latest';
    }): Promise<import("../interfaces/Resource").ResourceDownloadLinkI | null>;
    /**
     * Get list of reviews of this resource
     */
    getReviews(options?: RequestConfig<ReviewI>): Promise<ResourceReview[] | null>;
    /**
     * Get list of updates of this resource
     */
    getUpdates(options?: RequestConfig<ResourceUpdateI>): Promise<ResourceUpdate[] | null>;
    /**
     * Get specific update of this resource
     */
    getUpdate(id: number | "latest"): Promise<ResourceUpdate | null>;
    /**
     * Get list of versions of this resource
     */
    getVersions(options?: RequestConfig<ResourceVersionSortI>): Promise<ResourceVersion[] | null>;
    /**
     * Get specific version of this resource
     */
    getVersion(id: number | "latest"): Promise<ResourceVersion | null>;
    get description(): string;
    get links(): any;
    /**
     * Search a resource
     */
    static search(options: SearchRequestConfig<ResourceI, ResourceSearchFields>): Promise<Resource[] | null>;
    /**
     * Find a resource by ID
     */
    static findByID(id: number): Promise<Resource | null>;
    /**
     * Find all resources
     */
    static findAll(options?: Props): Promise<Resource[] | null>;
}
export declare class ResourceReview {
    author: Author;
    rating: RatingI;
    /**
     * Base64 Encoded String
     */
    private message_base64;
    version: string;
    date: number;
    resource: Resource;
    id: number;
    constructor(r: ReviewI, resource: Resource, author: Author);
    get message(): string;
}
export declare class ResourceUpdate {
    date: number;
    likes: number;
    private description_base64;
    title: string;
    resource: Resource;
    id: number;
    constructor(r: ResourceUpdateI, resource: Resource);
    get description(): string;
}
export declare class ResourceVersion {
    id: number;
    uuid: string;
    downloads: number;
    rating: RatingI;
    url: string;
    name: string;
    releaseDate: number;
    resource: Resource;
    constructor(r: ResourceVersionI, resource: Resource);
    getDownloadURL(): Promise<import("../interfaces/Resource").ResourceDownloadLinkI | null>;
}
