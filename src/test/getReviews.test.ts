import { SpigetAPI } from "../class/SpigetAPI";

const api = new SpigetAPI();

(async () => {

    let author = await api.getAuthor(1);

    let reviews = await author?.getReviews();

    console.log(reviews);

})();