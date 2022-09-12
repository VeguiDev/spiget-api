import axios from "axios";
import { ResourceDownloadLinkI, ResourceForI, ResourceI, ResourceUpdateI, ResourceVersionI } from "../../interfaces/Resource";
import { ReviewI } from "../../interfaces/Review";
import { RequestConfig, ResourceSearchFields, SearchRequestConfig } from "../../interfaces/SpigetAPI";
import { filters, isFor, PPP, Props, RequestConfigResources, ResourceForConfig } from "../../interfaces/SpigetAPI_resources";
import { APIClient, PrepareParams } from "../APIClient";

const API = new APIClient();

export class ResourceAPI {

    /**
     * Request List of all resources. (Free and premium)
     */

    static async getResources(options?: Props): Promise<ResourceI[] | ResourceForI | null> {

        let url = "resources";

        if (options && options.filter) {

            switch (options.filter) {
                case "free":
                    url += "/free";
                    break;
                case "new":
                    url += "/new";
                    break;
                case "premium":
                    url += "/premium"
                    break;

            }

        } else if (options && !options.filter && options.version) {
             url += "/for/" + options.version.join(",");
        }

        let params = PrepareParams(options);

        let res = await API.req({
            method: "GET",
            url,
            params
        });

        if (axios.isAxiosError(res)) return null;

        return res;

    }

    static async getResource(id: number): Promise<ResourceI | null> {

        // let params = options;

        let res = await API.req({
            method: "GET",
            url: "resources/" + id
            // params
        });

        if (axios.isAxiosError(res)) return null;

        return res;

    }

    static async getResourceReviews(id: number, options?: RequestConfig<ReviewI>): Promise<ReviewI[] | null> {

        let params = PrepareParams(options);

        let res = await API.req({
            method: "GET",
            url: "resources/" + id + "/reviews",
            params
        });

        if (axios.isAxiosError(res)) return null;

        return res;

    }

    static async getResourceUpdates(id: number, options?: RequestConfig<ResourceUpdateI>): Promise<ResourceUpdateI[] | null> {

        let params = PrepareParams(options);

        let res = await API.req({
            method: "GET",
            url: "resources/" + id + "/updates",
            params
        });

        if (axios.isAxiosError(res)) return null;

        return res;

    }

    static async getResourceUpdate(id: number, update_id: number | "latest"): Promise<ResourceUpdateI | null> {

        // let params = PrepareParams(options);

        if (Number(update_id) == NaN && update_id != "latest") return null;

        let res = await API.req({
            method: "GET",
            url: "resources/" + id + "/updates/" + update_id
            // params
        });

        if (axios.isAxiosError(res)) return null;

        return res;

    }

    static async getResourceVersions(id: number, options?: RequestConfig<ResourceVersionI>): Promise<ResourceVersionI[] | null> {

        let params = PrepareParams(options);

        let res = await API.req({
            method: "GET",
            url: "resources/" + id + "/versions",
            params
        });

        if (axios.isAxiosError(res)) return null;

        return res;

    }

    static async getResourceVersion(id: number, version_id: number | 'latest'): Promise<ResourceVersionI | null> {

        // let params = PrepareParams(options);

        let res = await API.req({
            method: "GET",
            url: "resources/" + id + "/versions/" + version_id
            // params
        });

        if (axios.isAxiosError(res)) return null;

        return res;

    }

    static async getResourceDownload(id: number, options?: {
        version?: number | 'latest'
    }): Promise<ResourceDownloadLinkI | null> {

        // let params = options;

        let resource = await this.getResource(id);

        if (!resource) return null;

        let reqUrl = 'resources/' + id + '/download';

        if (options) {
            if (options.version) {

                if (!resource.external) {

                    let rUrl = "https://www.spigotmc.org/resources/" + resource.name + "." + resource.id + "/download?version=" + options?.version;

                    let verID = resource.version.id;

                    if (options && options.version && options.version != "latest") {

                        verID = options.version;

                    }

                    let version = await this.getResourceVersion(resource.id, verID);

                    let name = resource.name + "-" + verID + ".jar";

                    if (version) {
                        name = resource.name + "-" + version.name + ".jar"
                    };

                    return {
                        url: rUrl,
                        name
                    };

                }

                reqUrl = "resources/" + id + "/versions/" + options.version + "/download"
            }
        }



        let res = await API.req({
            method: "GET",
            url: reqUrl,
            completeResponse: true
        });

        if (axios.isAxiosError(res)) return null;

        if (res == "500_error") return null;

        let url = new URL(res.request.res.responseUrl);

        if (url.host == "cdn.spiget.org") {
            let rUrl = url.toString();

            let verID = resource.version.id;

            if (options && options.version && options.version != 'latest') {

                verID = options.version;

            }

            let version = await this.getResourceVersion(resource.id, verID);

            let name = resource.name + "-" + verID + ".jar";

            if (version) {
                name = resource.name + "-" + version.name + ".jar"
            };

            return {
                url: rUrl,
                name
            };
        };

        if (url.host == "github.com") {

            let githubDownload = await APIClient.GETGITHUBRELEASE(url.toString());

            return githubDownload;
        }

        return null;

    }

    static async searchResources(options:SearchRequestConfig<ResourceI, ResourceSearchFields>):Promise<ResourceI[]|null> {

        let params = PrepareParams(options);

        let res = await API.req({
            method:"GET",
            url:"/search/resources/"+options.query,
            params
        });

        if(axios.isAxiosError(res)) return null;

        return res;

    }

}