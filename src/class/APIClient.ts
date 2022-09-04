import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";

export class APIError {

    code:number;

    constructor(code:number) {

        this.code = code;

    }

}

export class APIClient {

    cl:Axios = axios.create({
        baseURL: 'https://api.spiget.org/v2'
    });

    async req(config:AxiosRequestConfig):Promise<any> {

        try {
            
            let res = await this.cl.request(config);

            return res.data;

        } catch(e) {

            throw e;

        }
        

    }

}

export function PrepareParams(params?:any):any {
    let op = params;

    if(op.fields) {
        op.fields = params.fields.join(",");
    }

    return op;
}