const bcrypt = require('bcrypt')
const userModel = require ('../models/UserModel')

const passwordValidation = (pwd) => {
    let result = false
    if (
        pwd.length >= 8 &&   //length must be greater than 8 characters.
        /[A-Z]/.test(pwd) && // One letter should be capital.
        /\d/.test(pwd) &&    // contain alphanumeric.
        /\W/.test(pwd) &&    // contain a special character (@, $, !, &, etc).
        !/\s/.test(pwd)      // no spaces
    ) {
        console.log("pwdValidation", result);
        return result = true
    }
    console.log("pwdValidation", result);
    return result
}
const hash =  (pwd) => {
    const saltRounds = 10;

    return bcrypt.hash(pwd, saltRounds, (err, hash) => {
        if (err)
            throw (err)

        console.log("H",hash)
        return hash

    });
}

const newUser = (HashPwd, name, email) => {
    userModel.saveNewUser(HashPwd, name, email)
}

module.exports={passwordValidation,hash, newUser}