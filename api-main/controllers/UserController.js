const bcrypt = require('bcrypt')
const userModel = require ('../models/UserModel')

const passwordValidation = (pwd) => {
    let result = false
    /*if(pwd.length >= 8) console.log("pwd length > 8");
    if(/[A-Z]/.test(pwd)) console.log("pwd contain One letter is capital");
    if(/\d/.test(pwd)) console.log("pwd contain alphanumeric");
    if( /\W/.test(pwd)) console.log("pwd contain a special character");
    if( /\W/.test(pwd)) console.log("pwd contain no spaces");*/
    if (
        pwd.length >= 8 &&   //length must be greater than 8 characters.
        /[A-Z]/.test(pwd) && // One letter should be capital.
        /\d/.test(pwd) &&    // contain alphanumeric.
        /\W/.test(pwd) &&    // contain a special character (@, $, !, &, etc).
        !/\s/.test(pwd)      // no spaces
    ) {
        result = true
        console.log("pwdValidation", result);
        return result
    }
    console.log("pwdValidation", result);
    return result
}
const hash =  (pwd) => {
    const saltRounds = 10;

    return new Promise ((resolve,reject)  => {
        bcrypt.hash(pwd, saltRounds, (err, hash) => {
            if (err){
                throw (err);
                reject(err)
            }
            console.log("H",hash);
            resolve(hash)
        });
    })
}

const newUser = (HashPwd, name, email) => {
    return userModel.saveNewUser(HashPwd, name, email)
}

const showUsers = () => {
    return userModel.getUsers()
}

module.exports={passwordValidation,hash, newUser, showUsers}