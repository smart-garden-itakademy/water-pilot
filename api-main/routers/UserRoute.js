const express = require('express');
const router = express.Router();
const userController = require ('../controllers/UserController')





//-----------------------Users routes ------------------------------------------

//get all users test
router.route('/')
    .get((req,res)=>{
        res.json({
            "name": "BobSmith",
            "email": "bobsmith@example.com",
            "password": "password789",
            "latitude": "45.7808503213175",
            "longitude": "4.736120007422938"
        })
    })

//sign-up
router.route('/sign-up')
    .post((req,res)=>{
        const { password, name, email } = req.body;
        console.log("password",password);
        console.log("name",name);
        console.log("email",email);

        if(userController.passwordValidation(password)){
            //hash
            userController.hash(password)
                .then((HashPwd) => {
                    //save user in database
                    userController.newUser(HashPwd, name, email)
                    //send status 200
                    res.status(200)
                })
                .catch((err)  => console.log(err))
        }else console.log("passwordValid",false)

    })
//check login

//------------------------valve settings------------------------------------------
//creation de valve setting

//get valve setting

//-------------------------get datas-------------------------------------------------
//get irrigations

//get sensors
module.exports=router;