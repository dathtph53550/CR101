const oldData= [
    {code: 'ab',name: 'Son moi'},
    {code: 'ac',name: 'Sua rua mat'},
    {code: null,name: null},
    {code: null,name: ''}
];
// const newData = {
//     ab: {code: 'ab',name: 'Son moi'},
//     ac: {code: 'ac',name: 'Sua rua mat'}
// }

const parseArrayToObject = ({ array = [], keyId = '' }) => 
    Object.fromEntries(
        array
            .filter((item) => item?.[keyId])
            .map((item) => [keyId ? item?.[keyId] : item, item]) || [],
    );

console.log(parseArrayToObject({array: oldData,keyId: 'code'}));
