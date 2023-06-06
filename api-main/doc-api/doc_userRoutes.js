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

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Suppression d'un utilisateur existant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: L'utilisateur a été supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: ID de l'utilisateur invalide
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
 *         description: Une erreur serveur est survenue ou l'utilisateur n'existe pas
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


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Suppression d'un utilisateur existant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: L'utilisateur a été supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: ID de l'utilisateur invalide
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
 *         description: Une erreur serveur est survenue ou l'utilisateur n'existe pas
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


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Connexion d'un utilisateur existant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur
 *     responses:
 *       200:
 *         description: L'utilisateur a été connecté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Le token JWT pour l'utilisateur
 *       400:
 *         description: Mauvais email ou mot de passe
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


/**
 * @swagger
 * /user/gardenLocation:
 *   patch:
 *     summary: Mettre à jour la localisation d'un jardin
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: La longitude du jardin
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: La latitude du jardin
 *     responses:
 *       200:
 *         description: La localisation du jardin a été mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Le message de confirmation
 *       400:
 *         description: Arguments invalides ou manquants
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
