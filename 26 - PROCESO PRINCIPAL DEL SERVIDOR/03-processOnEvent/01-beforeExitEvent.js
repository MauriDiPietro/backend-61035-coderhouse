//se ejecuta cuando node no tiene mas tareas para ejecutar

process.on('beforeExit', (code) => {
  console.log(`BeforeExit ==> El proceso termino con codigo ${code}`);
});

console.log('EJECUTANDO MI PROGRAMA');

// process.exit()