import { AuthorI } from "./Author"
import { RatingI } from "./SpigetAPI";

export interface ReviewI {

    author:{
        id:number
    }|AuthorI;

    rating:RatingI;

    /**
     * Base64 Encoded String
     */
    message:string;

    version:string;

    date:number;

    resource:number;

    id:number;

}