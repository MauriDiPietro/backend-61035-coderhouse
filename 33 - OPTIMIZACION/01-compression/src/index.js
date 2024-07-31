import serverCompress from './servers/serverCompress.js';
import serverNormal from './servers/serverNormal.js';

serverNormal.listen(8080, () =>
  console.log(`Servidor Normal escuchando en puerto 8080`)
);

serverCompress.listen(8081, () =>
  console.log(`Servidor Compress escuchando en puerto 8081`)
);
