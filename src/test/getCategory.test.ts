import { SpigetAPI } from "../class/SpigetAPI";


let api = new SpigetAPI();

(async () => {

    console.log(await api.getCategory(2));

})();