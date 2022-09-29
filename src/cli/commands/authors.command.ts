import {Command} from 'commander';
import { AuthorGetCommand, AuthorListCoomand } from './authors/get.command';
import { AuthorSearchCommand } from './authors/search.command';

let command = new Command("authors");

command.aliases(["author"])
command.description("This cli command is used to interact with Authors endpoint of Spiget API Rest.")

command.addCommand(AuthorListCoomand);
command.addCommand(AuthorGetCommand);
command.addCommand(AuthorSearchCommand);

export {command as AuthorsCommand};