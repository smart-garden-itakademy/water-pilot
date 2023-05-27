const {CustomError} = require ('../../errors/CustomError')


function checkArgumentsDefined(...args) {

        for (let i = 0; i < args.length; i++) {
            if (args[i] === undefined || args[i] === "" || args[i] === null ) {
                throw new CustomError(`tous les champs doivent être remplis`, 500);
            }
        }
}
//verifier le typage des arguments
function checkArgumentsType(...args) {
        for (let i = 0; i < args.length; i = i+2) {
            if (typeof args[i] !== args[i+1]) {
                throw new CustomError(`tous les champs doivent être du bon type`, 500);
            }
            if (args[i+1]=== "string"){
                //check if string is not a number
               if(!isNaN(parseInt(args[i]))) throw new CustomError(`tous les champs doivent être du bon type`, 500);
            }
            if (args[i+1]=== "number"){
                //check if number is NaN
                if(isNaN(args[i])) throw new CustomError(`tous les champs doivent être du bon type`, 500);
            }
        }
}

module.exports = {checkArgumentsDefined,checkArgumentsType}