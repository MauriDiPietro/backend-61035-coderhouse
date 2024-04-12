const divisionPromesa = (a, b) => {
    return new Promise((resolve, reject) => {
      if (b === 0) {
        reject("No se puede dividir un nro por 0");
      } else resolve(a / b);
    });
  };

  const divisionAsync = async(a,b) =>{
    try {
        return await divisionPromesa(a,b)
    } catch (error) {
        console.log(error);
    }
  }

  const test = async() =>{
      console.log(await divisionAsync(5,0))
  }

  test()

/* ------------------------------------ - ----------------------------------- */

const error = true;

const getData = () => {
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            if(!error) resolve('datos recibidos');
            else reject('error al obtener los datos')
        }, 8000)
    })
}

const getDatos = async() => {
    try {
        console.log(await getData());
    } catch (error) {
        console.log(error);
    }
}

getDatos()

/* ------------------------------------ - ----------------------------------- */

const getApi = async() => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        console.log(await response.json());
    } catch (error) {
        console.log(error);
    }
}

getApi()

/* ------------------------------------ - ----------------------------------- */

const getDataUser = async(username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        console.log(await response.json());
    } catch (error) {
        console.log(error);
    } finally {
        console.log('finalizó el proceso');
    }
}

getDataUser('MauriDiPietro')
  