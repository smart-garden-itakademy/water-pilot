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

INSERT INTO Electrovalve (name, position, userId, isAutomatic) VALUES
                                              ('Tomates', 4, 1, true),
                                              ('Laitues', 5, 1, true),
                                              ('Fraises', 6, 1, true),
                                              ('Cactus', 2, 2, true),
                                              ('Blew', 3, 2, true);

/* Insertion de données pour la table Valvesettings */

INSERT INTO ValveSettings (rainThreshold, moistureThreshold, duration, idElectrovalve) VALUES
    (5, 20, 1, (SELECT id FROM Electrovalve WHERE name = 'Tomates')),
    (6, 25, 2, (SELECT id FROM Electrovalve WHERE name = 'Laitues')),
    (4, 18, 1, (SELECT id FROM Electrovalve WHERE name = 'Fraises'));



/* Insertion des planifications pour les valves */

/* Valve 1 UPDATE : changement des insert days */ 
INSERT INTO Schedule (hourStart, hourEnd, days, idSettings, isActivated) VALUES
                                                               (6, 12, '1', 1, true),
                                                               (12, 19, '2, 3, 4', 1, true),
                                                               (20, 23, '1, 2, 3, 4, 5', 1, true);

/* Valve 2 */
INSERT INTO Schedule (hourStart, hourEnd, days, idSettings, isActivated) VALUES
                                                               (7, 15, '5, 6', 2, true),
                                                               (16, 18, '1, 2, 3, 4', 2, true),
                                                               (19, 6, '1, 2, 3, 4, 5, 6, 7', 2, true);

/* Valve 3 */
INSERT INTO Schedule (hourStart, hourEnd, days, idSettings, isActivated) VALUES
                                                               (8, 10, '1, 2, 3', 3, true),
                                                               (14, 16, '1, 2, 3, 4, 5', 3, true),
                                                               (20, 22, '1, 2, 3, 4, 5', 3, true);

INSERT INTO Schedule (hourStart, hourEnd, days, idSettings, isActivated) VALUES
                                                               (8, 18, '1, 2, 3, 4, 5', 4, true),
                                                               (8, 18, '1, 2, 3, 4, 5', 5, true);

/* Insertion de données d'irrigation */

INSERT INTO Irrigation (dateStart, dateEnd, volume, idElectrovalve)
VALUES
    ('2023-05-01 08:00:00', '2023-05-01 08:30:00', 50, 1),
    ('2023-05-02 09:30:00', '2023-05-02 10:00:00', 60, 2),
    ('2023-05-03 13:00:00', '2023-05-03 13:30:00', 40, 3),
    ('2023-05-04 10:00:00', '2023-05-04 10:30:00', 55, 1),
    ('2023-05-05 15:00:00', '2023-05-05 15:30:00', 70, 2),
    ('2023-05-07 14:00:00', '2023-05-07 14:30:00', 45, 3),
    ('2023-05-09 11:00:00', '2023-05-09 11:30:00', 50, 1),
    ('2023-05-10 13:30:00', '2023-05-10 14:00:00', 60, 2),
    ('2023-05-11 16:00:00', '2023-05-11 16:30:00', 40, 3),
    ('2023-05-12 09:00:00', '2023-05-12 09:30:00', 55, 1),
    ('2023-05-14 12:00:00', '2023-05-14 12:30:00', 70, 2),
    ('2023-05-15 17:00:00', '2023-05-15 17:30:00', 45, 3),
    ('2023-05-17 15:00:00', '2023-05-17 15:30:00', 50, 1),
    ('2023-05-18 08:30:00', '2023-05-18 09:00:00', 60, 2),
    ('2023-05-20 10:00:00', '2023-05-20 10:30:00', 40, 3),
    ('2023-05-21 14:00:00', '2023-05-21 14:30:00', 55, 1),
    ('2023-05-22 11:30:00', '2023-05-22 12:00:00', 70, 2),
    ('2023-05-24 12:00:00', '2023-05-24 12:30:00', 45, 3),
    ('2023-05-26 13:00:00', '2023-05-26 13:30:00', 50, 1),
    ('2023-05-28 16:00:00', '2023-05-28 16:30:00', 60, 2),
    ('2023-06-01 08:00:00', '2023-06-01 08:30:00', 50, 1),
    ('2023-06-02 09:30:00', '2023-06-02 10:00:00', 60, 2),
    ('2023-06-03 13:00:00', '2023-06-03 13:30:00', 40, 3),
    ('2023-06-04 10:00:00', '2023-06-04 10:30:00', 55, 1),
    ('2023-06-05 15:00:00', '2023-06-05 15:30:00', 70, 2),
    ('2023-06-07 14:00:00', '2023-06-07 14:30:00', 45, 3),
    ('2023-06-09 11:00:00', '2023-06-09 11:30:00', 50, 1),
    ('2023-06-10 13:30:00', '2023-06-10 14:00:00', 60, 2),
    ('2023-06-11 16:00:00', '2023-06-11 16:30:00', 40, 3),
    ('2023-06-12 09:00:00', '2023-06-12 09:30:00', 55, 1),
    ('2023-06-14 12:00:00', '2023-06-14 12:30:00', 70, 2),
    ('2023-06-15 17:00:00', '2023-06-15 17:30:00', 45, 3),
    ('2023-06-17 15:00:00', '2023-06-17 15:30:00', 50, 1),
    ('2023-06-18 08:30:00', '2023-06-18 09:00:00', 60, 2),
    ('2023-06-20 10:00:00', '2023-06-20 10:30:00', 40, 3),
    ('2023-06-21 14:00:00', '2023-06-21 14:30:00', 55, 1),
    ('2023-06-22 11:30:00', '2023-06-22 12:00:00', 70, 2),
    ('2023-06-24 12:00:00', '2023-06-24 12:30:00', 45, 3),
    ('2023-06-26 13:00:00', '2023-06-26 13:30:00', 50, 1),
    ('2023-06-28 16:00:00', '2023-06-28 16:30:00', 60, 2);