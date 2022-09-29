import chalk from "chalk";
import {Command, Argument} from "commander";
import { SpigetAPI } from "../../../class/SpigetAPI";
import { makeRandomString, RepresentObjectForConsole } from "../../../util/Utils";

const api = new SpigetAPI(makeRandomString(10));

let command = new Command("search");
command.addArgument(new Argument("<name>", "Name to search in Spiget."))
command.description("Search user in SpigotAPI");
command.action(async (name, opts) => {

    if(typeof name != 'string') {
        console.log(chalk.red("Invalid name must be string."))
        return;
    }

    let author = await api.search("author", {
        query: name,
        field: 'name'
    });

    if(!author) {
        console.log(chalk.red("Authors could not be obtained or not found."));
        return;
    }

    console.log(RepresentObjectForConsole(author));

});

export {
    command as AuthorSearchCommand
}