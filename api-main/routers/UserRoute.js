const express = require('express');
const router = express.Router();
const userController = require ('../controllers/UserController')


//-----------------------Users routes ------------------------------------------

//get all users test
router.route('/')
    .get(userController.authenticate,(req,res)=>{
        console.log("userId",req.userId);
        userController.showUsers()
            .then((data)=> res.json(data))
    })

//sign-up
router.route('/sign-up')
    .post(async (req, res) => {
        const { password, name, email, city,longitude, latitude } = req.body;
        console.log("password", password);
        console.log("name", name);
        console.log("email", email);
        console.log("city", city);
        console.log("longitude", longitude);
        console.log("latitude", latitude);
        
        try {
            const isInDB = await userController.isInDb(email)
            console.log("isInDb",isInDB.length)
            if(isInDB.length) {
                //mail exist in DB
                res.status(400).json({"msg:": "Il existe déjà un compte enregistré avec cet Email"})
            }else if(
            // mail doesn't exist in DB

            // Validate password
                await userController.passwordValidation(password)) {
                // Hash password
                    const hashPwd = await userController.hash(password);
                //Email validation
                    const isValidEmail = await userController.isEmail(email);
                    if(!isValidEmail ) return res.status(400).send({message: 'Veuillez fournir une adresse e-mail valide.'});
                // Save user in database
                    const saveUser = await userController.newUser(hashPwd, name, email, city, longitude, latitude);

                // Send response
                    res.status(200).json(saveUser);
            }

        } catch (err) {
            console.error(err);
            res.status(400).json({
                errorMsg: 'Une erreur est survenue',
                error: err.message
            });
        }
    });

router.route('/login')
    .post((req,res) => {
        const { password, email } = req.body;
        try {
                userController.findUser(password,email)
        .then((user) => {
            if(user.length===0) {
                res.status(401).json({ message: 'Email ou mot de passe incorrect' });
                return
            }
            const token = userController.generateToken(user[0]);
            res.status(200).json({token});
        })
        } catch(err){
            res.status(400).json(err)
        }
    })
//déconnexion

//save garden position
router.route('/gardenLocation')
    .patch(userController.authenticate,(req,res) => {
        console.log("userId",req.userId);
        const { longitude, latitude } = req.body;
        const patchGardenLocation = userController.updateGardenLocation(req.userId, longitude, latitude)
    })

// vérification de l'adresse mail lors de l'inscription en envoyant un mail

//fonctionnalité forgot password

//------------------------valve settings------------------------------------------
//creation de valve setting
//1. creer une valve et récupérer l'ID
//2. creer setting 

//get valve setting
<<<<<<< HEAD


=======
>>>>>>> myBranch
module.exports=router;