/**
 * @swagger
 * /electrovalve:
 *   get:
 *     summary: Renvoie toutes les électrovalves de l'utilisateur
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: La liste des électrovalves de l'utilisateur
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
 *                   position:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   isAutomatic:
 *                     type: integer
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

/**
 * @swagger
 * /electrovalve:
 *   post:
 *     summary: Ajoute une nouvelle électrovalve
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pinPosition:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: L'électrovalve a été ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 position:
 *                   type: integer
 *                 userId:
 *                   type: integer
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
 *         description: Erreur serveur ou conflit d'éléments (une électrovalve existe déjà à cette position ou le nom est déjà pris)
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
 * /electrovalve/{idValve}:
 *   patch:
 *     summary: Modifie une électrovalve spécifique
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idValve
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'électrovalve à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               isAutomatic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: La modification a été effectuée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
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
 *         description: Erreur serveur ou conflit d'éléments (l'électrovalve n'existe pas ou le nom est déjà pris)
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
