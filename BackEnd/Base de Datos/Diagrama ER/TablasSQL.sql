/* I needed to use this table, I just modified a bit*/

Create Table users(
        uid varchar(30),
        email varchar(50),
        password varchar(16),
        role smallint,
        Primary Key(uid)
);


Create Table Individual(
	inid varchar(30),
	firstName varchar(50),
	lastName varchar(50),
	nationality varchar(50),
	biography varchar(50),
	org varchar(50),
	birthDate date,
	foto varchar(50),

	Primary Key(inid),
	Foreign Key(inid) References Users(uid)
);

Create Table Organization(
	oid varchar(30),
	name varchar(50),
	description varchar(50),
	logo varchar(50),
	country varchar(50),
	location varchar(50),

	Primary Key(oid),
	Foreign Key(oid) References Users(uid)
);

Create Table TelephoneInd(
	tid int,
	uid varchar(30),
	number varchar(50),
	extension int,

	Primary Key(tid),
	Foreign Key(uid) References Individual(inid) ON DELETE CASCADE
);

Create Table TelephoneOrg(
	tid int,
	oid varchar(30),
	number varchar(8),
	extension int,

	Primary Key(tid),
	Foreign Key(oid) References Organization(oid) ON DELETE CASCADE
);

Create Table CategoryIdea(
	id int,
	nombre varchar(20),

	Primary Key(id)
);

Create Table StateIdea(
	id int,
	nombre varchar(20),

	Primary Key(id)
);

Create Table Idea(
	iid int,
	uid varchar(30),
	cantInt int,
	description varchar(100),
	category int,
	state int,

	Primary Key(iid),
	Foreign Key(uid) References Users(uid) ON DELETE CASCADE,
	Foreign Key(category) References CategoryIdea(id),
	Foreign Key(state) References StateIdea(id)
);

-- Inversionist Bookmark
Create Table InvBook(
	iid int,
	invId varchar(30),

	Primary Key(invId, iid),
	Foreign Key(iid) References Idea(iid),
	Foreign Key(invId) References Users(uid)
);

-- Give Resource
Create Table ResGive(
	rid int,
	uid varchar(30),
	description varchar(100),
	state int,
	category int,
	cantInt int,
	link varchar(150),

	Primary Key(rid),
	Foreign Key(uid) References Users(uid) ON DELETE CASCADE
);

Create Table CategoryRes(
	id int,
	name varchar(50),

	Primary Key(id)
);

-- Get Resource
Create Table ResGet(
	rid int,
	uid varchar(30),

	Primary Key(uid, rid),
	Foreign Key(uid) References Users(uid),
	Foreign Key(rid) References ResGive(rid)
);

-- Bookmark of resources

Create Table ResBook(
	rid int,
	uid varchar(30),

	Primary Key(uid, rid),
	Foreign Key(uid) References Users(uid),
	Foreign Key(rid) References ResGive(rid)
);


/*
Chafa users

create role client LOGIN password 'client';
Grant connect on database "Prueba" to client;
GRANT SELECT, INSERT, UPDATE, DELETE ON users  TO client;

/* ROLES */

--- Administrator ---
Create role admin LOGIN password 'netZRocks';
ALTER ROLE admin WITH SUPERUSER;

--- Entrepreneur ---
CREATE ROLE entrepreneur LOGIN password 'netzentrepreneur';
GRANT CONNECT ON DATABASE "Prueba" to entrepreneur;
GRANT SELECT, INSERT, UPDATE, DELETE ON users, individual, organization, telephoneind, telephoneorg, idea TO entrepreneur;
GRANT SELECT ON categoryidea, stateidea TO entrepreneur;

--- Financist ---
CREATE ROLE financist LOGIN password 'netzfinancist';
GRANT CONNECT ON DATABASE "Prueba" to financist;
GRANT SELECT, INSERT, UPDATE, DELETE ON users, individual, organization, telephoneind, telephoneorg, invbook TO financist;
GRANT SELECT ON idea, categoryidea, stateidea TO entrepreneur;

--- Resource Business Guy ---
CREATE ROLE resource LOGIN password 'netzresource';
GRANT CONNECT ON DATABASE "Prueba" to resource;
GRANT SELECT, INSERT, UPDATE, DELETE ON users, individual, organization, telephoneind, telephoneorg, resgive, resget TO resource;
GRANT SELECT ON categoryres TO resource;

*/
