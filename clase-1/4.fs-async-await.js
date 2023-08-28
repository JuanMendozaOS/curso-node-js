const { readFile } = require("node:fs/promises");

// IIFE - Inmediately Invoked Function Expression
// Utilizado para poder utilizar async/await en el cuerpo de del archivo,
// con commonJS
(async () => {
  console.log("Leyendo el primer archivo...");
  const text = await readFile("./archivo.txt", "utf-8");

  console.log("primer texto: ", text);

  console.log("Leyendo el segundo archivo");
  const secondText = await readFile("./archivo2.txt", "utf-8", (err, text) => {
    console.log("segundo texto: ", text);
  });
})();
