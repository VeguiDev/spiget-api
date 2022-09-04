import { ResourceAPI } from "../class/api/Resource";

(async () => {
    let resources = await ResourceAPI.getResources({
        filter:'free'
    });

    // console.log(resources);

    let resource = await ResourceAPI.getResourceDownload(2);

    console.log(resource);
})();