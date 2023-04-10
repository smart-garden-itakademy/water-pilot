const bcrypt = require('bcrypt');
const userModel = require ('../models/UserModel');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const generateToken = (user) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10d' });
    return token;
}
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}
// middleware qui protège les routes qui nécessite une authentification
const authenticate = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        res.status(401).json({ message: 'Token non fourni' });
        return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        res.status(401).json({ message: 'Token invalide' });
        return;
    }
    req.userId = decoded.id;
    next();
}
const passwordValidation = (pwd) => {
    let result = false
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
    const checkMail = await userModel.isUserMailExist(mail);
    return checkMail
}catch (e){
    console.error(e)
    return false
}
}
const newUser = async (hashPwd, name, email, city, longitude, latitude) => {
    try{
        //add user
        const addUser = await userModel.saveNewUser(hashPwd, name, email, city, longitude, latitude);
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
        return userModel.getUsers()
    }
    catch (error){
        console.error("Erreur lors de la recherche des utilisateurs :", error);
        return null;
    }
}
const findUser = async (Pwd,email) => {
    try{
        const user = await userModel.isUserMailExist(email);
        console.log("user",user);
        if(user.length){
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
        const updateLocation =await userModel.updateLocation(userId, longitude, latitude);
        console.log(updateLocation);
    }catch(e){
        throw new Error("Unable to modify the garden's coordinates.Errormsg:"+e)
    }
}


module.exports={passwordValidation,hash, newUser, showUsers, findUser, isInDb, generateToken, verifyToken, authenticate, updateGardenLocation, isEmail}