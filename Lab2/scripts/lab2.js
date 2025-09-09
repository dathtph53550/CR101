const class1 = [
    {
        mssv: 'PS0000',
        name: 'Nguyen Van A', avgPoint: 8.9, avgTraningPoint: 7, status: 'pass',
    }, {
        mssv: 'PS0001',
        name: 'Nguyen Van B', avgPoint: 4.9, avgTraningPoint: 10, status: 'pass',
    }];
const class2 = [
    {
        mssv: 'PS0002',
        name: 'Nguyen Van C', avgPoint: 4.9, avgTraningPoint: 10, status: 'failed',
    }, {
        mssv: 'PS0003',
        name: 'Nguyen Van D',
        avgPoint: 10, avgTraningPoint: 10, status: 'pass',
    }, {
        mssv: 'PS0004',
        name: 'Nguyen Van E', avgPoint: 10, avgTraningPoint: 2, status: 'pass',
    },
]


const allStudent = class1.concat(class2).filter((student) => student?.status !== 'failed');

allStudent.sort((a, b) => {
    if (a.avgPoint === b.avgPoint) {
        return b.avgTraningPoint - a.avgTraningPoint;
    }
    return b.avgPoint - a.avgPoint;
});

console.log(allStudent);
console.log('--------------------------')

allStudent.sort((a, b) => {
    if (a.avgTraningPoint === b.avgTraningPoint) {
        return b.avgPoint - a.avgPoint;
    }
    return b.avgTraningPoint - a.avgTraningPoint;
});

console.log(allStudent);
console.log('----------------Ong Vang------------')
console.log(allStudent[0]);

