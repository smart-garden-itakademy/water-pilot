/* Création de la table User */
CREATE TABLE User (
                      id INT PRIMARY KEY AUTO_INCREMENT,
                      name varchar(50) NOT NULL,
                      email varchar(100) NOT NULL,
                      password varchar(100) NOT NULL,
                      latitude varchar(100) ,
                      longitude varchar(100),
                      city varchar (100)
);

/* Création de la table Type */
CREATE TABLE Type (
                      id INT PRIMARY KEY AUTO_INCREMENT,
                      name varchar(100) NOT NULL,
                      unit varchar(50) NOT NULL
);

/* Création de la table Sensor */
CREATE TABLE Sensor (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        name varchar(100) NOT NULL,
                        position int NOT NULL,
                        value int NOT NULL,
                        date DATE NOT NULL,
                        userId INT,
                        FOREIGN KEY (userId) REFERENCES User(id),
                        typeId INT,
                        FOREIGN KEY (typeId) REFERENCES Type(id)
);

/* Création de la table Electrovalve */
CREATE TABLE Electrovalve (
                              id INT PRIMARY KEY AUTO_INCREMENT,
                              name VARCHAR(50),
                              position INT NOT NULL, -- Position pas nécéssaire
                              userId INT,
                              FOREIGN KEY (userId) REFERENCES User(id)
);

/* Création de la table UserSettings */
CREATE TABLE ValveSettings (
                              id INT PRIMARY KEY AUTO_INCREMENT,
                              rainThreshold INT NOT NULL,
                              moistureThreshold INT NOT NULL,
                              duration INT NOT NULL,
                              idElectrovalve INT,
                              FOREIGN KEY (idElectrovalve) REFERENCES Electrovalve(id)
);


/* Création de la table Irrigation */
CREATE TABLE Irrigation (
                          id INT PRIMARY KEY AUTO_INCREMENT,
                          dateStart DATE NOT NULL,
                          dateEnd DATE NOT NULL,
                          volume INT NOT NULL,
                          idElectrovalve INT NOT NULL,
                          FOREIGN KEY (idElectrovalve) REFERENCES Electrovalve(id)
);


/* Création de la table Schedule */
CREATE TABLE Schedule (
                      id INT PRIMARY KEY AUTO_INCREMENT,
                      hourStart INT NOT NULL,
                      hourEnd INT NOT NULL,
                      days TEXT NOT NULL,
                      idSettings INT,
                      FOREIGN KEY (idSettings) REFERENCES ValveSettings(id)
);


