const express = require('express');
const router = express.Router();
const userController = require ('../controllers/UserController')


//-----------------------Users routes ------------------------------------------

//get all users test
router.route('/')
    .get((req,res)=>{
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
            if(userController.isInDb(email)) res.status(400).json({"msg:":"Il existe déjà un compte enregistré avec cet Email"})
            if(
            // Validate password
            await userController.passwordValidation(password)) {
                // Hash password
                const hashPwd = await userController.hash(password);

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
    .get((req,res) => {
        const { password, email } = req.body;
        try {
                userController.findUser(password,email)
                .then((isExist) => {
                   isExist ? res.status(200).json(isExist) : res.status(400).json(isExist);
                })
        } catch(err){
            res.status(400).json(err)
        }
    })
//save garden position


//------------------------valve settings------------------------------------------
//creation de valve setting

//get valve setting


module.exports=router;