const { exec } = require('child_process');


const valveOn = () => {
    console.log('valve');
    exec('sudo bash "/home/axel/api-irrigate/Controller/valveOn.sh"',
        (error, stdout, stderr) => {
            console.log('valve');
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
}

module.exports = {valveOn};
