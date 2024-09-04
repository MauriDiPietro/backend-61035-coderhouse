const hola = (name: string) =>{
    console.log(`Hola ${name}`);
}

hola('pedro')

/* ------------------------------------ - ----------------------------------- */

let variable: string = 'Hola';
let variable2: string | undefined;
let variable3: number | undefined;
let variable4: null | undefined;
let variable5: undefined;
let variable6: boolean | undefined;

const saludo = (param1: string, param2: number): number | string =>{
    const value = true
    if(value) return param1
    return param2
}

interface Usuario {
    first_name: string;
    last_name: string;
    age: number;
    email: string;
};

const arrayUsers: Usuario[] = [];

const objeto: Usuario = {
    first_name: "sdfsd",
    last_name: "dsfsf",
    age: 15,
    email: "strdsfss@ing",
}