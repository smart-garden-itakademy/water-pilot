const express = require('express');
const router = express.Router();
const {isUserExist,getUsers, isInDb, passwordValidation, hash, isEmailValid, newUser, findUser, generateToken, updateGardenLocation,deleteUser} = require ('../controllers/UserController')
const {authenticate} = require ('../middlewares/AuthMiddleware')
const {CustomError} = require ('../errors/CustomError')
const {checkArgumentsDefined,checkArgumentsType} = require ('../controllers/Utils/Utils')
const jwt = require("jsonwebtoken");

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
    })
    //supprimer son propre compte
    .delete(authenticate, async (req, res, next) => {
        try {
            const userId = req.userId;
            if(isNaN(userId)) return next(new CustomError("Invalid user id", 500));

            const isUserInDb = await isUserExist(userId);
            if(!isUserInDb) next (new CustomError ("Cet utilisateur n'existe pas",500));
            await deleteUser(userId);
            res.status(200).json({message: "Utilisateur supprimé"});
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
        const { password, name, email, city} = req.body;
        const longitude = parseFloat(req.body.longitude);
        const latitude = parseFloat(req.body.latitude);

        try {
            checkArgumentsDefined(password, name, email, city, longitude, latitude);
            checkArgumentsType(name,"string", email,"string", city,"string", longitude,"number", latitude,"number");

            await isInDb(email); //check if email is already in db
            passwordValidation(password); //password validation
            const hashPwd = await hash(password);//hash password
            isEmailValid(email);//check if email is valid
            // Save user in database
            await newUser(hashPwd, name, email, city, longitude, latitude);
            // Send response
            res.status(201).json({"message": 'Votre compte a bien été créé !'});
        } catch (err) {
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
            const longitude = parseFloat(req.body.longitude);
            const latitude = parseFloat(req.body.latitude);

            checkArgumentsDefined(longitude, latitude);
            checkArgumentsType(longitude,"number", latitude,"number");

            const patchGardenLocation = await updateGardenLocation(req.userId, longitude, latitude);
            res.status(200).json({"message": 'La localisation de votre jardin a bien été enregistré !'});
        } catch(err) {
            next(err);
        }
    });
//TODO: echapper les caractères spéciaux dans les requêtes sql

//TODO: vérification de l'adresse mail lors de l'inscription en envoyant un mail
//piste: nodemailer

//TODO:fonctionnalité forgot password


module.exports=router;