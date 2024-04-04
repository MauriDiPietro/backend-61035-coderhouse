const usuarios = [
   {
    nombre: 'Nicolas',
    edad: 25,
    series: ['Breaking Bad', 'El Encargado']
   },
   {
    nombre: 'Dylan',
    edad: 26,
    series: ['Casados con hijos', 'Game of Thrones']
   }
];

// usuarios.forEach((user)=>{
//     user.edad++, user.series.push('Friends')
// })

for (const user of usuarios) {
    user.edad++, user.series.push('Friends')
}

console.log(usuarios);