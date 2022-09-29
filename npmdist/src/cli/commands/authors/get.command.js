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
exports.AuthorGetCommand = exports.AuthorListCoomand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const SpigetAPI_1 = require("../../../class/SpigetAPI");
const Utils_1 = require("../../../util/Utils");
const api = new SpigetAPI_1.SpigetAPI((0, Utils_1.makeRandomString)(10));
let command = new commander_1.Command("list");
exports.AuthorListCoomand = command;
command.addArgument(new commander_1.Argument("[page]", "Page number. Default 1"));
command.option("-d, --details", "Show detailed information of requested object.");
command.option("-s, --size <size>", "Set size of the paginated response.");
command.aliases(["ls"]);
command.action((page, opts) => __awaiter(void 0, void 0, void 0, function* () {
    let npage = 1;
    if (!!page) {
        npage = Number(page);
    }
    let authors = yield api.getAuthors({
        page: npage,
        size: !!opts.size ? opts.size : 10
    });
    if (!authors) {
        console.log(chalk_1.default.red("Authors could not be obtained."));
        return;
    }
    if (opts.details) {
        for (let author of authors) {
            console.log();
            console.log((0, Utils_1.RepresentObjectForConsole)(author));
        }
    }
    else {
        console.log(chalk_1.default.green("Found ") + chalk_1.default.yellow(authors.length) + chalk_1.default.green(" authors!"));
        for (let author of authors) {
            console.log(chalk_1.default.green("> ") + chalk_1.default.blueBright("Author ") + chalk_1.default.yellow(author.name + " ") + chalk_1.default.cyan("(" + author.id + ")"));
        }
    }
}));
let command2 = new commander_1.Command("get");
exports.AuthorGetCommand = command2;
command2.addArgument(new commander_1.Argument("<id>", "Numeric id of the user."));
command2.description("Get user from ID");
command2.aliases(["find"]);
command2.action((id, opts) => __awaiter(void 0, void 0, void 0, function* () {
    if (Number(id) == NaN) {
        console.log(chalk_1.default.red(id + " is an invalid id number."));
        return;
    }
    let author = yield api.getAuthorByID(id);
    if (!author) {
        console.log(chalk_1.default.red("Author could not be obtained or not found."));
        return;
    }
    console.log((0, Utils_1.RepresentObjectForConsole)(author));
}));
