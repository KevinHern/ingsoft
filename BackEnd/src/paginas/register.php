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
//			$phones = $_POST["phones"];

			$link = OpenConUser("u");

			try
			{
				//Extract User's Directory ID
				$query = "SELECT folderid FROM users WHERE uid = '$uid';";
				$result = pg_query($link, $query);
				$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);
				$folderid = $line["folderid"];

				CreateDir($folderid);

				//Photo 
				$name = $_FILES["photo"]["name"];
				$tmp_name = $_FILES["photo"]["tmp_name"];

				/// Register Individual
				$query = "INSERT INTO individual VALUES('$uid', '$firstname', '$lastname', '$nationality', '$biography', '$org', '$birthdate', 'img/$folderid');";
				$result = pg_query($link, $query);

				//Store Profile Picture
				$exito = StoreFile($name, $tmp_name, "profile", $folderid);

				// Change Role
				$query = "UPDATE users SET role = $role, type = 1 WHERE uid = '$uid';";
				$result = pg_query($link, $query);

				// Insert Phones
//				foreach ($phones as $phone)
//				{
//					$uid = $phone["uid"];
//					$number = $phone["number"];
//					$query = "INSERT INTO telephone VALUES('$uid', 'number');";
//					$result = pg_query($link, $query);
//				}
//
//				$json = array('status' => 1);

			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al registrar el usuario.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
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
			$phone = $_POST["phone"];

			$link = OpenConUser("u");

			try
			{
				//Extract User's Directory ID
				$query = "SELECT folderid FROM users WHERE uid = '$uid';";
				$result = pg_query($link, $query);
				$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);
				$folderid = $line["folderid"];

				CreateDir($folderid);

				//Photo
				$logoname = $_FILES["logo"]["name"];
				$tmp_name = $_FILES["logo"]["tmp_name"];

				//Register Organization
				$query = "INSERT INTO organization VALUES('$uid', '$name', '$description', '$country', '$location', 'img/$folderid') ;";
				$result = pg_query($link, $query);

				//Store Profile Picture
				$exito = StoreFile($logoname, $tmp_name, "profile", $folderid);

				// Change Role
				$query = "UPDATE users SET role = $role, type = 0 WHERE uid = '$uid';";
				$result = pg_query($link, $query);
				$query = "INSERT INTO telephone VALUES('$uid', '$phone');";
				$result = pg_query($link, $query);



                // Insert Phones
//				foreach ($phones as $phone)
//				{
//					$uid = $phone["uid"];
//					$number = $phone["number"];
//					$query = "INSERT INTO telephone VALUES('$uid', 'number');";
//					$result = pg_query($link, $query);
//				}

				$json = array('status' => 1);
			}
			catch(Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al registrar la organización.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}

			
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

			try
			{
				$query = "INSERT INTO categoryidea VALUES(DEFAULT, '$name');";
				$result = pg_query($link, $query);

				$json = array('status' => 1);
			}
			catch(Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al registrar la categoría.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}			
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

			try
			{
				$query = "INSERT INTO stateidea VALUES(DEFAULT, '$name');";
				$result = pg_query($link, $query);

				$json = array('status' => 1);
			}
			catch(Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al registrar el estado.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}	
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

			try
			{
				$query = "INSERT INTO idea VALUES(DEFAULT, '$uid', $cantInt, '$title','$description', $category, $state);";
				$result = pg_query($link, $query);
				$json = array('status' => 1);
			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al registrar la idea.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
			break;

		//---- REGISTER BOOKMARK ----//
		case 'book':
			/*
			INPUTS:
			1. Financist Id
			2. List of Ideas
				2.1 Idea's ID

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise

			*/
			$uid = getUid($_POST["uid"]);
			$ideas = $_POST["ideas"];

			$link = OpenConUser("f");

			try
			{
				foreach ($ideas as $idea)
				{
					$iid = $idea["iid"];
					$query = "INSERT INTO finbook VALUES($iid, '$uid');";
					$result = pg_query($link, $query);
					$json = array('status' => 1);
				}
				
			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al añadir la idea al bookmark.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
			break;
	}
?>