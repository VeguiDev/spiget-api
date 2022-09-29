import { ResourceI } from "./Resource";
import { RequestConfig } from "./SpigetAPI";
export declare type filters = 'free' | 'premium' | 'new';
export declare type PPP<T extends Props> = T extends RequestConfigResources ? RequestConfigResources : T extends ResourceForConfig ? ResourceForConfig : RequestConfig<ResourceI>;
export declare function isFor(arg: any): arg is ResourceForConfig;
export interface Props extends RequestConfig<ResourceI> {
    filter?: filters;
    version?: string[];
    method?: ('any' | 'all');
}
export interface RequestConfigResources extends RequestConfig<ResourceI> {
    filter: filters;
}
export interface ResourceForConfig extends RequestConfig<ResourceI> {
    filter?: never;
    version: string[];
    method?: ('any' | 'all');
}
