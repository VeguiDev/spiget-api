import { SpigetAPI } from "../class/SpigetAPI";

let api = new SpigetAPI();

(async () => {

    let categories = await api.getCategories();

    console.log(categories);

})();