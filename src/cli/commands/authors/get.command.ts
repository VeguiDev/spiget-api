import chalk from "chalk";
import {Command, Argument} from "commander";
import { SpigetAPI } from "../../../class/SpigetAPI";
import { makeRandomString, RepresentObjectForConsole } from "../../../util/Utils";

const api = new SpigetAPI(makeRandomString(10));

let command = new Command("list");
command.addArgument(new Argument("[page]", "Page number. Default 1"))
command.option("-d, --details", "Show detailed information of requested object.")
command.option("-s, --size <size>", "Set size of the paginated response.")
command.aliases(["ls"]);
command.action(async (page, opts) => {
    
    let npage = 1;

    if(!!page) {
        npage = Number(page);
    }

    let authors = await api.getAuthors({
        page: npage,
        size: !!opts.size ? opts.size : 10
    });

    if(!authors) {
        console.log(chalk.red("Authors could not be obtained."));
        return;
    }

    if(opts.details) {

        for(let author of authors) {
            console.log();
            console.log(RepresentObjectForConsole(author));
        }

    } else {

        console.log(chalk.green("Found ")+chalk.yellow(authors.length)+chalk.green(" authors!"));

        for(let author of authors) {
            console.log(chalk.green("> ")+chalk.blueBright("Author ")+chalk.yellow(author.name+" ")+chalk.cyan("("+author.id+")"));
        }

    }

});

let command2 = new Command("get");
command2.addArgument(new Argument("<id>", "Numeric id of the user."))
command2.description("Get user from ID");
command2.aliases(["find"]);
command2.action(async (id, opts) => {

    if(Number(id) == NaN) {
        console.log(chalk.red(id+" is an invalid id number."))
        return;
    }

    let author = await api.getAuthorByID(id);

    if(!author) {
        console.log(chalk.red("Author could not be obtained or not found."));
        return;
    }

    console.log(RepresentObjectForConsole(author));

});

export {
    command as AuthorListCoomand,
    command2 as AuthorGetCommand
}