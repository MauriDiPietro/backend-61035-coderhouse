const fs = require('fs')

const path = './file.txt'

if(fs.existsSync(path)){
    const info = fs.readFileSync(path, 'utf-8')
    console.log(info);
    fs.appendFileSync(path, ', chau mundo')
} else fs.writeFileSync(path, 'Hola mundo')