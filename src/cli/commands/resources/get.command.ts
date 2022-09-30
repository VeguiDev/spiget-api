import chalk from 'chalk';
import {Command} from 'commander';
import { SpigetAPI } from '../../../class/SpigetAPI';
import { makeRandomString, RepresentObjectForConsole } from '../../../util/Utils';

const api = new SpigetAPI(makeRandomString(20));

let listCommand = new Command("ls");

listCommand.argument("[page]", "Sets the page to request");
listCommand.option("-s, --size <size>", "Set the size of each page. Default: 10");
listCommand.option("-f, --fields <fields>", "Set the fields that will be retrieved. Format: field1,field2,...");
listCommand.option("-d, --detailed", "Show an detailed response.");

listCommand.action(async (page, opts) => {

    let rpage = 1;

    if(page && Number(page) != NaN) {

        rpage = page;

    } else if(page) {
        console.log(chalk.red(page, " is invalid page number!"))
        return;
    }

    if(opts.size && Number(opts.size) == NaN) {
        console.log(chalk.red(opts.size, " must be a number!"))
        return;
    }

    let fields = null;

    if(opts.fields) {
        opts.detailed = true;

        let splitedFields = opts.fields.split(" ");

        if(splitedFields.length <= 0) {

            console.log(chalk.red("Invalid fields options.")+"\n"+chalk.green("Example: id,name,author"));

            return;
        }

        fields = splitedFields;


    }

    let resources = await api.getResources({
        page: rpage,
        size: !!opts.size ? opts.size : 10,
        fields: !!fields ? fields : undefined
    });

    if(!resources) {
        console.log(chalk.red("Resources could be obtained!"));
        return;
    }

    if(opts.detailed) {
        console.log(RepresentObjectForConsole(resources, 0, true));
    } else {
        
        for(let resource of resources) {

            if(!resource.author) {
                resource.author = resource
            }

            console.log(chalk.green("> ")+chalk.blue("Resource ")+chalk.yellow(resource.name)+" "+chalk.yellowBright("by "+.name)+" "+chalk.cyan("("+resource.id+")"));

        }

    }


});

export {
    listCommand as ResourcesListCommand
}