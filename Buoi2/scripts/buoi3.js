function doSomething(callback) {
    console.log('Bắt đầu');
    // delay 2 giây
    callback();
}
function onSuccess() {
    console.log('Làm gì đó ở đây');
};


function sum(a , b){
    console.log("Tong la" + (a + b));
}
doSomething(() => sum(10,5));