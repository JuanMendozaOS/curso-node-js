const os = require("node:os");

console.log("Información del sistema operativo:");
console.log("----------------------------------");

console.log("OS: ", os.platform());
console.log("Versión OS: ", os.release());
console.log("Arquitectura: ", os.arch());
console.log("CPUs: ", os.cpus());
console.log("Memoria total: ", os.freemem() / 1024 / 1024);
console.log("Uptime: ", os.uptime() / 60 / 60);
