import { SpigetAPI } from "../class/SpigetAPI";

let api = new SpigetAPI();

(async () => {

    let author = await api.getAuthor(1);

    console.log(author);

})();