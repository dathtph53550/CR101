const data = ['ca', 'b', 'x', 'y', 'zs', 'aa'];
const newArr = data.sort((a,b) =>{
    if( a < b) {
        return -1;
    }
    return  1;
});
console.log(data)