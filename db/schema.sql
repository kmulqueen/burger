
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
    id INT AUTO_INCREMENT,
    burger_name VARCHAR(50),
    devoured boolean default 0,
    PRIMARY KEY (id)
);