/* Insertion de données pour la table user */

INSERT INTO User (name, email, password, longitude, latitude, city)
VALUES
    ('BobSmith', 'bobsmith@example.com', 'password789', 4.736120007422938, 45.7808503213175, "parla"),
    ('JohnDoe', 'johndoe@example.com', 'password123', 4.736120007422938, 45.7808503213175, "lyon");


/* Insertion de données pour le type de capteur'*/

INSERT INTO Type (name, unit) VALUES ('Temperature', '°C');
INSERT INTO Type (name, unit) VALUES ('Soil Moisture', '%');
INSERT INTO Type (name, unit) VALUES ('Rain', 'mm');


/* Insertion de données pour le capteur de température*/

INSERT INTO Sensor (name, position, value, date, userId, typeId)
VALUES
    ('Temperature sensor', 1, 20, '2022-03-28', 1, 1),
    ('Temperature sensor', 1, 22, '2022-03-28', 1, 1),
    ('Temperature sensor', 1, 24, '2022-03-28', 1, 1),
    ('Temperature sensor', 1, 25, '2022-03-28', 1, 1),
    ('Temperature sensor', 1, 23, '2022-03-28', 1, 1),
    ('Temperature sensor', 1, 21, '2022-03-28', 1, 1),
    ('Temperature sensor', 1, 18, '2022-03-28', 1, 1),
    ('Temperature sensor', 1, 17, '2022-03-28', 1, 1),
    ('Temperature sensor', 1, 19, '2022-03-28', 1, 1),
    ('Temperature sensor', 1, 16, '2022-03-28', 1, 1),
    ('Temperature Sensor', 1, 20, '2023-03-29', 1, 1),
    ('Temperature Sensor', 1, 19, '2023-03-29', 1, 1),
    ('Temperature Sensor', 1, 18, '2023-03-29', 1, 1),
    ('Temperature Sensor', 1, 21, '2023-03-29', 1, 1),
    ('Temperature Sensor', 1, 22, '2023-03-29', 1, 1),
    ('Temperature Sensor', 1, 20, '2023-03-29', 1, 1),
    ('Temperature Sensor', 1, 19, '2023-03-29', 1, 1),
    ('Temperature Sensor', 1, 18, '2023-03-29', 1, 1),
    ('Temperature Sensor', 1, 21, '2023-03-29', 1, 1),
    ('Temperature Sensor', 1, 22, '2023-03-29', 1, 1),
    ('Temperature Sensor', 1, 23, '2023-03-30', 1, 1),
    ('Temperature Sensor', 1, 22, '2023-03-30', 1, 1),
    ('Temperature Sensor', 1, 21, '2023-03-30', 1, 1),
    ('Temperature Sensor', 1, 24, '2023-03-30', 1, 1),
    ('Temperature Sensor', 1, 23, '2023-03-30', 1, 1),
    ('Temperature Sensor', 1, 22, '2023-03-30', 1, 1),
    ('Temperature Sensor', 1, 21, '2023-03-30', 1, 1),
    ('Temperature Sensor', 1, 20, '2023-03-30', 1, 1),
    ('Temperature Sensor', 1, 22, '2023-03-30', 1, 1),
    ('Temperature Sensor', 1, 21, '2023-03-30', 1, 1);

/* Insertion de données pour le capteur d'humidité au sol'*/

