/* I needed to use this table, I just modified a bit*/

Create Table users(
        uid varchar(30),
        email varchar(50),
        password varchar(16),
        role smallint,
        Primary Key(uid)
);


Create Table Individual(
	inid int,
	firstName varchar(50),
	lastName varchar(50),
	nationality varchar(50),
	biography varchar(50),
	org varchar(50),
	birthDate date,

	Primary Key(inid),
	Foreign Key(inid) References Users(uid)
);

Create Table Organization(
	oid int,
	name varchar(50),
	description varchar(50),
	logo byte,
	country varchar(50),
	location varchar(50),

	Primary Key(oid),
	Foreign Key(oid) References Users(uid)
);

Create Table TelephoneInd(
	tid int;
	uid int,
	number varchar(50),
	extension int,

	Primary Key(tid),
	Foreign Key(uid) References Individual(uid) DELETE ON CASCADE
);

Create Table TelephoneOrg(
	tid int;
	oid int,
	number varchar(8),
	extension int,

	Primary Key(tid),
	Foreign Key(oid) References Organization(oid) DELETE ON CASCADE
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
	uid int,
	cantInt int,
	description varchar(100),
	category int,
	state int,

	Primary Key(iid),
	Foreign Key(uid) References Users(uid) DELETE ON CASCADE,
	Foreign Key(category) References CategoryIdea(id),
	Foreign Key(state) References StateIdea(id)
);

-- Inversionist Bookmark
Create Table InvBook(
	iid int,
	invId int,

	Primary Key(invId, iid),
	Foreign Key(iid) References Idea(iid),
	Foreign Key(invId) References Users(invId)
);

-- Give Resource
Create Table ResGive(
	rid int,
	uid int,
	description varchar(100),
	state int,
	category int,
	cantInt int,
	link varchar(150),

	Primary Key(rid),
	Foreign Key(uid) References Users(uid) DELETE ON CASCADE,
);

Create Table CategoryRes(
	id int,
	name varchar(50),

	Primary Key(id)
);

-- Get Resource
Create Table ResGet(
	rid int,
	uid int,

	Primary Key(uid, rid),
	Foreign Key(uid) References Users(uid),
	Foreign Key(rid) References ResGive(rid),
);

-- Bookmark of resources

Create Table ResBook(
	rid int,
	uid int,

	Primary Key(uid, rid),
	Foreign Key(uid) References Users(uid),
	Foreign Key(rid) References ResGive(rid),
);


/*
Chafa users

create role client LOGIN password 'client';
Grant connect on database "Prueba" to client;
GRANT SELECT, INSERT, UPDATE, DELETE ON users  TO client;

Create role admin LOGIN password 'netZRocks';
ALTER ROLE admin WITH SUPERUSER;
*/