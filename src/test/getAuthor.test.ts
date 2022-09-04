import { AuthorsAPI } from "../class/api/Author";

(async () => {

    let author = await AuthorsAPI.getAuthor(2);

    console.log(author);

})();