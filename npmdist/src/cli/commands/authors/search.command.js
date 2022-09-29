"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorSearchCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const SpigetAPI_1 = require("../../../class/SpigetAPI");
const Utils_1 = require("../../../util/Utils");
const api = new SpigetAPI_1.SpigetAPI((0, Utils_1.makeRandomString)(10));
let command = new commander_1.Command("search");
exports.AuthorSearchCommand = command;
command.addArgument(new commander_1.Argument("<name>", "Name to search in Spiget."));
command.description("Search user in SpigotAPI");
command.action((name, opts) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof name != 'string') {
        console.log(chalk_1.default.red("Invalid name must be string."));
        return;
    }
    let author = yield api.search("author", {
        query: name,
        field: 'name'
    });
    if (!author) {
        console.log(chalk_1.default.red("Authors could not be obtained or not found."));
        return;
    }
    console.log((0, Utils_1.RepresentObjectForConsole)(author));
}));
