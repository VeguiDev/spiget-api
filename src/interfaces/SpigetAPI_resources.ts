import { ResourceI } from "./Resource";
import { RequestConfig } from "./SpigetAPI";


export type filters = 'free'|'premium'|'new';

export type PPP<T extends Props> =
    T extends RequestConfigResources ? RequestConfigResources :
    T extends ResourceForConfig ? ResourceForConfig :
    RequestConfig<ResourceI>;

export function isFor(arg:any):arg is ResourceForConfig  {
    return !!arg.version;
}

export type Props = RequestConfigResources | ResourceForConfig;

export interface RequestConfigResources extends RequestConfig<ResourceI> {
    filter: filters;
}

export interface ResourceForConfig extends RequestConfig<ResourceI> {
    filter?:never;
    version: string[];
    method?:('any'|'all');
}