const fs = require("node:fs");
const { promisify } = require("node:util");

const readFile = promisify(fs.readFile);

console.log("Leyendo el primer archivo...");
const text = readFile("./archivo.txt", "utf-8").then((text) => {
  console.log("primer texto: ", text);
});

console.log(text);

console.log("Leyendo el segundo archivo");
const secondText = fs.readFile("./archivo2.txt", "utf-8", (err, text) => {
  console.log("segundo texto: ", text);
});
