import axios from 'axios';

(async () => {

    let resources = await axios.get('https://api.spiget.org/v2/resources?size=1');
    let resource = await axios.get('https://api.spiget.org/v2/resources/28140');

    for(let key of Object.keys(resource.data)) {
        if(!Object.keys(resources.data[0]).includes(key)) {
            console.log(key+":"+typeof resource.data[key]);
        }
    }

})();