import { SpigetAPI } from "../class/SpigetAPI";


let api = new SpigetAPI();

(async () => {

    let category = await new SpigetAPI().getCategory(2);

    console.log(await category?.getResources());

})();