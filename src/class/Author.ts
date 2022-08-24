

export interface AuthorIcon {
    /**
     * Url to author icon
     */
    url:string;

    /**
     * The base64 encoded author icon
     */
    data:string;

    info:number;

    hash:string;
}

export interface AuthorI {
    id:number;
    name:string;
    icon:AuthorIcon;
    identities:AuthorIdentities;

}

export interface AuthorIdentities {
    iam:string;
    twitter:string;
    facebook:string;
}

export class Author {

    name:string;
    icon:AuthorIcon;
    id:number;
    identities:AuthorIdentities;
    
    constructor(authorRaw:AuthorI) {

        this.id = authorRaw.id;
        this.icon = authorRaw.icon;
        this.name = authorRaw.name;

        this.identities = authorRaw.identities;

    }



    static fromRaw(raw:AuthorI):Author
    static fromRaw(raw:AuthorI[]):Author[]
    static fromRaw(raw:AuthorI|AuthorI[]):Author|Author[] {

        if(Array.isArray(raw)) {

            let authors:Author[] = [];

            for(let aRaw of raw) {
                authors.push(new Author(aRaw));
            }

            return authors;

        }

        return new Author(raw);

    }

}