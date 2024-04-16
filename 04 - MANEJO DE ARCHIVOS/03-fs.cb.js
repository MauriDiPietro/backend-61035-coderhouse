const fs = require('fs')

const path = './fileCB.txt'

if(fs.existsSync(path)){
    fs.readFile(path, 'utf-8', (error, info)=>{
        if(error){
            console.log(error);
        } else {
            console.log(info);
        }
    })
}
fs.appendFile(path, 'segundo texto', (error, info)=>{
    if(error){
        console.log(error);
    } else {
        console.log('info agregada con exito');
    }
    fs.readFile(path, 'utf-8', (error, info)=>{
        if(error) {
            console.log(error);
        } else {
            console.log(info);
        }
    })
})