import { Author } from "./Author";

export interface ReviewRatingI {

    count:number;
    average:number;

}

export interface ReviewI {
    author:Author;
    rating: ReviewRatingI;
    /**
     * Base64 encoded string
     */
    message:string;

    version:string;
    date:number;
    id:number;
}

export class Review {

    author:Author;
    rating: ReviewRatingI;
    /**
     * Base64 encoded string
     */
    message:string;

    version:string;
    date:number;
    id:number;

    constructor(r:ReviewI) {

        this.id = r.id;
        this.author = r.author;
        this.message = r.message;
        this.rating = r.rating;
        this.version = r.version;
        this.date = r.date;

    }

    /**
     * Returns the message string decoded.
     */
    getMessage():string {

        return Buffer.from(this.message, 'base64').toString('utf-8');

    }

    static fromRaw(raw:ReviewI):Review
    static fromRaw(raw:ReviewI[]):Review[]
    static fromRaw(raw:ReviewI|ReviewI[]):Review|Review[] {

        if(Array.isArray(raw)) {

            let reviews:Review[] = [];

            for(let review of raw) {

                reviews.push(this.fromRaw(review));

            }

            return reviews;

        }

        return new Review(raw);

    }

}