import { APIClient, PrepareParams } from "../class/APIClient";

let api = new APIClient();

jest.setTimeout(10000);

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

it('check if GITHUB RELEASE DOWNLOAD works', async () => {
    
    let githubUrl = await APIClient.GETGITHUBRELEASE("https://github.com/SkinsRestorer/SkinsRestorerX/releases/tag/14.2.3");

    if(!githubUrl) {
        expect(githubUrl).not.toBeNull();
        return;
    }

    expect(githubUrl).toBeInstanceOf(Object);
    expect(typeof githubUrl.url == 'string').toBe(true);
    expect(typeof githubUrl.name == 'string').toBe(true);

    githubUrl = await APIClient.GETGITHUBRELEASE("https://github.com/SkinsRestorer/SkinsRestorerX/releases");

    if(!githubUrl) {
        expect(githubUrl).not.toBeNull();
        return;
    }

    expect(githubUrl).toBeInstanceOf(Object);
    expect(typeof githubUrl.url == 'string').toBe(true);
    expect(typeof githubUrl.name == 'string').toBe(true);

});

it('check if GITHUB RELEASE DOWNLOAD ERROR works', async () => {
    
    let githubUrl = await APIClient.GETGITHUBRELEASE("https://github.com/SkinsRestorer/SkinsRestorerX/releases/asdasdasd/14.2.3");

    expect(githubUrl).not.toBeNull();

});