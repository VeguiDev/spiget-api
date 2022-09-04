import { AuthorsAPI } from "../class/api/Author";


(async () => {
    let reviews = await AuthorsAPI.getAuthorReviews(4);

    console.log(reviews);
})();