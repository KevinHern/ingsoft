<?php
	include 'connection.php';
	$option = $_POST["option"];


	// e = entrepreneur
	// f = financist
	// r = resource
	$typeuser = $_POST["type"];


	switch ($option) {

	/*--------------------------------*/
	/*--------------USER--------------*/
	/*--------------------------------*/

		//---- REGISTER INDIVIDUAL ----//
		case '1':
			$uid = $_POST["uid"];
			$email = $_POST["email"];
			$password = $_POST["password"];
			$role = $_POST["role"];

			$link = OpenConUser($typeuser);

			$query = "INSERT INTO users VALUES('$uid', '$email', '$password', $role);";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$firstname = $_POST["firstname"];
				$lastname = $_POST["lastname"];
				$nationality = $_POST["nationality"];
				$biography = $_POST["biography"];
				$org = $_POST["org"];
				$birthdate = $_POST["birthdate"];
				$query = "INSERT INTO individual VALUES('$uid', '$firstname', '$lastname', '$nationality', '$biography', '$org', $birthdate);";

				$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}
			
			break;
		
		//---- REGISTER ORGANIZATION ----//
		case '2':
			$uid = $_POST["uid"];
			$email = $_POST["email"];
			$password = $_POST["password"];
			$role = $_POST["role"];

			$link = OpenConUser($typeuser);

			$query = "INSERT INTO users VALUES('$uid', '$email', '$password', $role);";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$name = $_POST["name"];
				$despcription = $_POST["despcription"];
				$logo = $_POST["logo"];
				$country = $_POST["country"];
				$location = $_POST["location"];

				$query = "INSERT INTO individual VALUES('$uid', '$name', '$description', '$logo', '$country', '$location');";

				$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}
			break;

		case 'option':
			
			break;

		//---- REGISTER CATEGORY IDEA ----//
		case '3':
			$id = $_POST["id"];
			$nombre = $_POST["nombre"];

			$link = OpenConAdmin();

			$query = "INSERT INTO categoryidea VALUES($id, '$nombre');";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}

			break;

		//---- REGISTER STATE IDEA ----//
		case '4':
			$id = $_POST["id"];
			$nombre = $_POST["nombre"];

			$link = OpenConAdmin();

			$query = "INSERT INTO stateidea VALUES($id, '$nombre');";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
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

			$query = "INSERT INTO idea VALUES($iid, '$uid', $cantint, '$description', $category, $state);";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}

			break;

		//---- REGISTER IND. TELEPHONE ----//
		case '5':
			$uid = $_POST["uid"];
			$tid = $_POST["tid"];
			$number = $_POST["number"];
			$extension = $_POST["extension"];

			$link = OpenConUser($typeuser);

			$query = "INSERT INTO telephoneind VALUES($tid, '$uid', '$number', extension);";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}

			break;

		//---- REGISTER ORG. TELEPHONE ----//
		case '6':
			$oid = $_POST["oid"];
			$tid = $_POST["tid"];
			$number = $_POST["number"];
			$extension = $_POST["extension"];

			$link = OpenConUser($typeuser);

			$query = "INSERT INTO telephoneorg VALUES($tid, '$oid', '$number', extension);";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}

			break;

		//---- REGISTER BOOKMARK ----//
		case 'bookmark':
			$iid = $_POST["iid"];
			$invid = $_POST["invid"];

			$link = OpenConUser($typeuser);

			$query = "INSERT INTO invbook VALUES($iid, '$invid');";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}

			break;
	}
?>