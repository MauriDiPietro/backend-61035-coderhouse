const value = 8

const example = () => {
    let data = [1,2,3,4,5]
    return data.filter(item => item < value)
}

console.log(example());