const firstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('foo');
    }, 2000);
});

const secondPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Error: some bug');
    }, 2000);
});

const getList = async () => 
    await fetch('https://64d8a86c5f9bf5b879ce6dd9.mockapi.io/api/v1/moviesNow');

const listPromise = getList();

// Promise.all([firstPromise, secondPromise])
//     .then((values) => console.log(values))
//     .catch((error) => console.log(error));


// Promise.allSettled([firstPromise, secondPromise])
//     .then((values) => console.log(values))
//     .catch((error) => console.log(error))
//     .finally(() => console.log('Promise.allSettled is done'));


Promise.all([firstPromise, secondPromise, listPromise])
    .then((values) => console.log('Promise.all results:', values))
    .catch((error) => console.log('Promise.all ', error));

Promise.allSettled([firstPromise, secondPromise, listPromise])
    .then((results) => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index + 1} succeeded with value:`, result.value);
            } else {
                console.error(`Promise ${index + 1} failed with reason:`, result.reason);
            }
        });
    })
    .finally(() => console.log('Promise.allSettled is done'));
