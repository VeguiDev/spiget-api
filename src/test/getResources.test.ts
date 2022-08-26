import { SpigetAPI } from "../class/SpigetAPI";


const api = new SpigetAPI();

(async () => {

    let author = await api.getAuthor(1);

    let resources =  await author?.getResources();

    console.log(resources);

})();