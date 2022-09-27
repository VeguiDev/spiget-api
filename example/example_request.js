
const SpigetAPI = require("spiget-api");

// or

import SpigetAPI from 'spiget-api';

let api = new SpigetAPI("Example Agent"); // Instance of Librery

api.getAuthors().then((authors) => {
    console.log(authors); // In console: Author[]
});