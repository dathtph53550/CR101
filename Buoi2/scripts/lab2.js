function testNum(a){
    let result;
    if(a > 0){
        result = "So Duong";
    }
    else{
        result = "Khong phai so duong";
    }
    
    return result;
}

console.log(testNum(5));
console.log(testNum(-5));

function getFee(isMember) {
    return isMember ? '$2.00' : '$10.00';
}
console.log("Phi thanh vien la: " + getFee(true));
console.log("Phi khong phai thanh vien la: " + getFee(false));
console.log("Phi thanh vien la: " + getFee(null));


const expr = 'Cam';
switch (expr) {
    case 'Tao':
        console.log('Oranges are $0.59 a pound.');
        break;
    case 'Cam':
    case 'Buoi':
        console.log('Cam va Buoi gia 20,000/kg');
        break;
    default:
        console.log(`Xin loi, chung toi khong co gia ${expr}.`);
}

for (let step = 0; step < 5; step++) {
    console.log("Đi bộ mỗi bước về phía đông, bước thứ ",
    step + 1);
}

const dumpProps = (obj, objName) => {
    let result = "";
    for (const i in obj) {
        result += `${objName}.${i} = ${obj[i]}\n`
    }
    console.log(result)
}
const myCar = {make: "Ford", model: "Mustang"}
dumpProps(myCar, "car")


const arr = 'HelloWorldJS';
console.log("Do dai cua mang la:"  + arr.length);

const arr1 = ['a', 'b', 'c'];
const arr2 = ['d', 'e', 'f'];
const arr3 = arr1.concat(arr2);

console.log(arr3)


const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction',
'present'];
const result = words.filter((word) => word.length > 6);

console.log(result);


const array1 = [5, 12, 8, 130, 44];
const found = array1.find((element) => element > 10);
const found2 = array1.find((element) => element > 10000);
console.log(found);
console.log(found); 

const arrayy1 = [1, 4, 9, 16];
const map1 = arrayy1.map((x) => x * 2);
console.log(map1);

const mang1 = ['a', 'b', 'c'];
mang1.forEach((element) => console.log(element));

const userList = null;
userList?.map?.((user) => console.log("Lam gi o do day"));


const object1 = { a: 'somestring', b: 42 };
for (const [key, value] of Object.entries(object1)) {
console.log(`${key}: ${value}`);
}
// Kết quả:
// "a: somestring"
// "b: 42"

const obj1 = {
    a: 'somestring',
    b: 42,
    c: false,
};
console.log(Object.keys(object1));


