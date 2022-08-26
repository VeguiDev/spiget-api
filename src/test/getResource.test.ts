import { APIClient } from "../class/APIClient";


(async () => {
    let resource = await APIClient.req({
        method:'GET',
        url: 'resources/28140'
    });

    console.log(Object.keys(resource));
})();