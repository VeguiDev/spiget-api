import { SpigetAPI } from "../../class/SpigetAPI";

const api = new SpigetAPI("dev");

(async () => {

    let author = await api.getAuthorByID(2);

    console.log(author);
 
    let resources = await author?.getResources({
        sort: {
            must: 'most',
            field: 'downloads'
        }
    });

    console.log(resources);

    let reviews = await author?.getReviews();

    console.log(reviews);

})();