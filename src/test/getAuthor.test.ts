import { AuthorsAPI } from "../class/Author";

(async () => {

    let author = await AuthorsAPI.getAuthor(2);

    console.log(author);

})();