import { Author } from "../class/Author";

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

});