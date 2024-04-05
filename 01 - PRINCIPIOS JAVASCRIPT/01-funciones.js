function saludar1(nombre) {
  return `Hola ${nombre}`;
}

const saludar2 = (nombre) => {
  return `Hola ${nombre}`;
};

const saludar3 = (nombre) => `hola ${nombre}`;

console.log(saludar1("Juan"));
console.log(saludar2("Rodrigo"));

/* ------------------------------------ - ----------------------------------- */

const array = [1, 2, 3, 4];

const array1 = array.filter((x) => x > 2);

const array2 = array.filter((x) => {
  return x > 2;
});

const array3 = array.filter(function (x) {
  return x > 2;
});

console.log(array1);

/* ------------------------------------ - ----------------------------------- */

// let num = 0

const func1 = () => {
  let num = 1;
  console.log(num);
};

// console.log(num);

func1();

/* ------------------------------------ - ----------------------------------- */

let nombre1 = "Juan";
let edad1 = 30;
let msj = "Mi nombre es " + nombre1 + ", tengo " + edad1 + " años";
console.log(msj);

let nombre2 = "Carlos";
let edad2 = 30;
let msj2 = `Mi nombre es ${nombre2} y tengo ${edad2} años`;
console.log(msj2);

const msjMultilinea = `
Éste es un ejemplo
de un mensaje
en varias lineas
`;

console.log(msjMultilinea);