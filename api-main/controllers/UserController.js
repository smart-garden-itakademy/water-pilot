const bcrypt = require('bcrypt');
const {findUserInDb,saveNewUser,getUsers,updateLocation} = require ('../models/UserModel');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const generateToken = (user) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10d' });
    return token;
}

const passwordValidation = (pwd) => {
    /*let result = false
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
    return result*/
    let response = {
        msg:[],
        valid : false
    }
    if (! pwd.length >= 8)  response.msg.push("length must be greater than 8 characters.");
    if (! /[A-Z]/.test(pwd)) response.msg.push("One letter should be capital.") ;
    if (! /\d/.test(pwd)) response.msg.push("contain alphanumeric.") ;
    if (! /\W/.test(pwd)) response.msg.push("contain a special character (@, $, !, &, etc).") ;
    if (! /\s/.test(pwd)) response.msg.push("no spaces");

    if (response.msg.length == 0) {
        response.valid = true
    }
    return response
}
const hash =  (pwd) => {
    const saltRounds = 10;
console.log('inH')
    return new Promise ((resolve,reject)  => {
        bcrypt.hash(pwd, saltRounds, (err, hash) => {
            if (err){
                console.log("h",err);
                throw (err);
                reject(err)
            }
            console.log("H",hash);
            resolve(hash)
        });
    })
}
const isInDb = async (mail) => {
try {

    const isMailAlreadyInDb = await findUserInDb(mail);

    console.log("isMailAlreadyInDb",isMailAlreadyInDb);
    return isMailAlreadyInDb
}catch (e){
    console.error(e)
    return false
}
}
const newUser = async (hashPwd, name, email, city, longitude, latitude) => {
    try{
        //add user
        const addUser = await saveNewUser(hashPwd, name, email, city, longitude, latitude);
        return addUser
    }
    catch (error){
        console.error("Erreur lors de l'enregistrement :", error);
        return null;
    }
}
const isEmail = (email) => {
    if (!validator.isEmail(email)) {
        return false
    } else return true
}
const showUsers = async () => {
    try{
        return getUsers()
    }
    catch (error){
        console.error("Erreur lors de la recherche des utilisateurs :", error);
        return null;
    }
}
const findUser = async (Pwd,email) => {
    try{
        const user = await findUserInDb(email);
        console.log("user",user);
        if(user){
            const match = await bcrypt.compare(Pwd, user[0].password);
            if(match) {
                return user
            }else {
                throw new Error ("wrong password");
            }
        }else{
            throw new Error ("wrong mail");
        }
    }
    catch (e){
        console.error(e);
        return false;
    }
}
const updateGardenLocation = async (userId, longitude, latitude) => {
    try{
        const updateLocation =await updateLocation(userId, longitude, latitude);
        console.log(updateLocation);
    }catch(e){
        throw new Error("Unable to modify the garden's coordinates.Errormsg:"+e)
    }
}

module.exports={passwordValidation,hash, newUser, showUsers, findUser, isInDb, generateToken, updateGardenLocation, isEmail}