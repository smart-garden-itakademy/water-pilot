/* Création de la base de données */
CREATE DATABASE WaterPilotApp DEFAULT CHARACTER SET utf8;

/* Création d'un utilisateur */
CREATE USER 'userWaterPilotApp'@'localhost' IDENTIFIED BY 'sm@rtg4rd3n';
USE WaterPilotApp;
GRANT ALL PRIVILEGES ON WaterPilotApp.* TO 'userWaterPilotApp'@'localhost';
SHOW GRANTS FOR 'userWaterPilotApp'@'localhost';
