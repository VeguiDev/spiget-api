import {Command} from 'commander';
import { CategoryListCommand } from './category/list.command';
import { ResourcesListCommand } from './resources/get.command';

let command = new Command("resources");

command.aliases(["resource", "plugins", "plugin", "pl"])
command.description("This cli command is used to interact with resources endpoint of Spiget API Rest.")

command.addCommand(ResourcesListCommand)

export {command as ResourcesCommand};