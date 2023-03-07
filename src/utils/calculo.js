const calculo = () => {
    let sum = 0;
    for (let i = 0; i < 6e9; i++) {
        sum += i;
    }
    return sum
};

process.on('message', (obj) => {
    console.log(obj);
    if (obj.msg == 'start') {
        console.log('Start Calculo');
        const sum = calculo();
        process.send(sum);
    }

})
