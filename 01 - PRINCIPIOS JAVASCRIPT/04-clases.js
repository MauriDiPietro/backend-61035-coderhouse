class Persona {
    constructor(nombre){
        this.nombre = nombre;
    }

    static variableEstatica = 'variable'

    getNombre(){
        return this.nombre;
    }
}

const instancia1 = new Persona('Juan');
const instancia2 = new Persona('Pedro');

console.log(instancia1.getNombre());
console.log(instancia2.getNombre());