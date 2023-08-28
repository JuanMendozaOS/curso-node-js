const path = require("node:path");

// unir rutas con path.join
// -> unix /
// -> windows \

console.log(path.sep);

const filePath = path.join("./content", "subfolder", "test.txt");

const base = path.basename("/carpeta/subcarpeta/archivo.txt");

console.log(base);

const filename = path.basename("/carpeta/subcarpeta/archivo.txt", ".txt");

console.log(filename);
