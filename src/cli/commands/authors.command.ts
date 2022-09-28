import {Command} from 'commander';
import { AuthorGetCommand, AuthorListCoomand } from './authors/get.command';

let command = new Command("authors");

command.aliases(["author","at"])
command.description("This cli command is used to interact with Authors endpoint of Spiget API Rest.")

command.addCommand(AuthorListCoomand);
command.addCommand(AuthorGetCommand);

export {command as AuthorsCommand};