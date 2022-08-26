import { SpigetAPI } from "../class/SpigetAPI";

let api = new SpigetAPI();

(async () => {

    let categories = api.getCategories();

    console.log(categories);

})();