<?php
	//Libraries
	include 'connection.php';
	include 'imgdirectory.php';


	$option = $_POST["option"];

	//----- AGREEMENT -----//
	/*

	-- Values that $option can take: --

	REGISTER USER 				user
	REGISTER INDIVIDUAL: 		ind
	REGISTER ORGANIZATION: 		org
	REGISTER CATEGORY IDEA:		catid
	REGISTER STATE IDEA:		staid
	REGISTER IDEA:				idea
	REGISTER IND. TELEPHONE:	indtel
	REGISTER ORD. TELEPHONE:	orgtel
	REGISTER BOOKMARK:			book

	*/
	//---------------------//


	switch ($option) {

	/*--------------------------------*/
	/*--------------USER--------------*/
	/*--------------------------------*/

		//---- REGISTER USER ----//
		case 'user':
			/*
			INPUTS:
			1. Entrepreneur's ID
			2. Entrepreneur's email
			3. Entrepreneur's password
			4. Entrepreneur's role
			5. Entrepreneur's folder id
			6. User's role

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/

			$uid = $_POST["uid"];
			$email = $_POST["email"];
			$password = $_POST["password"];
			$role = $_POST["role"];

			$link = OpenConUser("u");

			$query = "INSERT INTO users () VALUES('$uid', '$email', '$password', $role, DEFAULT, 1);";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}
			
			CloseCon($link);
			break;

		//---- REGISTER INDIVIDUAL ----//
		case 'ind':
			/*
			INPUTS:
			0. Individual's uid
			1. Individual's first name
			2. Individual's last name
			3. Individual's nationality
			4. Individual's biography
			5. Individual's afiliated organization
			6. Individual's birthday
			7. Individual's photo

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/

			$uid = $_POST["uid"];
			$firstname = $_POST["firstName"];
			$lastname = $_POST["lastName"];
			$nationality = $_POST["nationality"];
			$biography = $_POST["biography"];
			$org = $_POST["org"];
			$birthdate = $_POST["birthdate"];

			$link = OpenConUser("u");

			$query = "SELECT folderid FROM users WHERE uid = '$uid';";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$folderid = $line["folderid"];

			CreateDir($folderid);

			//Photo
			$name = $_FILES["photo"]["name"];
			$tmp_name = $_FILES["photo"]["tmp_name"];

			$query = "INSERT INTO individual VALUES('$uid', '$firstname', '$lastname', '$nationality', '$biography', '$org', '$birthdate', 'img/$folderid') ;";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$exito = StoreFile($name, $tmp_name, "profile", $folderid);
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}

			CloseCon($link);
			break;
		
		//---- REGISTER ORGANIZATION ----//
		case 'org':
			/*
			INPUTS:
			1. Organization's ID
			2. Organization's email
			3. Organization's password
			4. Organization's role
			5. Organization's folder id
			6. User's role

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise

			*/

			$uid = $_POST["uid"];
			$name = $_POST["name"];
			$description = $_POST["description"];
			$country = $_POST["country"];
			$location = $_POST["location"];

			$link = OpenConUser("u");

			$query = "SELECT folderid FROM users WHERE uid = '$uid';";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$folderid = $line["folderid"];

			CreateDir($folderid);

			//Photo
			$logoname = $_FILES["logo"]["name"];
			$tmp_name = $_FILES["logo"]["tmp_name"];

			$query = "INSERT INTO organization VALUES('$uid', '$name', '$description', '$country', '$location', 'img/$folderid') ;";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$exito = StoreFile($logoname, $tmp_name, "profile", $folderid);
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}

			CloseCon($link);
			break;

		//---- REGISTER CATEGORY IDEA ----//
		case 'catid':
			/*
			INPUTS:
			1. Category's name

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/

			$name = $_POST["name"];

			$link = OpenConAdmin();

			$query = "INSERT INTO categoryidea VALUES(DEFAULT, '$name');";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}
			CloseCon($link);
			break;

		//---- REGISTER STATE IDEA ----//
		case 'staid':
			/*
			INPUTS:
			1. State's name

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise

			*/

			$name = $_POST["name"];

			$link = OpenConAdmin();

			$query = "INSERT INTO stateidea VALUES(DEFAULT, '$name');";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}
			CloseCon($link);
			break;

		//---- REGISTER IDEA ----//
		case 'idea':
			/*
			INPUTS:
			1. Entrepreneur's ID
			2. Idea's name
			3. Idea's description
			4. Idea's category
			5. Idea's state

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise

			*/

			$uid = $_POST["uid"];
			$cantInt = 0;
			$title = $_POST["title"];
			$description = $_POST["description"];
			$category = $_POST["category"];
			$state = $_POST["state"];

			$link = OpenConUser("e");

			$query = "INSERT INTO idea VALUES(DEFAULT, '$uid', $cantInt, '$title','$description', $category, $state);";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}

			CloseCon($link);
			break;

		//---- REGISTER IND. TELEPHONE ----//
		case 'indtel':
			/*
			INPUTS:
			1. User's ID
			2. Telephone number
			3. Number extension

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise

			*/

			$uid = $_POST["uid"];
			$number = $_POST["number"];
			$extension = $_POST["extension"];

			$link = OpenConUser("u");

			$query = "INSERT INTO telephoneind VALUES(DEFAULT, '$uid', '$number', $extension);";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}

			CloseCon($link);
			break;

		//---- REGISTER ORG. TELEPHONE ----//
		case 'orgtel':
			/*
			INPUTS:
			1. User's ID
			2. Telephone number
			3. Number extension

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise

			*/

			$uid = $_POST["uid"];

			$number = $_POST["number"];
			$extension = $_POST["extension"];

			$link = OpenConUser("u");

			$query = "INSERT INTO telephoneorg VALUES(DEFAULT, '$uid', '$number', $extension);";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}

			CloseCon($link);
			break;

		//---- REGISTER BOOKMARK ----//
		case 'book':
			/*
			INPUTS:
			1. Idea's ID
			2. Financist Id

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise

			*/
			$iid = $_POST["iid"];
			$finId = $_POST["finId"];

			$link = OpenConUser("f");

			$query = "INSERT INTO finbook VALUES($iid, '$finId');";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}

			CloseCon($link);
			break;
	}
?>