import { AuthorsAPI } from "../class/Author";


(async () => {
    let resources = await AuthorsAPI.getAuthorResources(4);

    console.log(resources);
})();