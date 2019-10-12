<?php
	//Libraries
	include 'connection.php';
	include 'imgdirectory.php';
	include '../getSub.php';
	permission();



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
			1. User's ID
			2. User's email
			3. User's password

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/

			$uid = $_POST["uid"];
			$email = $_POST["email"];
			$password = $_POST["password"];
			$role = $_POST["role"];

			$link = OpenConUser("u");

			$query = "INSERT INTO users () VALUES('$uid', '$email', '$password', 0, DEFAULT, 1);";

			$result = pg_query($link, $query);

			if ($result)
			{
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0, "message" => "Ocurrió un error, dato ya ingresado");
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

			$uid = getUid($_POST["uid"]);
			$firstname = $_POST["firstname"];
			$lastname = $_POST["lastname"];
			$nationality = $_POST["nationality"];
			$biography = $_POST["biography"];
			$org = $_POST["organization"];
			$birthdate = $_POST["birthdate"];
			$role = $_POST["role"];
			$phones = $_POST["phones"];

			$link = OpenConUser("u");

			$query = "SELECT folderid FROM users WHERE uid = '$uid';";

			$result = pg_query($link, $query);

			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$folderid = $line["folderid"];

			CreateDir($folderid);

			//Photo 
			$name = $_FILES["photo"]["name"];
			$tmp_name = $_FILES["photo"]["tmp_name"];

			try
			{
				/// Register Individual
				$query = "INSERT INTO individual VALUES('$uid', '$firstname', '$lastname', '$nationality', '$biography', '$org', '$birthdate', 'img/$folderid');";
				$result = pg_query($link, $query);

				//Store Profile Picture
				$exito = StoreFile($name, $tmp_name, "profile", $folderid);

				// Change Role
				$query = "UPDATE users SET role = $role WHERE uid = '$uid';";
				$result = pg_query($link, $query);

				// Insert Phones
				foreach ($phones as $phone)
				{ 
					$uid = $phone["uid"];
					$number = $phone["number"];
					$query = "INSERT INTO telephone VALUES('$uid', 'number');";
					$result = pg_query($link, $query);
				}

				$json = array('status' => 1);

			}
			catch (Exception $e)
			{
				$json = array('status' => 0);
				$json = array('message' => "Ocurrió un error al registrar el usuario.");
			}
			finally
			{
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

			$uid = getUid($_POST["uid"]);
			$name = $_POST["name"];
			$description = $_POST["description"];
			$country = $_POST["country"];
			$location = $_POST["location"];
			$role = $_POST["role"];
			$phones = $_POST["phones"];

			$link = OpenConUser("u");

			$query = "SELECT folderid FROM users WHERE uid = '$uid';";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$folderid = $line["folderid"];

			CreateDir($folderid);

			//Photo
			$logoname = $_FILES["logo"]["name"];
			$tmp_name = $_FILES["logo"]["tmp_name"];

			try
			{
				//Register Organization
				$query = "INSERT INTO organization VALUES('$uid', '$name', '$description', '$country', '$location', 'img/$folderid') ;";
				$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

				//Store Profile Picture
				$exito = StoreFile($logoname, $tmp_name, "profile", $folderid);

				// Change Role
				$query = "UPDATE users SET role = $role WHERE uid = '$uid';";
				$result = pg_query($link, $query);

				// Insert Phones
				foreach ($phones as $phone)
				{ 
					$uid = $phone["uid"];
					$number = $phone["number"];
					$query = "INSERT INTO telephone VALUES('$uid', 'number');";
					$result = pg_query($link, $query);
				}

				$json = array('status' => 1);
			}
			catch(Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al registrar la organización.");
			}
			finally
			{
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

			$uid = getUid($_POST["uid"]);
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
			$iid = getUid($_POST["iid"]);
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