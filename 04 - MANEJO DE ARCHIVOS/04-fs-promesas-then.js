const fs = require("fs");

const path = "./file2.txt";

if (fs.existsSync(path)) {
  fs.promises
    .readFile(path, "utf-8")
    .then((info) => {
      console.log(info);
      return fs.promises.appendFile(path, "segundo texto");
    })
    .then(() => console.log("info agregada con exito"))
    .catch((error) => console.log(error));
} else {
  fs.promises
    .writeFile(path, "primer texto, ")
    .then(() => console.log("archivo creado con exito"))
    .catch((error) => console.log(error));
}
/* ------------------------------------ - ----------------------------------- */

const products = [
  {
    name: "Teclado",
    price: 50000,
    stock: 25,
  },
  {
    name: "Mouse",
    price: 50000,
    stock: 50,
  },
];

const pathJSON = "file3.json";

fs.writeFileSync(pathJSON, JSON.stringify(products));
const info = fs.readFileSync(pathJSON, "utf8"); //FORMATO JSON
const infoJS = JSON.parse(info); //FORMATO JAVASCRIPT

console.log(infoJS.filter((x) => x.stock === 50));
