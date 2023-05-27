const express = require('express');
const router = express.Router();
const {isUserExist,checkArgumentsDefined,getUsers, isInDb, passwordValidation, hash, isEmailValid, newUser, findUser, generateToken, updateGardenLocation,deleteUser} = require ('../controllers/UserController')
const {authenticate} = require ('../middlewares/AuthMiddleware')
const {CustomError} = require ('../errors/CustomError')

//-----------------------Users routes ------------------------------------------
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Récupère la liste de tous les utilisateurs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: La liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       401:
 *         description: Non autorisé
 */
//get all users test
router.route('/')
    .get(authenticate, async (req, res, next) => {
        try {
            const users = await getUsers();
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    });
//TODO: tester la route delete user apres avoir refait la db avec ON DELETE CASCADE
//TODO: ajouter un role admin pour pouvoir supprimer un utilisateur
router.route('/:id')
    .delete(authenticate, async (req, res, next) => {
        try {
            const userId = parseInt(req.params.id);
            if(isNaN(userId)) return next(new CustomError("Invalid user id", 500));
            //TODO: check if user exist
            const isUserInDb = await isUserExist(userId);
            if(!isUserInDb) next (new CustomError ("Cet utilisateur n'existe pas",500));
            await deleteUser(userId);
            res.status(200).json({message: "Utilisateur supprimé"});
        } catch (err) {
            next(err);
        }
    });
//TODO: patch user
//TODO: patch password

//sign-up
/**
 * @swagger
 * /user/sign-up:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *               longitude:
 *                 type: number
 *               latitude:
 *                 type: number
 *     responses:
 *       200:
 *         description: Le compte de l'utilisateur a été créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Une erreur est survenue lors de la création du compte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cause:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cause:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 */
router.route('/sign-up')
    .post(async (req, res, next) => {
        const { password, name, email, city, longitude, latitude } = req.body;
        console.log("reqBody",req.body);

        try {
            checkArgumentsDefined(password, name, email, city, longitude, latitude);

            //vérifier que tous les champs sont renseignés sinon renvoyer une erreur
            // if(password === undefined) return next( new CustomError("Veuillez renseigner le password",500));
            // if(name === undefined ) return next(new CustomError("Veuillez renseigner le nom",500));
            // if(email === undefined ) return next(new CustomError("Veuillez renseigner l'email",500));
            // if(city === undefined || !isNaN(Number(city))) return next(new CustomError("Veuillez renseigner la ville",500));
            // if(longitude === undefined || isNaN(Number(longitude))) return next(new CustomError("Veuillez renseigner la longitude",500));
            // if(latitude === undefined || isNaN(Number(latitude))) return next(new CustomError("Veuillez renseigner la latitude",500));

            await isInDb(email); //check if email is already in db
            passwordValidation(password); //password validation
            const hashPwd = await hash(password);//hash password
            jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '10d'}).sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '10d'})(email);//check if email is valid
            // Save user in database
            const saveUser = await newUser(hashPwd, name, email, city, longitude, latitude);
            // Send response
            res.status(200).json({message: 'Votre compte a bien été créé !'});
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.route('/login')
    .post(async (req, res, next) => {
        try {
            const { password, email } = req.body;
            checkArgumentsDefined(password, email);

            const user = await findUser(password, email)
            const token = generateToken(user[0]);
            res.status(200).json({token});
        } catch(err) {
            next(err);
        }
    });


//save garden position
router.route('/gardenLocation')
    .patch(authenticate, async (req,res, next) => {
        try {
            const { longitude, latitude } = req.body;
            if(longitude === undefined ) return next(new CustomError("Veuillez renseigner la longitude", 400));
            if(latitude === undefined) return next(new CustomError("Veuillez renseigner la latitude", 400));

            const patchGardenLocation = await updateGardenLocation(req.userId, longitude, latitude);
            res.status(200).json({patchGardenLocation});
        } catch(e) {
            next(e);
        }
    });

//error middleware:
// function errorHandler(err, req, res, next) {
//     console.error(err);
//     res.status(500).json({message: err.message});
// }



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