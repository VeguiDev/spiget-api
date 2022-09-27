import axios, { Axios, AxiosRequestConfig } from "axios";

import crypto from 'crypto';

export class APIError {

    code: number;

    constructor(code: number) {

        this.code = code;

    }

}

export interface AxiosRequestConfigI extends AxiosRequestConfig {
    completeResponse?: boolean
}

export class APIClient {

    static instance:APIClient;

    cl: Axios;

    private agentName:string;

    constructor(agent_name:string) {
        this.agentName = agent_name;
        this.cl = axios.create({
            baseURL: 'https://api.spiget.org/v2',
            validateStatus: (statusN) => statusN < 500,
            headers: {
                'User-Agent': this.agentName
            } 
        });
    }

    static async GETGITHUBRELEASE(urlx: string) {

        let client = axios.create({
            headers: {
                "Accept": "application/vnd.github+json",
                "User-Agent": process.env.SPIGETAPI_AGENT_NAME || "development-agent"
            },
            baseURL: "https://api.github.com"
        })

        let url = new URL(urlx);

        let path = url.pathname.split("/");

        let author = path[1],
            repository = path[2],
            pathIn = path[3],
            mustBeTag = path[4],
            tag = path[5]

        try {
            if (mustBeTag && tag) {

                let res = await client.request({
                    url: "repos/"+author+"/"+repository+"/releases/tags/"+tag,
                    method: 'GET'
                });
    
                let assets = [];
    
                for(let asset of res.data.assets) {
                    assets.push({
                        name: asset.name,
                        url: asset.browser_download_url
                    })
                }
    
                return assets[0];
    
            } else {
                let res = await client.request({
                    url: "repos/"+author+"/"+repository+"/releases/latest",
                    method: 'GET'
                });
    
                let assets = [];
    
                for(let asset of res.data.assets) {
                    assets.push({
                        name: asset.name,
                        url: asset.browser_download_url
                    })
                }
    
                return assets[0];
            }
        } catch(e) {
            console.error(e);
            return null;
        }
        return null;

    }

    async req(config: AxiosRequestConfigI): Promise<any> {

        try {

            let res = await this.cl.request(config);
            
            if (config.completeResponse) return res;

            return res.data;

        } catch (e) {

            return "500_error";

        }


    }

    static getInstance(agent?:string) {
        if(!this.instance) {
            let aname = crypto.randomBytes(20).toString("hex");

            if(agent) {
                aname = agent;
            }

            this.instance = new this(aname);
        }
    }

}

export function PrepareParams(params?: any): any {
    let op = params;

    if(op) {

        for(let key of Object.keys(op)) {

            if(Array.isArray(op[key])) {
                op[key] = op[key].join(",");
            }

        }

        if(op.sort) {

            if(op.sort.must && op.sort.field) {

                let sortMode = true;

                if(op.sort.must == "most") {
                    sortMode = false;
                }

                op.sort = (sortMode ? '+' : '-') + op.sort.field;

            }

        }

    }

    return op;
}