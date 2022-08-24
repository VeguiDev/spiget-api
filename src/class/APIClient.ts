
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

export class APIClient {

    static client = axios.create({
        baseURL: "https://api.spiget.org/v2"
    });

    static async req(config:AxiosRequestConfig<any>):Promise<any|null> {

        try {
            let res = await this.client(config);

            if(this.validResponse(res)) {
                return res.data;
            } else {
                return null;
            }

        } catch(e) {
            throw e;
        }

    }

    static validResponse(res:AxiosResponse<any, any>) {

        return res.status == 200 || res.status == 301;

    }

}