import { ResourceDownloadLinkI, ResourceForI, ResourceI, ResourceUpdateI, ResourceVersionI } from "../../interfaces/Resource";
import { ReviewI } from "../../interfaces/Review";
import { RequestConfig, ResourceSearchFields, SearchRequestConfig } from "../../interfaces/SpigetAPI";
import { Props } from "../../interfaces/SpigetAPI_resources";
export declare class ResourceAPI {
    /**
     * Request List of all resources. (Free and premium)
     */
    static getResources(options?: Props): Promise<ResourceI[] | ResourceForI | null>;
    static getResource(id: number): Promise<ResourceI | null>;
    static getResourceReviews(id: number, options?: RequestConfig<ReviewI>): Promise<ReviewI[] | null>;
    static getResourceUpdates(id: number, options?: RequestConfig<ResourceUpdateI>): Promise<ResourceUpdateI[] | null>;
    static getResourceUpdate(id: number, update_id: number | "latest"): Promise<ResourceUpdateI | null>;
    static getResourceVersions(id: number, options?: RequestConfig<ResourceVersionI>): Promise<ResourceVersionI[] | null>;
    static getResourceVersion(id: number, version_id: number | 'latest'): Promise<ResourceVersionI | null>;
    static getResourceDownload(id: number, options?: {
        version?: number | 'latest';
    }): Promise<ResourceDownloadLinkI | null>;
    static searchResources(options: SearchRequestConfig<ResourceI, ResourceSearchFields>): Promise<ResourceI[] | null>;
}
