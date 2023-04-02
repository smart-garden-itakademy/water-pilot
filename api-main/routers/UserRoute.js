const express = require('express');
const router = express.Router();
const userController = require ('../controllers/UserController')

//-----------------------Users routes ------------------------------------------
//sign-up
router.route('/sign-up')
    .post((req,res)=>{

        const { password: pwd, name, email } = req.body;

        if(userController.passwordValidation(pwd)){
            //hash
            userController.hash(pwd)
                .then((HashPwd) => {
                    //save user in database
                    userController.newUser(HashPwd, name, email)
                    //send status 200
                    res.status(200)
                })
        }
        //check password
        //post user
        //redirige page d'accueil

    })
//check login

//------------------------valve settings------------------------------------------
//creation de valve setting

//get valve setting

//-------------------------get datas-------------------------------------------------
//get irrigations

//get sensors
