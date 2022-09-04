import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";

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

    cl: Axios = axios.create({
        baseURL: 'https://api.spiget.org/v2'
    });

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

        console.log(author, repository, pathIn, mustBeTag, tag);

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
        
        return null;

    }

    async req(config: AxiosRequestConfigI): Promise<any> {

        try {

            let res = await this.cl.request(config);

            if (config.completeResponse) return res;

            return res.data;

        } catch (e) {

            throw e;

        }


    }

}

export function PrepareParams(params?: any): any {
    let op = params;

    if (op.fields) {
        op.fields = params.fields.join(",");
    }

    return op;
}