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
    .post((req, res) => {
        const { password, name, email } = req.body;
        console.log("password", password);
        console.log("name", name);
        console.log("email", email);

        if (userController.passwordValidation(password)) {
            //hash
            userController.hash(password)
                .then((HashPwd) => {
                    //save user in database
                    return userController.newUser(HashPwd, name, email)
                })
                .then((data) => {
                    //send status 200
                    res.status(200).json(data)
                })
                .catch((err) => res.status(400).json(err))
        } else console.log("passwordValid", false)

    })
//check login

//------------------------valve settings------------------------------------------
//creation de valve setting

//get valve setting
module.exports=router;