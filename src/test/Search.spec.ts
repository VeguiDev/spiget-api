import { Author } from "../class/Author";
import { Resource } from "../class/Resource";

jest.setTimeout(10000);

describe("Search testing", () => {

    it(" testing if authors search works", async () => {
        let authors = await Author.search({
            query: 'luck',
            field: 'name'
        });

        if(!authors) {
            expect(authors).not.toBeNull();
            return;
        }

        expect(authors).toBeInstanceOf(Array);
        expect(authors[0]).toBeInstanceOf(Author);
    })

    it(" testing if resource search works", async () => {
        let resources = await Resource.search({
            query: 'luck',
            field: 'name'
        });

        if(!resources) {
            expect(resources).not.toBeNull();
            return;
        }

        expect(resources).toBeInstanceOf(Array);
        expect(resources[0]).toBeInstanceOf(Resource);
    })

});