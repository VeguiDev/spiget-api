import {Command} from 'commander';
import { CategoryListCommand } from './category/list.command';

let command = new Command("resources");

command.aliases(["resource", "plugins", "plugin", "pl"])
command.description("This cli command is used to interact with resources endpoint of Spiget API Rest.")


export {command as ResourcesCommand};