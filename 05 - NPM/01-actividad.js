const obj = {};
// {
//     1: 
//     2:
//     3:
//     ...20
// }

for (let i = 0; i < 10000; i++) {
    const num = Math.floor(Math.random() * 20) + 1
    if(!obj[num]) {
        obj[num] = 1
    } else {
        obj[num]++
    }
}

// const obj1 = {
//     1: 1,
//     2: 2
// }

// console.log(obj1[2]++);
// console.log(obj1);

console.log(obj);