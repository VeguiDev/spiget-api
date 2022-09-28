import chalk from "chalk";

export function makeRandomString(length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

export function RepresentObjectForConsole(object:any, spaces?:number):string {

  let rspaces = 0;

  if(spaces) {
    rspaces = spaces;
  }

  let tspaces = "";

  for(let x = 0; x < rspaces; x++) {
    tspaces+=" ";
  }

  if(object.constructor.name && !spaces) {
    console.log(chalk.green("> ")+chalk.blueBright(object.constructor.name));
  }

  let finalTxT = [];

  for(let key of Object.keys(object)) {

    if(typeof object[key] == 'object') {
      finalTxT.push(RepresentObjectForConsole(object[key], rspaces+2));
    } else if(Array.isArray(object[key])) {
      finalTxT.push(object[key].join(chalk.greenBright(",")));
    } else {
      finalTxT.push(tspaces+"• "+key+": "+ object[key]);
    }

  }

  return finalTxT.join("\n");

}