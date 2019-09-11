<?php
	//Libraries
	include 'connection.php';
	$option = $_POST["option"];

	switch ($option)
	{

		//---- LIST IDEAS TO FINANCIST: GENERAL INFO ----//
		case 'value':
			/*
			INPUTS:
			1. Idea Category
			2. Number of Rows
			3. Number of Pages

			------------

			OUTPUTS:
			List of N ideas:


			*/

			$category = $_POST["category"];

			$numrows = $_POST["numrows"];
			$numpages = $_POST["numpages"];

			$link = OpenConUser("f");

			$query = "SELECT iid, title FROM idea WHERE category = $category ORDER BY title";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			pg_result_seek($result, (($numpages-1) * $numrows))

			$i = 0;
			$array = array();

			while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC) && $i < $numrows)
			{
				$uid = $line["uid"];
				$type = $line["type"];
				$temp = array();
				if ($type == 1)
				{
					$query = "SELECT firstName, lastName, photo FROM individual WHERE inid= '$uid'";
					$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
					$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

					$fname = $line["firstName"];
					$lname = $line["lastName"];
					$photo = $line["photo"];
					$t = array($fname, $lname, $photo);
					array_push($temp, $t);
				}
				else
				{
					$query = "SELECT name, logo FROM organization WHERE oid = '$uid'";
					$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
					$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

					$name = $line["name"];
					$logo = $line["logo"];
					$t = array($name, $logo);
					array_push($temp, $t);
				}

				$title = $line["title"];
				$description = $line["description"];
				$category = $line["cin"];
				$state = $line["sin"];
				$cantInt = $line["cantInt"];

				array_push($temp, $title, $description, $category, $state, $cantInt);
				array_push($array, $temp);
			}
			break;

		//---- LIST BOOKMARK IDEAS: GENERAL INFO ----//
		case 'value':
			/*RETURNS THIS:
			- List of N ideas

			For each Idea:

			Idea Data (array)
				1.1 Idea Title
				1.2 Idea ID				

			*/
			$typeuser = $_POST["typeuser"];

			$category = $_POST["category"];

			$numrows = $_POST["numrows"];
			$numpages = $_POST["numpages"];

			//-- Obtener Financist id
			$invid = $_POST["invid"];

			$link = OpenConUser($typeuser);

			$query = "SELECT I.title, I.iid FROM invbook IB, idea I WHERE IB.iid = I.iid AND I.category = $category";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			pg_result_seek($result, (($numpages-1) * $numrows))

			$i = 0;
			$array = array();
			
			while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC) && $i < $numrows)
			{
				$temp = array();

				$title = $_POST["title"];
				$iid = $_POST["iid"];

				array_push($temp, $title, $iid);

				array_push($array, $temp);
			}

			echo json_encode($array);

			break;

		//---- LIST BOOKMARK IDEAS: SHOW IDEA INFO ----//
		case 'variable':
			/* RETURNS IN THIS ORDER:

			1. Type of user
			2. Entrepreneur's data (Array)

				INDIVIDUAL:
				2.1 First Name
				2.2 Last Name
				2.3 Photo

				ORGANIZATION:
				2.1 Name
				2.2 Logo

			3. User Id
			4. Title
			5. Description
			6. Idea Category
			7. Idea State
			8. Number of Interested

			*/

			//-- GET or POST?
			$typeuser = $_POST["typeuser"];
			$iid = $_POST["iid"];

			$link = OpenConUser($typeuser);

			$query = "SELECT U.uid, U.type, I.title, I.description, I.category, I.state, I.cantInt FROM idea I, users U WHERE iid = $iid AND U.uid = I.uid";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$array = array();

			$uid = $line["uid"];
			$type = $line["type"];
			$title = $line["title"];
			$description = $line["description"];
			$category = $line["category"];
			$state = $line["state"];
			$cantInt = $line["cantInt"];

			$temp = array();
			if ($type == 1)
			{	
				
				$query = "SELECT firstName, lastName, photo FROM individual WHERE inid = '$uid'";

				$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

				$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

				$firstName = $line["firstName"];
				$lastName = $line["lastName"];
				$photo = $line["photo"];

				array_push($temp, $firstName, $lastName, $photo);
				array_push($array, 1, $temp);
			}
			else
			{
				$query = "SELECT name, logo FROM organization WHERE oid = '$uid'";

				$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

				$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

				$name = $line["name"];
				$logo = $line["logo"];

				array_push($temp, $name, $logo);
				array_push($array, 0, $temp);
			}

			array_push($array, $uid, $title, $description, $category, $state, $cantInt);

			echo json_encode($array);

			break;

		//---- LIST CATEGORY IDEAS ----//
		case 'value':
			$link = OpenConAdmin($typeuser);

			$query = "SELECT name FROM stateidea ORDER BY id";
			
			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			$array = array();

			while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC))
			{
				$name = $line["name"];
				array_push($array, $name);
			}

			echo json_encode($array);
			break;

		//---- LIST STATE IDEAS ----//
		case 'value':
			$link = OpenConAdmin($typeuser);

			$query = "SELECT name FROM categoryidea ORDER BY id";
			
			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			$array = array();

			while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC))
			{
				$name = $line["name"];
				array_push($array, $name);
			}

			echo json_encode($array);
			break;
		
	}

?>