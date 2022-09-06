import { Resource } from "../class/Resource";
import { SpigetAPI } from "../class/SpigetAPI";

let api = new SpigetAPI("test");

jest.setTimeout(10000);

it('check if Get Resources New works', async () => {

    let resources = await api.getResources({
        filter: 'new',
        size:2
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
        filter: 'free',
        size:2
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
        filter: 'premium',
        size:2
    });

    if (!resources) {
        expect(resources).not.toBeNull();
        return;
    }

    expect(resources).toBeInstanceOf(Array);
    expect(resources[0]).toBeInstanceOf(Resource);

});