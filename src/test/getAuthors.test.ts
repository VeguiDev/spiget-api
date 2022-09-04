import { AuthorsAPI } from "../class/api/Author";

(async () => {

    let author = await AuthorsAPI.getAuthors();

    console.log(author);

})();