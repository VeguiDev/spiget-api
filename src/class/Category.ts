
export interface CategoryI {

    id:number;
    name:string;

}

export class CategoryCached {

    id:number;
    name:string;

    constructor(r:CategoryI) {

        this.id = r.id;
        this.name = r.name;

    }

    static fromRaw(r:CategoryI):CategoryCached
    static fromRaw(r:CategoryI[]):CategoryCached[]
    static fromRaw(r:CategoryI|CategoryI[]):CategoryCached|CategoryCached[] {

        if(Array.isArray(r)) {

            let categories = [];

            for(let cat of r) {

                categories.push(this.fromRaw(cat));

            }

            return categories;

        }

        return new CategoryCached(r);

    }

}  