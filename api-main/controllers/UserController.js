const bcrypt = require('bcrypt');
const {findUserInDb,saveNewUser,getUsers,updateLocation,deleteUserInDb} = require ('../models/UserModel');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const {CustomError} = require ('../errors/CustomError')


function checkArgumentsDefined(...args) {
    let arrayError=[];
    for (let i = 0; i < args.length; i++) {
        if (args[i] === undefined || args[i] === "" || args[i] === null) {
            arrayError.push(`tous les champs doivent être remplis`);
        }
    }
    console.log("arrayError",arrayError);
    if (arrayError.length){
        throw new CustomError(arrayError.join(","), 500);
    }
}
const generateToken = (user) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10d' });
    return token;
}
const deleteUser = async (userId) => {
    try{
        const deleteU = await deleteUserInDb(userId);
        return deleteU
    }catch (e){
        throw new CustomError("Unable to delete the user",500)
    }
}
const passwordValidation = (pwd) => {

    let response = [];
    if (! pwd.length >= 8)  response.push("le password doit contenir au moins 8 caractères.");
    if (! /[A-Z]/.test(pwd)) response.push("le password doit contenir une majuscule.") ;
    if (! /\d/.test(pwd)) response.push("le password doit contenir un chiffre.") ;
    if (! /\W/.test(pwd)) response.push("le password doit contenir un caractère spécial (@, $, !, &, etc).") ;
    if ( /\s/.test(pwd)) response.push("le password ne doit pas contenir d'espace.");

    if (response.length != 0) {
        throw new CustomError(response.join(","),500)
    }
    return true
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
    if(isMailAlreadyInDb.length){
        throw new CustomError("Cet email est déjà utilisé",500);
    }
    return isMailAlreadyInDb
}catch (e){
    throw new CustomError("Erreur lors de la recherche de l'utilisateur",500)
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
const isEmailValid = (email) => {
    if (!validator.isEmail(email)) {
        throw new CustomError("Veuillez fournir une adresse e-mail valide.",500)
    } else return true
}
const showUsers = async () => {
    try{
        return getUsers()
    }
    catch (error){
        console.log(error)
        throw new CustomError("Erreur lors de la recherche des utilisateurs"+error,500)
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
            }else throw new CustomError ('Email ou mot de passe incorrect',500);
        }else throw new CustomError ('Email ou mot de passe incorrect',500);

    }
    catch (e){
        console.error(e);
        throw new CustomError(e,500);
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

module.exports={passwordValidation,hash, newUser, showUsers, findUser, isInDb, generateToken, updateGardenLocation, isEmailValid,deleteUser,checkArgumentsDefined}