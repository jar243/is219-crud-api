CREATE DATABASE `is219CrudApi`;

USE `is219CrudApi`;

CREATE TABLE `trees` (
`id` INT AUTO_INCREMENT PRIMARY KEY,
`girth` DECIMAL(10,1),
`height` DECIMAL(10,1),
`volume` DECIMAL(10,1)
);

INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (1,8.3,70,10.3);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (2,8.6,65,10.3);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (3,8.8,63,10.2);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (4,10.5,72,16.4);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (5,10.7,81,18.8);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (6,10.8,83,19.7);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (7,11,66,15.6);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (8,11,75,18.2);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (9,11.1,80,22.6);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (10,11.2,75,19.9);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (11,11.3,79,24.2);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (12,11.4,76,21);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (13,11.4,76,21.4);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (14,11.7,69,21.3);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (15,12,75,19.1);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (16,12.9,74,22.2);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (17,12.9,85,33.8);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (18,13.3,86,27.4);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (19,13.7,71,25.7);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (20,13.8,64,24.9);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (21,14,78,34.5);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (22,14.2,80,31.7);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (23,14.5,74,36.3);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (24,16,72,38.3);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (25,16.3,77,42.6);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (26,17.3,81,55.4);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (27,17.5,82,55.7);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (28,17.9,80,58.3);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (29,18,80,51.5);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (30,18,80,51);
INSERT INTO trees(`id`,`girth`,`height`,`volume`) VALUES (31,20.6,87,77);