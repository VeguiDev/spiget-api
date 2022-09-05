import { APIError } from "../class/APIClient";
import { Author, Review } from "../class/Author";
import { Resource } from "../class/Resource";
import { SpigetAPI } from "../class/SpigetAPI";

const api = new SpigetAPI("test");

it('check if get author', async () => {

    let author = await api.getAuthorByID(2);

    expect(author).toBeInstanceOf(Author);

})

it('check if get authors', async () => {

    let authors = await api.getAuthors();

    if(!authors) {
        expect(authors).not.toBeNull();
        return;
    }

    expect(authors).toBeInstanceOf(Array);
    expect(authors[0]).toBeInstanceOf(Author);


});

it("check if can get author resources", async () => {

    let author = await api.getAuthorByID(100356);

    if(!author) {
        expect(author).not.toBeNull();
        return;
    }

    let resources = await author.getResources();

    if(!resources) {
        expect(resources).not.toBeNull();
        return;
    }

    expect(resources).toBeInstanceOf(Array);

    if(resources.length > 0) {
        expect(resources[0]).toBeInstanceOf(Resource)
    }
});

it("check if works review class constructor", async () => {

    expect(new Review({
        id: 0,
        message: "dGVzdA==",
        rating: {
            count:1,
            average: 10
        },
        author: {
            id: 0
        },
        date: 1531651654,
        resource: 0,
        version: '1.19'
    }, {} as Author, {} as Resource)).toBeInstanceOf(Review);

});

it("check if works review message getter", async () => {

    let rev = new Review({
        id: 0,
        message: "dGVzdA==",
        rating: {
            count:1,
            average: 10
        },
        author: {
            id: 0
        },
        date: 1531651654,
        resource: 0,
        version: '1.19'
    }, {} as Author, {} as Resource);

    let isString = typeof rev.message == 'string';

    expect(isString).toBe(true);

});

it("check if can get author reviews", async () => {

    let author = await api.getAuthorByID(2);

    if(!author) {
        expect(author).not.toBeNull();
        return;
    }

    let reviews = await author.getReviews();

    if(!reviews) {
        expect(reviews).not.toBeNull();
        return;
    }

    expect(reviews).toBeInstanceOf(Array);

    expect(reviews[0]).toBeInstanceOf(Review);
    
});

it('check if invalid author returns null', async () => {

    let author = await api.getAuthorByID(200);

    expect(author).toBe(null);

});

it("Check APIERROR constructor", () => {
    let apiMockError = new APIError(400);

    expect(apiMockError).toBeInstanceOf(APIError);
});