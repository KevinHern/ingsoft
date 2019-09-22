/*---------------------------*/
/*----- INSERTING USERS -----*/
/*---------------------------*/

--DUMMY 1
INSERT INTO users(email, password, role, type)
VALUES('pashel@gmail.com', '1111', 1, 1);
INSERT INTO individual(firstname, lastname, nationality, biography, org, birthdate)
VALUES('Isai', 'Pashel', 'Guatemalan', 'Im Pashel', 'None', '2001-01-01');

--DUMMY 2
INSERT INTO users(email, password, role, type)
VALUES('fernando@gmail.com', '2222', 1, 1);
INSERT INTO individual(firstname, lastname, nationality, biography, org, birthdate)
VALUES('Fernando', 'Sagastume', 'Guatemalan', 'Im Fernando', 'None', '2002-02-02');

--DUMMY 3
INSERT INTO users(email, password, role, type)
VALUES('jerry@gmail.com', '3333', 3, 1);
INSERT INTO individual(firstname, lastname, nationality, biography, org, birthdate)
VALUES('Jerry', 'Palacios', 'Guatemalan', 'Im Jerry', 'None', '2003-03-03');

--DUMMY 4
INSERT INTO users(email, password, role, type)
VALUES('ibm@gmail.com', '4444', 2, 0);
INSERT INTO organization(name, description, country, location)
VALUES('IBM', 'We are IBM', 'USA', 'Unkown');

--DUMMY 5
INSERT INTO users(email, password, role, type)
VALUES('apple@gmail.com', '5555', 2, 0);
INSERT INTO organization(name, description, country, location)
VALUES('Apple', 'We are Apple', 'USA', 'Unkown');

--DUMMY 6
INSERT INTO users(email, password, role, type)
VALUES('juagüey@gmail.com', '6666', 3, 0);
INSERT INTO organization(name, description, country, location)
VALUES('Huawei', 'We are Huawei', 'China', 'Unkown');

/*----------------------------*/
/*----- INSERTING PHONES -----*/
/*----------------------------*/

/*-------------------------------------*/
/*----- INSERTING IDEA CATEGORIES -----*/
/*-------------------------------------*/
-- Category: Technology
INSERT INTO categoryidea(name)
VALUES('Technology');

-- Category: Industrial
INSERT INTO categoryidea(name)
VALUES('Industrial');

-- Category: Electronics
INSERT INTO categoryidea(name)
VALUES('Electronics');

/*---------------------------------*/
/*----- INSERTING IDEA STATES -----*/
/*---------------------------------*/
-- State: Available
INSERT INTO stateidea(name)
VALUES('Available');

-- State: Not Available
INSERT INTO stateidea(name)
VALUES('Not Available');

/*---------------------------------*/
/*----- INSERTING IDEA STATES -----*/
/*---------------------------------*/
-- Idea 1: New Watch
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('1', 0, 'New Watch', 'New powerful watch', 1, 1);

-- Idea 2: New Car
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('1', 0, 'New Car', 'New powerful Car', 1, 1);

-- Idea 3: New Computer
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('1', 0, 'New Computer', 'New amazing computer', 1, 1);

-- Idea 4: New Conveyor Belt
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('1', 0, 'New Conveyor Belt', 'New optimized conveyor belt', 2, 1);

-- Idea 5: New Transistor
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('1', 0, 'New Transistor', 'New and faster transistor', 3, 1);

-- Idea 6: New Satellite
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('2', 0, 'New Satellite', 'New powerful Satellite', 1, 1);

-- Idea 7: New Microcontroller
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('2', 0, 'New Microcontroller', 'New powerful Microcontroller', 1, 1);

-- Idea 8: New Excavator
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('2', 0, 'New Excavator', 'New amazing Excavator', 2, 1);

-- Idea 9: New 3D Printer
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('2', 0, 'New 3D Printer', 'New optimized 3D Printer', 2, 1);

-- Idea 10: New Switch
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('2', 0, 'New Switch', 'New and faster Switch', 3, 1);

-- Idea 11: New Hard Drive
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('3', 0, 'New Hard Drive', 'New and faster Hard Drive', 1, 1);

-- Idea 12: New Router
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('3', 0, 'New Router', 'New powerful Router', 1, 1);

-- Idea 13: New Pressure System
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('3', 0, 'New Pressure System', 'New powerful Pressure System', 2, 1);

-- Idea 14: New ALU
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('3', 0, 'New ALU', 'New robust ALU', 3, 1);

-- Idea 15: New Light Sensor
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('3', 0, 'New Light Sensor', 'New optimized Light Sensor', 3, 1);

-- Idea 16: New AR Technology
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('6', 0, 'New AR Technology', 'New and faster AR Technology', 1, 1);

-- Idea 17: New VR Technology
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('6', 0, 'New VR Technology', 'New and faster VR Technology', 1, 1);

-- Idea 18: New Cellphone
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('6', 0, 'New Cellphone', 'New powerful Cellphone', 1, 1);

-- Idea 19: New Graphics Card
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('6', 0, 'New Graphics Card', 'New powerful Graphics Card', 3, 1);

-- Idea 20: New SD Card
INSERT INTO idea(uid, cantint, title, description, category, state)
VALUES('6', 0, 'New SD Card', 'New SD Card', 3, 1);