INSERT INTO Sensor (name, position, value, date, userId, typeId)
VALUES
    ('Soil Moisture Sensor', 2, 70, '2023-03-28', 1, 2),
    ('Soil Moisture Sensor', 2, 65, '2023-03-28', 1, 2),
    ('Soil Moisture Sensor', 2, 60, '2023-03-28', 1, 2),
    ('Soil Moisture Sensor', 2, 75, '2023-03-28', 1, 2),
    ('Soil Moisture Sensor', 2, 80, '2023-03-28', 1, 2),
    ('Soil Moisture Sensor', 2, 70, '2023-03-28', 1, 2),
    ('Soil Moisture Sensor', 2, 65, '2023-03-28', 1, 2),
    ('Soil Moisture Sensor', 2, 60, '2023-03-28', 1, 2),
    ('Soil Moisture Sensor', 2, 75, '2023-03-28', 1, 2),
    ('Soil Moisture Sensor', 2, 80, '2023-03-28', 1, 2),
    ('Soil Moisture Sensor', 2, 72, '2023-03-29', 1, 2),
    ('Soil Moisture Sensor', 2, 68, '2023-03-29', 1, 2),
    ('Soil Moisture Sensor', 2, 64, '2023-03-29', 1, 2),
    ('Soil Moisture Sensor', 2, 70, '2023-03-29', 1, 2),
    ('Soil Moisture Sensor', 2, 75, '2023-03-29', 1, 2),
    ('Soil Moisture Sensor', 2, 72, '2023-03-29', 1, 2),
    ('Soil Moisture Sensor', 2, 68, '2023-03-29', 1, 2),
    ('Soil Moisture Sensor', 2, 64, '2023-03-29', 1, 2),
    ('Soil Moisture Sensor', 2, 70, '2023-03-29', 1, 2),
    ('Soil Moisture Sensor', 2, 75, '2023-03-29', 1, 2),
    ('Soil Moisture Sensor', 2, 74, '2023-03-30', 1, 2),
    ('Soil Moisture Sensor', 2, 69, '2023-03-30', 1, 2),
    ('Soil Moisture Sensor', 2, 63, '2023-03-30', 1, 2),
    ('Soil Moisture Sensor', 2, 71, '2023-03-30', 1, 2),
    ('Soil Moisture Sensor', 2, 76, '2023-03-30', 1, 2),
    ('Soil Moisture Sensor', 2, 74, '2023-03-30', 1, 2),
    ('Soil Moisture Sensor', 2, 69, '2023-03-30', 1, 2),
    ('Soil Moisture Sensor', 2, 63, '2023-03-30', 1, 2),
    ('Soil Moisture Sensor', 2, 71, '2023-03-30', 1, 2),
    ('Soil Moisture Sensor', 2, 76, '2023-03-30', 1, 2);

/* Insertion de données pour le capteur de pluie */

INSERT INTO Sensor (name, position, value, date, userId, typeId)
VALUES
    ('Rain Sensor', 3, 5, '2023-03-28', 1, 3),
    ('Rain Sensor', 3, 3, '2023-03-28', 1, 3),
    ('Rain Sensor', 3, 6, '2023-03-28', 1, 3),
    ('Rain Sensor', 3, 4, '2023-03-28', 1, 3),
    ('Rain Sensor', 3, 2, '2023-03-28', 1, 3),
    ('Rain Sensor', 3, 4, '2023-03-28', 1, 3),
    ('Rain Sensor', 3, 6, '2023-03-28', 1, 3),
    ('Rain Sensor', 3, 3, '2023-03-28', 1, 3),
    ('Rain Sensor', 3, 5, '2023-03-28', 1, 3),
    ('Rain Sensor', 3, 2, '2023-03-28', 1, 3),
    ('Rain Sensor', 3, 4, '2023-03-29', 1, 3),
    ('Rain Sensor', 3, 5, '2023-03-29', 1, 3),
    ('Rain Sensor', 3, 2, '2023-03-29', 1, 3),
    ('Rain Sensor', 3, 6, '2023-03-29', 1, 3),
    ('Rain Sensor', 3, 3, '2023-03-29', 1, 3),
    ('Rain Sensor', 3, 5, '2023-03-29', 1, 3),
    ('Rain Sensor', 3, 4, '2023-03-29', 1, 3),
    ('Rain Sensor', 3, 2, '2023-03-29', 1, 3),
    ('Rain Sensor', 3, 3, '2023-03-29', 1, 3),
    ('Rain Sensor', 3, 6, '2023-03-29', 1, 3),
    ('Rain Sensor', 3, 5, '2023-03-30', 1, 3),
    ('Rain Sensor', 3, 2, '2023-03-30', 1, 3),
    ('Rain Sensor', 3, 4, '2023-03-30', 1, 3),
    ('Rain Sensor', 3, 3, '2023-03-30', 1, 3),
    ('Rain Sensor', 3, 6, '2023-03-30', 1, 3),
    ('Rain Sensor', 3, 5, '2023-03-30', 1, 3),
    ('Rain Sensor', 3, 2, '2023-03-30', 1, 3),
    ('Rain Sensor', 3, 4, '2023-03-30', 1, 3),
    ('Rain Sensor', 3, 3, '2023-03-30', 1, 3),
    ('Rain Sensor', 3, 6, '2023-03-30', 1, 3);

/* Insertion de données pour la table Electrovalve */

