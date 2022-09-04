import axios from "axios";
import { ResourceForI, ResourceI } from "../interfaces/Resource";
import { RequestConfig } from "../interfaces/SpigetAPI";
import { filters, isFor, PPP, Props, RequestConfigResources, ResourceForConfig } from "../interfaces/SpigetAPI_resources";
import { APIClient, PrepareParams } from "./APIClient";

const API = new APIClient();

export class ResourceAPI {

    /**
     * Request List of all resources. (Free and premium)
     */
    
    static async getResources<T extends Props>(options?:PPP<T>):Promise<ResourceI[]|ResourceForI|null> {

        let url = 'resources';

        if(options) {
            if(options.filter) {

                switch(options.filter) {
                    case "free":
                        url+="/free";
                        break;
                    case "new":
                        url+="/new";
                        break;
                    case "premium":
                        url+="/premium"
                        break;

                }

            } else if(options.version) {
                url+="/for/"+options.version.join(",");
                
            }

            delete options?.filter;
        }

        let params = PrepareParams(options);

        let res = await API.req({
            method: 'GET',
            url,
            params
        });

        if(axios.isAxiosError(res)) return null;

        return res;

    }

    static async getResource(id:number):Promise<ResourceI|null> {

        // let params = options;

        let res = await API.req({
            method: 'GET',
            url: 'resources/'+id
            // params
        });

        if(axios.isAxiosError(res)) return null;

        return res;

    }

}