<?php
	//Libraries
	include 'connection.php';
	$option = $_POST["option"];

	switch ($option)
	{

		//---- LIST IDEAS TO FINANCIST  ----//
		case 'value':
			/*
			INPUTS:
			1. Idea Category
			2. Number of Rows
			3. Number of Pages

			------------

			OUTPUTS:
			1. Entrepreneur's data:

				Individual:
				1.1 First Name
				1.2 Last Name

				Organization:
				1.1 Name
			2. Idea Title
			3. Idea Description
			4. Idea ID

			*/

			$category = $_POST["category"];

			$numrows = $_POST["numrows"];
			$numpages = $_POST["numpages"];

			$link = OpenConUser("f");

			$query = "SELECT iid, title, description FROM idea WHERE category = $category ORDER BY title";

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
					$query = "SELECT firstName, lastName FROM individual WHERE inid= '$uid'";
					$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
					$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

					$fname = $line["firstName"];
					$lname = $line["lastName"];
					$t = array($fname, $lname);
					array_push($temp, $t);
				}
				else
				{
					$query = "SELECT name FROM organization WHERE oid = '$uid'";
					$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
					$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

					$name = $line["name"];
					$t = array($name);
					array_push($temp, $t);
				}

				$title = $line["title"];
				$description = $line["description"];
				$iid = $line["iid"];

				array_push($temp, $title, $description, $iid);
				array_push($array, $temp);
			}

			echo json_encode($array);
			break;

		//---- LIST BOOKMARK IDEAS: GENERAL INFO ----//
		case 'value':
			/*
			INPUTS:
			1. Financist Id
			2. Idea Category
			3. Number of rows
			4. Page Number

			------------

			OUTPUTS:			
			List of N ideas:

			For each idea:
			1. Idea Title
			2. Idea Id
			*/

			$category = $_POST["category"];

			$numrows = $_POST["numrows"];
			$numpages = $_POST["numpages"];

			//-- Obtain Financist id
			$uid = $_POST["uid"];

			$link = OpenConUser("f");

			$query = "SELECT I.title, I.iid FROM invbook IB, idea I WHERE IB.iid = I.iid AND IB.invId = '$uid' AND I.category = $category";

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
			/* 
			INPUTS:
			1. Idea Id

			-------------

			OUTPUTS:

			1. Type of entrepreneur user (Individual/Organization)
			2. Entrepreneur's data (Array)

				INDIVIDUAL:
				2.1 First Name
				2.2 Last Name
				2.3 Photo

				ORGANIZATION:
				2.1 Name
				2.2 Logo

			3. Entrepreneur's Id
			4. Idea Title
			5. Idea Description
			6. Idea Category
			7. Idea State
			8. Number of Interested

			*/

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
?>