#!/usr/bin/env node

import {program, Option} from 'commander';
import packageInfo from '../../package.json';
import { AuthorsCommand } from './commands/authors.command';

program.addOption(new Option('-V, --version', 'Show library information.'))

program.addCommand(AuthorsCommand);

program.parse();

if(program.opts().version) {
    console.log("v"+packageInfo.version);
}
