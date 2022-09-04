

export class SpigetAPI {

    agent_name:string;

    constructor(agent_name:string) {

        this.agent_name = agent_name;
        process.env.SPIGETAPI_AGENT_NAME = agent_name;

    }

}