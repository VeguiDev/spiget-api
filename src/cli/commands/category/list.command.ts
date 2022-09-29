import chalk from "chalk";
import { Command, Argument } from "commander";
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

    let categories = await api.getCategories({
        page: npage,
        size: !!opts.size ? opts.size : 10
    });

    if(!categories) {
        console.log(chalk.red("Categories could not be obtained."));
        return;
    }

    if(opts.details) {

        for(let category of categories) {
            console.log();
            console.log(RepresentObjectForConsole(category));
        }

    } else {

        console.log(chalk.green("Found ")+chalk.yellow(categories.length)+chalk.green(" categories!"));

        for(let category of categories) {
            console.log(chalk.green("> ")+chalk.blueBright("Category ")+chalk.yellow(category.name+" ")+chalk.cyan("("+category.id+")"));
        }

    }

});

export {command as CategoryListCommand};