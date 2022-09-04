import { AuthorsAPI } from "../class/Author";


(async () => {
    let reviews = await AuthorsAPI.getAuthorReviews(4);

    console.log(reviews);
})();