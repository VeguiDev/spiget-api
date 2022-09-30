import chalk from "chalk";
import { Resource } from "../class/Resource";

export function makeRandomString(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export function RepresentObjectForConsole(object: any, spaces?: number, itemNum?:boolean): string {

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

    for (let x = object.length - 1; x >= 0; x--) {
      let item = object[x];

      if(itemNum) {
        finalTxT.push(tspaces+ "- Item #"+(x+1));
      }

      if (typeof item != 'object' && !Array.isArray(item)) {
        finalTxT.push(tspaces + "  " + "- " + item);
      } else {
        finalTxT.push(RepresentObjectForConsole(item, rspaces + 4));
      }

    }

    return finalTxT.join("\n");

  } else {

    if (object.constructor.name && !spaces) {
      console.log(chalk.green("> ") + chalk.blueBright(object.constructor.name));
    }

    let finalTxT = [];

    for (let key of Object.keys(object)) {



      if (key.endsWith("_base64") && object[key.replace(/_base64/g, "")] != undefined) {
        let realKeyName = key.replace(/_base64/g, "");
        let keyContent = object[key.replace(/_base64/g, "")];

        if (typeof keyContent == 'object' || Array.isArray(keyContent)) {
          finalTxT.push(tspaces + "• " + realKeyName + ": ");
          finalTxT.push(RepresentObjectForConsole(keyContent, rspaces + 2));
        } else {
          finalTxT.push(tspaces + "• " + realKeyName + ": " + keyContent);
        }

        continue;
      }

      if (typeof object[key] == 'object') {
        finalTxT.push(tspaces + "• " + key + ": ");
        finalTxT.push(RepresentObjectForConsole(object[key], rspaces + 2));
      } else if (Array.isArray(object[key])) {
        finalTxT.push(object[key].join(chalk.greenBright(",")));
      } else {
        finalTxT.push(tspaces + "• " + key + ": " + object[key]);
      }

    }

    return finalTxT.join("\n");

  }

}