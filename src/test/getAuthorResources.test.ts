import { AuthorsAPI } from "../class/api/Author";


(async () => {
    let resources = await AuthorsAPI.getAuthorResources(4);

    console.log(resources);
})();