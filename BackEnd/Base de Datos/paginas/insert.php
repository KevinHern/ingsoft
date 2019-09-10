<?php
	//Libraries
	include 'connection.php';
	include 'imgdirectory.php';


	$option = $_POST["option"];

	//----- AGREEMENT -----//
	/*

	-- Values that $option can take: --

	REGISTER INDIVIDUAL: 		ind
	REGISTER ORGANIZATION: 		org
	REGISTER CATEGORY IDEA:		catid
	REGISTER STATE IDEA:		staid
	REGISTER IDEA:				idea
	REGISTER IND. TELEPHONE:	indtel
	REGISTER ORD. TELEPHONE:	orgtel
	REGISTER BOOKMARK:			book

	-- Values that $typeuser can take: --

	e = entrepreneur
	f = financist
	r = resource

	*/
	//---------------------//

	
	$typeuser = $_POST["type"];


	switch ($option) {

	/*--------------------------------*/
	/*--------------USER--------------*/
	/*--------------------------------*/

		//---- REGISTER INDIVIDUAL ----//
		case 'ind':
			$uid = $_POST["uid"];
			$email = $_POST["email"];
			$password = $_POST["password"];
			$role = $_POST["role"];
			$folderid = $_POST["folderid"];

			$link = OpenConUser($typeuser);

			$query = "INSERT INTO users VALUES('$uid', '$email', '$password', $role, $folderid, 0);";
			CreateDir($folderid);

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$firstname = $_POST["firstname"];
				$lastname = $_POST["lastname"];
				$nationality = $_POST["nationality"];
				$biography = $_POST["biography"];
				$org = $_POST["org"];
				$birthdate = $_POST["birthdate"];

				//Photo
				$name = $_FILES["photo"]["name"];
				$tmp_name = $_FILES["photo"]["tmp_name"];

				$query = "INSERT INTO individual VALUES('$uid', '$firstname', '$lastname', '$nationality', '$biography', '$org', $birthdate, 'img/$folderid');";

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
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}
			
			break;
		
		//---- REGISTER ORGANIZATION ----//
		case 'org':
			$uid = $_POST["uid"];
			$email = $_POST["email"];
			$password = $_POST["password"];
			$role = $_POST["role"];
			$folderid = $_POST["folderid"];

			$link = OpenConUser($typeuser);

			$query = "INSERT INTO users VALUES('$uid', '$email', '$password', $role, $folderid, 1);";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$name = $_POST["name"];
				$despcription = $_POST["despcription"];
				$logo = $_POST["logo"];
				$country = $_POST["country"];
				$location = $_POST["location"];

				//Logo
				$name = $_FILES["logo"]["name"];
				$tmp_name = $_FILES["logo"]["tmp_name"];

				$query = "INSERT INTO individual VALUES('$uid', '$name', '$description', 'img/$folderid', '$country', '$location');";

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
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}
			break;

		case 'option':
			
			break;

		//---- REGISTER CATEGORY IDEA ----//
		case 'catid':
			$id = $_POST["id"];
			$nombre = $_POST["nombre"];

			$link = OpenConAdmin();

			$query = "INSERT INTO categoryidea VALUES($id, '$nombre');";

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

			break;

		//---- REGISTER STATE IDEA ----//
		case 'staid':
			$id = $_POST["id"];
			$nombre = $_POST["nombre"];

			$link = OpenConAdmin();

			$query = "INSERT INTO stateidea VALUES($id, '$nombre');";

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

			break;

		//---- REGISTER IDEA ----//
		case 'idea':
			$iid = $_POST["iid"];
			$uid = $_POST["uid"];
			$cantint = 0;
			$description = $_POST["description"];
			$category = $_POST["category"];
			$state = $_POST["state"];

			$link = OpenConUser($typeuser);

			$query = "INSERT INTO idea VALUES($iid, '$uid', $cantint, '$title','$description', $category, $state);";

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

			break;

		//---- REGISTER IND. TELEPHONE ----//
		case 'indtel':
			$uid = $_POST["uid"];
			$tid = $_POST["tid"];
			$number = $_POST["number"];
			$extension = $_POST["extension"];

			$link = OpenConUser($typeuser);

			$query = "INSERT INTO telephoneind VALUES($tid, '$uid', '$number', extension);";

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

			break;

		//---- REGISTER ORG. TELEPHONE ----//
		case 'orgtel':
			$oid = $_POST["oid"];
			$tid = $_POST["tid"];
			$number = $_POST["number"];
			$extension = $_POST["extension"];

			$link = OpenConUser($typeuser);

			$query = "INSERT INTO telephoneorg VALUES($tid, '$oid', '$number', extension);";

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

			break;

		//---- REGISTER BOOKMARK ----//
		case 'book':
			$iid = $_POST["iid"];
			$invid = $_POST["invid"];

			$link = OpenConUser($typeuser);

			$query = "INSERT INTO invbook VALUES($iid, '$invid');";

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

			break;
	}
?>