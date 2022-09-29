import {Command} from 'commander';
import { CategoryListCommand } from './category/list.command';

let command = new Command("categories");

command.aliases(["category"])
command.description("This cli command is used to interact with Categories endpoint of Spiget API Rest.")

command.addCommand(CategoryListCommand);

export {command as CategoriesCommand};