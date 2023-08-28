// argumentos de entrada
// console.log(process.argv);

const process = require("node:process");
// eventos del proceso
process.on('exit', () => {
  //console.log("onExit");
})

// current working directory
//console.log(process.cwd());

console.log(process.env.PEPITO);