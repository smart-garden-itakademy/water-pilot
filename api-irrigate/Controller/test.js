const { exec } = require('child_process');


const test = () => {
    console.log('test');
    exec('"C:\\Program Files\\Git\\bin\\bash.exe" "D:\\Axel\\formations web\\water-pilot\\api-irrigate\\Controller\\test2.sh"',
    (error, stdout, stderr) => {
        console.log('test');
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });
}

module.exports = {test};