const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multiplicacion = (a, b) => a * b;
const division = (a, b) => a / b;

const operaciones = (a, b, callback) => {
    return callback(a,b)
}

console.log(operaciones(5, 5, division));

/* ------------------------------------ - ----------------------------------- */

setTimeout(()=>{
    console.log('este mensaje se muestra después de 3 segundos');
}, 3000)
