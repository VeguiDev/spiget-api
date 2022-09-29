import { Axios, AxiosRequestConfig } from "axios";
export declare class APIError {
    code: number;
    constructor(code: number);
}
export interface AxiosRequestConfigI extends AxiosRequestConfig {
    completeResponse?: boolean;
}
export declare class APIClient {
    static instance: APIClient;
    cl: Axios;
    private agentName;
    constructor(agent_name: string);
    static GETGITHUBRELEASE(urlx: string): Promise<{
        name: any;
        url: any;
    } | null>;
    req(config: AxiosRequestConfigI): Promise<any>;
    static getInstance(agent?: string): APIClient;
}
export declare function PrepareParams(params?: any): any;
