/* ----------------------------- spread operator ---------------------------- */

const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(...array1)

const minimo = Math.min(...array1);
console.log(minimo);

const array2 = [...array1, 11];

console.log(array2);

const object = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

const object2 = {
  ...object,
  e: 5,
};

console.log(object2);

/* ------------------------------ rest operator ----------------------------- */

const myFunc = (a, b, ...otrosParams) => {
  console.log(a);
  console.log(b);
  console.log(otrosParams);
};

myFunc(1, 2, "asd", 5, true, null);
