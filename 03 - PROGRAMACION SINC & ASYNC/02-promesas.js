const divisionPromesa = (a, b) => {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject("No se puede dividir un nro por 0");
    } else resolve(a / b);
  });
};

divisionPromesa(5, 5)
    .then((resultado)=>console.log(resultado))
    .catch((error)=>console.log(error))


fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error)=>console.log(error))
    .finally(()=>console.log('finalizó el proceso'))