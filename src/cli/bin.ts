#!/usr/bin/env node

import {program, Option} from 'commander';
import packageInfo from '../../package.json';
import { AuthorsCommand } from './commands/authors.command';

program.version(packageInfo.version, "-V, --version", "Get current version.");
program.addCommand(AuthorsCommand);

program.parse();