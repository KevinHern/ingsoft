<?php
	include 'connection.php';

	/*
	INPUTS:
	1. User Id
	*/

	$json = file_get_contents('php://input');
	//Converts it into a PHP object
    $_POST = json_decode($json, true);

	$link = OpenConUser("u");

	$uid = $_POST["uid"];

	//----- Basic User information -----//
	$query = "SELECT email, password, role, type FROM users WHERE uid = '$uid'";
	$result = pg_query($link, $query);
	$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

	

	$email = $line["email"];
	$password = $line["password"];
	$role = $line["role"];
	$type = $line["type"];

	$info = array("status" => -1);

	$user = array("email" => $email, "password" => $password, "role" =>  $role);
	
	//----- INDIVIDUAL INFORMATION -----//
	if ($type == 1)
	{
		/*
		OUTPUTS:
		1. Status: 1 if success, 0 if failure, -1 if crash
		2. Email
		3. Password
		4. Role
		5. First Names
		6. Last Names
		7. Nationality
		8. Biography
		9. Afiliated Organization
		10. Birthdate
		*/
		try {
			$query = "SELECT * FROM individual WHERE inid = '$uid'";
			$result = pg_query($link, $query);
			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$firstname = $line["firstname"];
			$lastname = $line["lastname"];
			$nationality = $line["nationality"];
			$biography = $line["biography"];
			$org = $line["org"];
			$birthdate = $line["birthdate"];
			//$photo = $line["photo"];

			$individual = array("firstname" => $firstname, "lastname" => $lastname, "nationality" => $nationality, "biography" => $biography, "organization" => $org, "birthdate" => $birthdate);

			$info = array_merge($info, $user, $individual);
			$info["status"] = 1;
		}
		catch (Exception $e) {
			echo "error";
			$info["status"] = 0;
		}
		finally
		{
			echo json_encode($info);
		}
	}
	else
	{
		/*
		OUTPUTS:
		1. Status: 1 if success, 0 if failure, -1 if crash
		2. Email
		3. Password
		4. Role
		5. Name
		6. Description
		7. Country
		8. location
		9. Logo
		*/
		try {
			$query = "SELECT * FROM organization WHERE oid = '$uid'";
			$result = pg_query($link, $query);
			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$name = $line["name"];
			$description = $line["description"];
			$country = $line["country"];
			$location = $line["location"];
			//$logo = $line["logo"];

			$organization = array('name' => $name, 'description' =>  $description, 'country' => $country, 'location' => $location);

			$info = array_merge($info, $user, $organization);
			$info["status"] = 1;
		}
		catch (Exception $e) {
			echo "error";
			$info["status"] = 0;
		}
		finally
		{
			echo json_encode($info);
		}
	}
?>