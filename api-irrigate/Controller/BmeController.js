const { execSync } = require('child_process');

// Fonction pour exécuter le script Python et récupérer les valeurs renvoyées
function readBME280() {
    try {
        const output = execSync('sudo python3 bme.py');
        const values = output.toString().trim().split(',');
        const temperature = parseFloat(values[0]);
        const pressure = parseFloat(values[1]);
        const humidity = parseFloat(values[2]);
        console.log(`Temperature: ${temperature} C`);
        console.log(`Pressure: ${pressure} hPa`);
        console.log(`Humidity: ${humidity} %`);
        return { temperature, pressure, humidity };
    } catch (error) {
        console.error(error);
        return null;
    }
}



module.exports = { readBME280 };