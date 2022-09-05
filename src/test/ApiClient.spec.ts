import { APIClient, PrepareParams } from "../class/APIClient";

let api = new APIClient();

it('api must be APIClient', () => {
    expect(api).toBeInstanceOf(APIClient);
})

it('check request works', async () => {
    
    let status = await api.req({
        method: 'GET',
        url: 'status'
    });

    expect(status).toBeInstanceOf(Object);

});

it('check if params preparer works', async () => {
    
    let parsed = PrepareParams({
        fields: ["a","b","c"],
        sort: {
            must: 'most',
            field: 'downloads'
        }
    });

    expect(parsed.fields).toBe("a,b,c")
    expect(parsed.sort).toBe("-downloads")

});

it('check if catch of req works', async () => {
    
    let re = await api.req({
        baseURL: 'https://spigot.org',
        timeout: 1000
    });

    expect(re).toBe("500_error");

});

it('check if completeResponse works', async () => {
    
    let re = await api.req({
        timeout: 1000,
        url: 'status',
        completeResponse: true
    });

    expect(re.data).toBeInstanceOf(Object);

});