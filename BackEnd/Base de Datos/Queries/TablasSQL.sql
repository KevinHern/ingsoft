Create Table Users(
    uid varchar(30),
    email varchar(50),
    password varchar(16),
    role smallint,
    folderId serial,
    type int,
    Primary Key(uid)
);

-- type = 1
Create Table Individual(
	inid varchar(30),
	firstName varchar(50),
	lastName varchar(50),
	nationality varchar(50),
	biography varchar(50),
	org varchar(50),
	birthDate date,
	photo varchar(50),

	Primary Key(inid),
	Foreign Key(inid) References Users(uid) ON DELETE CASCADE
);

-- type = 0
Create Table Organization(
	oid varchar(30),
	name varchar(50),
	description varchar(50),
	country varchar(50),
	location varchar(50),
	logo varchar(50),

	Primary Key(oid),
	Foreign Key(oid) References Users(uid) ON DELETE CASCADE
);

Create Table Telephone(
	uid varchar(30),
	number varchar(12),
	extension int,

	Primary Key(extension, number),
	Foreign Key(uid) References Users(uid) ON DELETE CASCADE
);

Create Table CategoryIdea(
	id serial,
	name varchar(20),

	Primary Key(id)
);

Create Table StateIdea(
	id serial,
	name varchar(20),

	Primary Key(id)
);

Create Table Idea(
	iid serial,
	uid varchar(30),
	cantInt int,
	title varchar(20),
	description varchar(100),
	category bigint,
	state bigint,

	Primary Key(iid),
	Foreign Key(uid) References Users(uid) ON DELETE CASCADE,
	Foreign Key(category) References CategoryIdea(id) ON DELETE CASCADE,
	Foreign Key(state) References StateIdea(id) ON DELETE CASCADE
);

-- Inversionist Bookmark
Create Table FinBook(
	iid bigint,
	finId varchar(30),

	Primary Key(finId, iid),
	Foreign Key(iid) References Idea(iid) ON DELETE CASCADE,
	Foreign Key(finId) References Users(uid) ON DELETE CASCADE
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
*/
/* ROLES */

--- Administrator ---
Create role admin LOGIN password 'netZRocks';
ALTER ROLE admin WITH SUPERUSER;

--- Ordinary User ---
CREATE ROLE orduser LOGIN password 'netzorduser';
GRANT CONNECT ON DATABASE "NetZ" to orduser;
GRANT SELECT, INSERT, UPDATE, DELETE ON users, individual, organization, telephone TO orduser;
GRANT USAGE, SELECT ON SEQUENCE users_folderid_seq to orduser;

--- Entrepreneur ---
CREATE ROLE entrepreneur LOGIN password 'netzentrepreneur';
GRANT CONNECT ON DATABASE "NetZ" to entrepreneur;
GRANT SELECT, INSERT, UPDATE, DELETE ON users, individual, organization, telephone, idea TO entrepreneur;
GRANT SELECT ON categoryidea, stateidea, finBook TO entrepreneur;
GRANT USAGE, SELECT ON SEQUENCE idea_iid_seq to entrepreneur;

--- Financist ---
CREATE ROLE financist LOGIN password 'netzfinancist';
GRANT CONNECT ON DATABASE "NetZ" to financist;
GRANT SELECT, INSERT, UPDATE, DELETE ON users, individual, organization, telephone, finBook TO financist;
GRANT SELECT ON idea, categoryidea, stateidea TO financist;

--- Resource Business Guy ---
CREATE ROLE resource LOGIN password 'netzresource';
GRANT CONNECT ON DATABASE "NetZ" to resource;
GRANT SELECT, INSERT, UPDATE, DELETE ON users, individual, organization, telephone, resgive, resget TO resource;
GRANT SELECT ON categoryres TO resource;