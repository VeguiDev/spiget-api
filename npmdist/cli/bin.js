#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
// import packageInfo from '../../package.json';
const authors_command_1 = require("./commands/authors.command");
const category_command_1 = require("./commands/category.command");
// program.version(packageInfo.version, "-V, --version", "Get current version.");
commander_1.program.addCommand(authors_command_1.AuthorsCommand);
commander_1.program.addCommand(category_command_1.CategoriesCommand);
commander_1.program.parse();
