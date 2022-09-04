import { AuthorsAPI } from "../class/Author";

(async () => {

    let author = await AuthorsAPI.getAuthors();

    console.log(author);

})();