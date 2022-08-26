import { SpigetAPI } from "../class/SpigetAPI";


let api = new SpigetAPI();

(async () => {

    let resources = await api.getResources();

    console.log(Object.keys(resources));

})();