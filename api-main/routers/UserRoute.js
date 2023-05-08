const express = require('express');
const router = express.Router();
const {showUsers, isInDb, passwordValidation, hash, isEmail, newUser, findUser, generateToken, updateGardenLocation} = require ('../controllers/UserController')
const {authenticate} = require ('../middlewares/AuthMiddleware')
const {PwdConditionError} = require ('../errors')

//-----------------------Users routes ------------------------------------------

//get all users test
router.route('/')
    .get(authenticate,(req,res)=>{
        console.log("userId",req.userId);
        showUsers()
            .then((data)=> res.json(data))
    })

//sign-up
router.route('/sign-up')
    .post(async (req, res, next) => {
        const { password, name, email, city, longitude, latitude } = req.body;
        console.log("password", password);
        console.log("name", name);
        console.log("email", email);
        console.log("city", city);
        console.log("longitude", longitude);
        console.log("latitude", latitude);
        
        try {
            const mailAlreadyInDB = await isInDb(email)
            console.log("mailAlreadyInDB",mailAlreadyInDB)
            const isvalidPassword = await passwordValidation(password)
            if(mailAlreadyInDB.length) {
                //mail already exist in DB
                res.status(400).json({"errorMsg": "Il existe déjà un compte enregistré avec cet Email"})
            }else if( isvalidPassword.valid) { //password validation
                // Hash password
                    const hashPwd = await hash(password);
                //Email validation
                    const isValidEmail = await isEmail(email);
                    if(!isValidEmail ) return res.status(400).send({message: 'Veuillez fournir une adresse e-mail valide.'});
                // Save user in database
                    const saveUser = await newUser(hashPwd, name, email, city, longitude, latitude);

                // Send response
                    res.status(200).json(saveUser);
            }else{
                console.log("isvalidPassword",isvalidPassword.msg);
                throw new PwdConditionError(isvalidPassword.msg)
            }
        } catch (err) {
            console.error(err);
            next(err);
            //res.status(400).json({"errorMsg": err});
        }
    });

router.route('/login')
    .post((req,res) => {
        const { password, email } = req.body;
        try {
            findUser(password,email)
            .then((user) => {
                if(user.length===0) {
                    res.status(401).json({ "errorMsg": 'Email ou mot de passe incorrect' });
                    return
                }
                const token = generateToken(user[0]);
                res.status(200).json({token});
        })
        } catch(err){
            res.status(400).json({"errorMsg":err})
        }
    })
//déconnexion

//save garden position
router.route('/gardenLocation')
    .patch(authenticate,(req,res) => {
        console.log("userId",req.userId);
        const { longitude, latitude } = req.body;
        try{
            const patchGardenLocation = updateGardenLocation(req.userId, longitude, latitude);
            res.status(200).json({patchGardenLocation});
        }
        catch(e){
            res.status(400).json({"errorMsg":err})
        }

    })

//error middleware:
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({message: err.message});
}



// vérification de l'adresse mail lors de l'inscription en envoyant un mail
//piste: nodemailer

//fonctionnalité forgot password

//------------------------valve settings------------------------------------------
//creation de valve setting
//1. creer une valve et récupérer l'ID

//2. creer setting
//router.route('/valveSetting')
    

//get valve setting

module.exports=router;