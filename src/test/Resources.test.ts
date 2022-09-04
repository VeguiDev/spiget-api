import { ResourceAPI } from "../class/Resource";

(async () => {
    let resources = await ResourceAPI.getResources({
        filter:'free'
    });

    // console.log(resources);

    let resource = await ResourceAPI.getResourceDownload(2);

    console.log(resource);
})();