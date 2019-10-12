<?php
	include 'connection.php';
	include '../getSub.php';
	permission();
	/*
	INPUTS:
	1. User Id
	*/

	$json = file_get_contents('php://input');
	//Converts it into a PHP object
    $_POST = json_decode($json, true);

	$uid = getUid($_POST['uid']);
	$info = array("status" => -1);

	$link = OpenConUser("u");

	

	try
	{
		//----- Basic User information -----//
		$query = "SELECT email, password, role, type FROM users WHERE uid = '$uid'";
		$result = pg_query($link, $query);
		$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

		$email = $line["email"];
		$password = $line["password"];
		$role = $line["role"];
		$type = $line["type"];

		$user = array("email" => $email, "password" => $password, "role" =>  $role, "userType" => ((int)$type));

		if ($type == 1)
		{
			//----- INDIVIDUAL INFORMATION -----//
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

			// Extract all Individual Data
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

			//Individual Information
			$individual = array("firstname" => $firstname, "lastname" => $lastname, "nationality" => $nationality, "biography" => $biography, "organization" => $org, "birthdate" => $birthdate);

			//Extract all phones
			$query = "SELECT * FROM telephone WHERE uid = '$uid'";
			$result = pg_query($link, $query);

			$phones = array();
			$i = 0;
			while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC))
			{
				$number = $line["number"];
				$temp = array("phone$i" => $number);
				$phones = array_merge($phones, $temp);
			}
			$phones = array("phones" => $phones);

			$info = array_merge($info, $user, $individual, $phones);
			$info["status"] = 1;
		}
		else
		{
			//----- ORGANIZATION INFORMATION -----//
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

			$user = array("email" => $email, "password" => $password, "role" =>  $role, "userType" => ((int)$type));

			$query = "SELECT * FROM organization WHERE oid = '$uid'";
			$result = pg_query($link, $query);
			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$name = $line["name"];
			$description = $line["description"];
			$country = $line["country"];
			$location = $line["location"];
			//$logo = $line["logo"];

			//Organization Information
			$organization = array('name' => $name, 'description' =>  $description, 'country' => $country, 'location' => $location);

			//Extract phone
			$query = "SELECT * FROM telephone WHERE uid = '$uid' LIMIT 1;";
			$result = pg_query($link, $query);
			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$phone = array("phone" => $line["number"]);

			$info = array_merge($info, $user, $organization, $phone);
			$info["status"] = 1;
		}

	}
	catch (Exception $e)
	{
		$info = array("status" => 0, "message" => "Ocurrió un error al extraer los datos del usuario.");
	}
	finally
	{
		CloseCon($link);
		echo json_encode($info);
	}
?>