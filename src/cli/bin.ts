#!/usr/bin/env node

import {program, Option} from 'commander';
import packageInfo from '../details.json';
import { AuthorsCommand } from './commands/authors.command';
import { CategoriesCommand } from './commands/category.command';

program.version(packageInfo.version, "-V, --version", "Get current version.");
program.addCommand(AuthorsCommand);
program.addCommand(CategoriesCommand);

program.parse();