exports.print = console.log;
exports.times = (n, cb) => {
    for(let i=0; i<n; i++){
        cb(i);
    }
};