INSERT INTO Electrovalve (name, position, userId) VALUES
                                              ('Tomatoes', 4, 1),
                                              ('Lettuce', 5, 1),
                                              ('Strawberry', 6, 1);

/* Insertion de données pour la table Valvesettings */

INSERT INTO ValveSettings (rainThreshold, moistureThreshold, duration, idElectrovalve, state) VALUES
    (5, 20, 1, (SELECT id FROM Electrovalve WHERE name = 'Tomatoes'),"true"),
    (6, 25, 2, (SELECT id FROM Electrovalve WHERE name = 'Lettuce'),"true"),
    (4, 18, 1, (SELECT id FROM Electrovalve WHERE name = 'Strawberry'),"true");


/* Insertion des planifications pour les valves */

/* Valve 1 UPDATE : changement des insert days */ 
INSERT INTO Schedule (hourStart, hourEnd, days, idSettings) VALUES
                                                               (6, 12, '1', 1),
                                                               (12, 19, '2, 3, 4', 1),
                                                               (20, 23, '1, 2, 3, 4, 5', 1);

/* Valve 2 */
INSERT INTO Schedule (hourStart, hourEnd, days, idSettings) VALUES
                                                               (7, 15, '5, 6', 2),
                                                               (16, 18, '1, 2, 3, 4', 2),
                                                               (19, 6, '1, 2, 3, 4, 5, 6, 7', 2);

/* Valve 3 */
INSERT INTO Schedule (hourStart, hourEnd, days, idSettings) VALUES
                                                               (8, 15, '1, 2, 3', 3),
                                                               (15, 19, '1, 2, 3, 4, 5', 3),
                                                               (6, 8, '1', 1),
                                                               (12, 14, '2, 3, 4', 1),
                                                               (18, 20, '1, 2, 3, 4, 5', 1);

/* Valve 2 */
INSERT INTO Schedule (hourStart, hourEnd, days, idSettings) VALUES
                                                               (7, 9, '5, 6', 2),
                                                               (13, 15, '1, 2, 3, 4', 2),
                                                               (19, 21, '1, 2, 3, 4, 5, 6, 7', 2);

/* Valve 3 */
INSERT INTO Schedule (hourStart, hourEnd, days, idSettings) VALUES
                                                               (8, 10, '1, 2, 3', 3),
                                                               (14, 16, '1, 2, 3, 4, 5', 3),
                                                               (20, 22, '1, 2, 3, 4, 5', 3);

/* Insertion de données d'irrigation */

INSERT INTO Irrigation (dateStart, dateEnd, volume, idElectrovalve)
VALUES
    ('2023-03-01 08:00:00', '2023-03-01 08:30:00', 500, 1),
    ('2023-03-02 09:30:00', '2023-03-02 10:00:00', 600, 2),
    ('2023-03-03 13:00:00', '2023-03-03 13:30:00', 400, 3),
    ('2023-03-04 10:00:00', '2023-03-04 10:30:00', 550, 1),
    ('2023-03-05 15:00:00', '2023-03-05 15:30:00', 700, 2),
    ('2023-03-07 14:00:00', '2023-03-07 14:30:00', 450, 3),
    ('2023-03-09 11:00:00', '2023-03-09 11:30:00', 500, 1),
    ('2023-03-10 13:30:00', '2023-03-10 14:00:00', 600, 2),
    ('2023-03-11 16:00:00', '2023-03-11 16:30:00', 400, 3),
    ('2023-03-12 09:00:00', '2023-03-12 09:30:00', 550, 1),
    ('2023-03-14 12:00:00', '2023-03-14 12:30:00', 700, 2),
    ('2023-03-15 17:00:00', '2023-03-15 17:30:00', 450, 3),
    ('2023-03-17 15:00:00', '2023-03-17 15:30:00', 500, 1),
    ('2023-03-18 08:30:00', '2023-03-18 09:00:00', 600, 2),
    ('2023-03-20 10:00:00', '2023-03-20 10:30:00', 400, 3),
    ('2023-03-21 14:00:00', '2023-03-21 14:30:00', 550, 1),
    ('2023-03-22 11:30:00', '2023-03-22 12:00:00', 700, 2),
    ('2023-03-24 12:00:00', '2023-03-24 12:30:00', 450, 3),
    ('2023-03-26 13:00:00', '2023-03-26 13:30:00', 500, 1),
    ('2023-03-28 16:00:00', '2023-03-28 16:30:00', 600, 2);