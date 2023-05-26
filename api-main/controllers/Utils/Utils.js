const {CustomError} = require ('../../errors/CustomError')


function checkArgumentsDefined(...args) {

        for (let i = 0; i < args.length; i++) {
            if (args[i] === undefined || args[i] === "" || args[i] === null ) {
                throw new CustomError(`tous les champs doivent être remplis`, 500);
            }
        }
}
//verifier le typage des arguments
function checkArgumentsType(next,...args) {
        for (let i = 0; i < args.length; i = i+2) {
            if (typeof args[i] !== args[i+1]) {
                console.log("typeof args[i]",typeof args[i],"args[i+1]",args[i+1]);
                throw new CustomError(`tous les champs doivent être du bon type`, 500);
            }
        }
}

module.exports = {checkArgumentsDefined,checkArgumentsType}