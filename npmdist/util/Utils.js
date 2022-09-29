"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepresentObjectForConsole = exports.makeRandomString = void 0;
const chalk_1 = __importDefault(require("chalk"));
function makeRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
exports.makeRandomString = makeRandomString;
function RepresentObjectForConsole(object, spaces) {
    let rspaces = 0;
    if (spaces) {
        rspaces = spaces;
    }
    let tspaces = "";
    for (let x = 0; x < rspaces; x++) {
        tspaces += " ";
    }
    if (Array.isArray(object)) {
        let finalTxT = [];
        for (let x = object.length; x >= 0; x--) {
            let item = object[x];
            finalTxT.push("");
            finalTxT.push(tspaces + "- Item #" + (x + 1) + "\n");
            if (typeof item == 'string' || typeof item == 'boolean') {
                finalTxT.push(tspaces + "- " + item);
            }
            if (typeof item == 'object') {
                finalTxT.push(RepresentObjectForConsole(item, rspaces + 2));
            }
            else {
                finalTxT.push(tspaces + "- " + item);
            }
        }
        return finalTxT.join("\n");
    }
    else {
        if (object.constructor.name && !spaces) {
            console.log(chalk_1.default.green("> ") + chalk_1.default.blueBright(object.constructor.name));
        }
        let finalTxT = [];
        for (let key of Object.keys(object)) {
            if (typeof object[key] == 'object') {
                finalTxT.push(tspaces + "• " + key + ": ");
                finalTxT.push(RepresentObjectForConsole(object[key], rspaces + 2));
            }
            else if (Array.isArray(object[key])) {
                finalTxT.push(object[key].join(chalk_1.default.greenBright(",")));
            }
            else {
                finalTxT.push(tspaces + "• " + key + ": " + object[key]);
            }
        }
        return finalTxT.join("\n");
    }
}
exports.RepresentObjectForConsole = RepresentObjectForConsole;
