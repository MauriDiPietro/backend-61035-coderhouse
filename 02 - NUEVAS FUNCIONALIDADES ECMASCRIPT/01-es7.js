//ES6
const expMath = Math.pow(2, 3);

//ES7
const exponente = 2 ** 3;

console.log(expMath);
console.log(exponente);

/* ------------------------------------ - ----------------------------------- */

//includes

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("existe dentro del array", array.includes(5));
console.log("no existe dentro del array", array.includes(11));

const personas = [
  { nombre: "Juan", edad: 25 },
  { nombre: "María", edad: 30 },
  { nombre: "Pedro", edad: 35 },
];

// const edadBuscada = 30
// const existePersonaConEdad = personas.some((persona) => {
//     return persona.edad === edadBuscada
// })

// console.log(existePersonaConEdad);

// const edadBuscada = 30
// const existePersonaConEdad = personas.find((persona) => {
//     return persona.edad === edadBuscada
// })

// console.log(existePersonaConEdad);