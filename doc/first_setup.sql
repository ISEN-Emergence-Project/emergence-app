-- Add default admin account
INSERT INTO "Accounts" ("firstname", "lastname", "username", "email", "passwordHash", "role", "createdAt", "updatedAt")
VALUES ('Firstname', 'Lastname', 'test', 'test@test.io', '$2b$10$ay5fHt6mbS/SySafWNh/EuUROBAw8Ph9yOzRBUvA43Fuq49ic1flC', 'admin', NOW(), NOW());

-- Add default form
INSERT INTO "Forms" ("title", "description", "bannerUrl", "fkPhaseId", "createdAt", "updatedAt")
VALUES ('Programme Emergence 2021', 'Formulaire pour le programme emergence 2021', 'https://img.freepik.com/photos-gratuite/silhouette-regardant-vers-avenir_1134-399.jpg?size=626&ext=jpg', 1, NOW(), NOW());

-- Add phases
INSERT INTO "Phases" ("phaseId", lead, "buttonText", "buttonLink", "createdAt", "updatedAt") VALUES (1, 'Le speed meeting est en cours de préparation', 'Gérer les comptes', '/accounts', '2021-04-20 22:56:40.000000 +00:00', '2021-04-20 22:56:40.000000 +00:00');
INSERT INTO "Phases" ("phaseId", lead, "buttonText", "buttonLink", "createdAt", "updatedAt") VALUES (2, 'Les lauréats répondent aux questions', 'Répondre aux questions', '/form', '2021-04-20 22:57:58.000000 +00:00', '2021-04-20 22:57:59.000000 +00:00');
INSERT INTO "Phases" ("phaseId", lead, "buttonText", "buttonLink", "createdAt", "updatedAt") VALUES (3, 'Les parrains choisissent les lauréats qu''ils souhaitent rencontrer', 'Sélectionner des lauréats', '/preselections', '2021-04-20 22:59:23.000000 +00:00', '2021-04-20 22:59:24.000000 +00:00');
INSERT INTO "Phases" ("phaseId", lead, "buttonText", "buttonLink", "createdAt", "updatedAt") VALUES (4, 'Les speed meetings sont en préparation', 'Plannifier les meetings', '/meeting-planning', '2021-04-20 23:00:03.000000 +00:00', '2021-04-20 23:00:04.000000 +00:00');
INSERT INTO "Phases" ("phaseId", lead, "buttonText", "buttonLink", "createdAt", "updatedAt") VALUES (5, 'Les speed meetings sont en cours', 'Voir les meetings', '/meetings', '2021-04-20 23:06:54.000000 +00:00', '2021-04-20 23:06:55.000000 +00:00');
INSERT INTO "Phases" ("phaseId", lead, "buttonText", "buttonLink", "createdAt", "updatedAt") VALUES (6, 'Les binômes sont en cours de création', 'Sélectionner les matchs', '/choose-matches', '2021-04-20 23:07:40.000000 +00:00', '2021-04-20 23:07:41.000000 +00:00');
INSERT INTO "Phases" ("phaseId", lead, "buttonText", "buttonLink", "createdAt", "updatedAt") VALUES (7, 'Les binômes sont arrivés ! Découvre vite ton [] !', 'Découvrir', '/match', '2021-04-20 23:08:26.000000 +00:00', '2021-04-20 23:08:27.000000 +00:00');
