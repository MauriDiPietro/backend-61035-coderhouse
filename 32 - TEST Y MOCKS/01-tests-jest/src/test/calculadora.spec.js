import Calc from "../calculadora.js";

describe('conjunto de pruebas de calculadora', () => {
    it('Deberia suma dos numeros', ()=>{
        //etapa de preparacion
        const num1 = 5;
        const num2 = 10;
        const resultadoEsperado = 15;

        //etapa de ejecucion
        const resultado = Calc.suma(num1, num2);

        //etapa de verificacion
        expect(resultado).toBe(resultadoEsperado);
    })

    it('si algun parametro no es numerico deberia responder con un error', ()=>{
        const num1 = 5;
        const num2 = ["hola"];

        const funcionTest = () => Calc.suma(num1, num2);

        expect(funcionTest).toThrow('Argumentos invalidos')
    })

    // it('', ()=>{})
})