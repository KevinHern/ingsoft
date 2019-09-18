<?php
	/*
	INPUTS:
	1. User Id

	*/
	include 'connection.php';
	$uid = $_POST["uid"];

	$query = "SELECT email, role, type FROM users WHERE uid = '$uid'";

	$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

	$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

	$array = array();

	$type = $line["type"];
	$role = $line["role"];

	//----- INDIVIDUAL INFORMATION -----//
	if ($type == 1)
	{
		/*
		OUTPUTS:
		1. User type
		2. User role
		3. User's First Name
		4. User's Last Name
		5. Nationality
		6. Biography
		7. Organization afiliated
		8. Birthday
		9. User's photo
		*/
		$query = "SELECT * FROM individual WHERE inid = '$uid'";
		$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
		$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

		$firstName = $_POST["firstName"];
		$lastName = $_POST["lastName"];
		$nationality = $_POST["nationality"];
		$biography = $_POST["biography"];
		$org = $_POST["org"];
		$birthdate = $_POST["birthdate"];
		$photo = $_POST["photo"];

		array_push($array, $type, $role, $firstName, $lastName, $nationality, $biography, $org, $birthdate, $photo);
	}
	else
	{
		/*
		OUTPUTS:
		1. Organization's Name
		2. Organization's Description
		3. Organization's Logo
		4. Organization's Country
		5. Organization's location
		*/
		$query = "SELECT * FROM organization WHERE oid = '$uid'";
		$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
		$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

		$name = $_POST["name"];
		$description = $_POST["description"];
		$logo = $_POST["logo"];
		$country = $_POST["country"];
		$location = $_POST["location"];
	}
	
	echo json_encode($array);
?>