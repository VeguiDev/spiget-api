import { Author } from "../class/Author";
import { Resource, ResourceReview, ResourceUpdate, ResourceVersion } from "../class/Resource";
import { SpigetAPI } from "../class/SpigetAPI";
import { ResourceUpdateI } from "../interfaces/Resource";
import { ReviewI } from "../interfaces/Review";

const api = new SpigetAPI("test");

jest.setTimeout(10000);

let resource: Resource | null = null;



describe('check if Resource Methods works', () => {

    beforeEach(async () => {
        resource = await api.getResource(28140);
    });

    it('check if resource is not null', async () => {
        expect(resource).not.toBeNull();
    })

    it('check if GetDownloadURL Works', async () => {
        if (!resource) return;

        let url = await resource.getDownloadUrl();

        if (!url) {
            expect(url).not.toBeNull();
            return;
        }

        expect(url).toBeInstanceOf(Object);
        expect(typeof url.url == 'string').toBe(true);
        expect(typeof url.name == 'string').toBe(true);
    })

    it('check if resource reviews', async () => {
        if (!resource) return;

        let reviews = await resource.getReviews();

        if (!reviews) {
            expect(reviews).not.toBeNull();
            return;
        }

        expect(reviews).toBeInstanceOf(Array);
        expect(reviews[0]).toBeInstanceOf(ResourceReview);
    })

    it('check if resource updates', async () => {
        if (!resource) return;

        let updates = await resource.getUpdates();

        if (!updates) {
            expect(updates).not.toBeNull();
            return;
        }

        expect(updates).toBeInstanceOf(Array);
        expect(updates[0]).toBeInstanceOf(ResourceUpdate);
    })

    it('check if resource update', async () => {
        if (!resource) return;

        let update = await resource.getUpdate("latest");

        if (!update) {
            expect(update).not.toBeNull();
            return;
        }

        expect(update).toBeInstanceOf(ResourceUpdate);
    })

    it('check if resource invalid update returns null', async () => {
        if (!resource) return;

        let update = await resource.getUpdate(5465464);

        expect(update).toBeNull();

        expect(update).not.toBeInstanceOf(ResourceUpdate);
    })

    it('check if resource versions', async () => {
        if (!resource) return;

        let versions = await resource.getVersions();

        if (!versions) {
            expect(versions).not.toBeNull();
            return;
        }

        expect(versions).toBeInstanceOf(Array);
        expect(versions[0]).toBeInstanceOf(ResourceVersion);
    })

    it('check if resource version', async () => {
        if (!resource) return;

        let version = await resource.getVersion("latest");

        if (!version) {
            expect(version).not.toBeNull();
            return;
        }

        expect(version).toBeInstanceOf(ResourceVersion);

    })

    it('check if resource description and links', async () => {
        if (!resource) return;

        let description = resource.description;
        let links = resource.links;


        expect(typeof description == 'string').toBe(true);
        expect(typeof links == 'object').toBe(true);
    })

    it('check if getDownloadURL ResourceVersion works', async () => {

        let version = await resource?.getVersion("latest");

        if (!version) return;


        let url = await version.getDownloadURL();

        if (!url) {
            expect(url).not.toBeNull();
            return;
        }

        expect(url).toBeInstanceOf(Object);
        expect(typeof url.url == 'string').toBe(true);
        expect(typeof url.name == 'string').toBe(true);

    });

});

it('check if getResources works', async () => {

    let resources = await api.getResources();

    if (!resources) {
        expect(resources).not.toBeNull();
        return;
    }

    expect(resources).toBeInstanceOf(Array);
    expect(resources[0]).toBeInstanceOf(Resource);

});

let resources: Resource[] | null = null;

describe('cheking resources', () => {

    beforeEach(async () => {
        resources = await api.getResources({
            version: ["1.19"]
        });
    });

    it('check if getResources for version works', async () => {

        if (!resources) {
            expect(resources).not.toBeNull();
            return;
        }

        expect(resources).toBeInstanceOf(Array);
        expect(resources[0]).toBeInstanceOf(Resource);

    });

});

it('check if message Review works', async () => {

    let review = new ResourceReview({
        id: 0,
        message: "dGVzdA=="
    } as ReviewI, {} as Resource, {} as Author)

    expect(review.message).toBe("test");

});

it('check if dscription update works', async () => {

    let update = new ResourceUpdate({
        id: 0,
        description: "dGVzdA=="
    } as ResourceUpdateI, {} as Resource)

    expect(update.description).toBe("test");

});

describe('getResources filters checking', () => {

    it('check if Get Resources New works', async () => {

        let resources = await api.getResources({
            filter: 'new'
        });

        if (!resources) {
            expect(resources).not.toBeNull();
            return;
        }

        expect(resources).toBeInstanceOf(Array);
        expect(resources[0]).toBeInstanceOf(Resource);

    });

    it('check if Get Resources Free works', async () => {

        let resources = await api.getResources({
            filter: 'free'
        });

        if (!resources) {
            expect(resources).not.toBeNull();
            return;
        }

        expect(resources).toBeInstanceOf(Array);
        expect(resources[0]).toBeInstanceOf(Resource);

    });

    it('check if Get Resources Premium works', async () => {

        let resources = await api.getResources({
            filter: 'premium'
        });

        if (!resources) {
            expect(resources).not.toBeNull();
            return;
        }

        expect(resources).toBeInstanceOf(Array);
        expect(resources[0]).toBeInstanceOf(Resource);

    });

})

it('check if Gets DOWNLOAD URL OF GITHUB RESOURCE works', async () => {

    let resource = await api.getResource(2124);

    if (!resource) {
        expect(resource).not.toBeNull();
        return;
    }
    let url = await resource.getDownloadUrl();

    if(!url) return;

    expect(url).toBeInstanceOf(Object);
    expect(typeof url.url == 'string').toBe(true);
    expect(typeof url.name == 'string').toBe(true);
});