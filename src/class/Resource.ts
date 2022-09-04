import axios from "axios";
import { ResourceDownloadLinkI, ResourceForI, ResourceI, ResourceVersionI } from "../interfaces/Resource";
import { RequestConfig } from "../interfaces/SpigetAPI";
import { filters, isFor, PPP, Props, RequestConfigResources, ResourceForConfig } from "../interfaces/SpigetAPI_resources";
import { APIClient, PrepareParams } from "./APIClient";

const API = new APIClient();

export class ResourceAPI {

    /**
     * Request List of all resources. (Free and premium)
     */

    static async getResources<T extends Props>(options?: PPP<T>): Promise<ResourceI[] | ResourceForI | null> {

        let url = 'resources';

        if (options) {
            if (options.filter) {

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

            } else if (options.version) {
                url += "/for/" + options.version.join(",");

            }

            delete options?.filter;
        }

        let params = PrepareParams(options);

        let res = await API.req({
            method: 'GET',
            url,
            params
        });

        if (axios.isAxiosError(res)) return null;

        return res;

    }

    static async getResource(id: number): Promise<ResourceI | null> {

        // let params = options;

        let res = await API.req({
            method: 'GET',
            url: 'resources/' + id
            // params
        });

        if (axios.isAxiosError(res)) return null;

        return res;

    }

    static async getResourceVersions(id:number, options?:RequestConfig<ResourceVersionI>): Promise<ResourceVersionI[] | null> {

        let params = PrepareParams(options);

        let res = await API.req({
            method: 'GET',
            url: 'resources/'+id+'/versions',
            params
        });

        if(axios.isAxiosError(res)) return null;

        return res;

    }

    static async getResourceVersion(id:number, version_id:number|'latest'): Promise<ResourceVersionI | null> {

        // let params = PrepareParams(options);

        let res = await API.req({
            method: 'GET',
            url: 'resources/'+id+'/versions/'+version_id
            // params
        });

        if(axios.isAxiosError(res)) return null;

        return res;

    }

    static async getResourceDownload(id: number, options?:{
        version?:number|'latest'
    }): Promise<ResourceDownloadLinkI | null> {

        // let params = options;

        let resource = await this.getResource(id);

        if (!resource) return null;

        let reqUrl = 'resources/' + id + '/download';

        if(options) {
            if(options.version) {
                reqUrl = 'resources/' + id + '/versions/'+options.version+'/download'
            }
        }

        let res = await API.req({
            method: 'HEAD',
            url: reqUrl,
            completeResponse: true
            // params
        });

        if (axios.isAxiosError(res)) return null;

        let url = new URL(res.request.res.responseUrl);

        if (url.host == "cdn.spiget.org") {
            let rUrl = url.toString();

            let verID = resource.version.id;

            if(options && options.version && options.version != 'latest') {

                verID = options.version;

            }

            let version = await this.getResourceVersion(resource.id, verID);

            let name = resource.name+"-"+verID+".jar";

            if(version) {
                name = resource.name+"-"+version.name+".jar"
            };

            return {
                url: rUrl,
                name
            };
        };

        if (url.host == "github.com") {
            console.log("FROM GITHUB");
            console.log("PATH: ", url.pathname);

            let githubDownload = await APIClient.GETGITHUBRELEASE(url.toString());

            return githubDownload;
        }

        return null;

    }

}