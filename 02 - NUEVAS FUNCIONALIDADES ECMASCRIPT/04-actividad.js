const objects = [
  {
    manzanas: 3,
    peras: 2,
    carne: 1,
    jugos: 5,
    dulces: 2,
  },
  {
    manzanas: 1,
    sandias: 1,
    huevos: 6,
    jugos: 1,
    panes: 4,
  },
];

const keysNoRepeat = [];

let sumValues = 0;

for (const obj of objects) {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    for (const k of keys) {
        if(!keysNoRepeat.includes(k)){
            keysNoRepeat.push(k);
        }        
    }
    // console.log(keysNoRepeat);
    for (const val of values) {
        sumValues += val;    
    }
}

console.log(keysNoRepeat);
console.log(sumValues);