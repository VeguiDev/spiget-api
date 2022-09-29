#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = __importDefault(require("../../package.json"));
const authors_command_1 = require("./commands/authors.command");
const category_command_1 = require("./commands/category.command");
commander_1.program.version(package_json_1.default.version, "-V, --version", "Get current version.");
commander_1.program.addCommand(authors_command_1.AuthorsCommand);
commander_1.program.addCommand(category_command_1.CategoriesCommand);
commander_1.program.parse();
