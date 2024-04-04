const mostrarLista1 = (array) => {
    if(!Array.isArray(array)){
        return 'no es un array'
    } 
    if(!array.length) return 'Lista vacia'
    console.log(`La longitud del array es: ${array.length}`);
    return array.map((x) => x)
}

const mostrarLista2 = (array) => {
    if(Array.isArray(array)){
        if(array.length === 0){
            return 'Lista vacia'
        } else {
            console.log(`La longitud del array es: ${array.length}`);
            for (const item of array) {
                  console.log(item)  
            }
        }
    } else return 'no es un array'
}

const mostrarLista3 = (array) => {
    if(Array.isArray(array)){
        console.log(`La longitud del array es: ${array.length}`);
        switch (array.length) {
            case 0:
                return 'Lista vacia'
                break;
            default:
                return array.map((x) => x)
                break;
        }
    } else return 'no es un array'
}

const array = [1,2,3]

console.log(mostrarLista3(array))
                    