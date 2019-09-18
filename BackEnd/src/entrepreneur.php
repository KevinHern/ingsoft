<?php
	//Libraries
	include 'connection.php';
	$option = $_POST["option"];

	//----- AGREEMENT -----//
	/*

	-- Values that $option can take: --

	LIST IDEAS, GENERAL INFO:	gi
	LIST IDEAS, IDEA DETAIL:	id

	*/
	//---------------------//

	switch ($option)
	{
		//---- LIST ENTREPRENEUR IDEAS: GENERAL INFO ----//
		case 'gi':
			/*
			INPUTS:
			1. User ID
			2. Number of Rows
			3. Page Number
			4. Idea Category

			-------------------

			RETURNS THIS:
			List of N ideas

			For each idea:
			1. Idea Title
			2. Idea ID

			*/

			$uid = $_POST["uid"];

			$numrows = $_POST["numrows"];
			$numpage = $_POST["numpage"];

			$category = $_POST["category"];

			$link = OpenConUser("e");

			$query = "SELECT iid, title FROM idea WHERE category = $category ORDER BY title";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			pg_result_seek($result, (($numpage-1) * $numrows))

			$i = 0;
			$array = array();

			while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC) && $i < $numrows)
			{
				$temp = array();

				$title = $line["title"];
				$iid = $line["iid"];

				array_push($temp, $title, $iid);

				array_push($array, $temp);
				$i = $i + 1;
			}
			
			echo json_encode($array);

			break;

		//---- LIST ENTREPRENEUR IDEAS: IDEA DETAILS ----//
		case 'id':
			/*
			INPUTS:
			1. Idea ID
			2. Number of rows
			3. Page Number

			----------------
			OUTPUTS: Array(array1, array2, ... arrayN)

			Array1: Contains Idea details
			1. Idea Title
			2. Idea Description
			3. Idea Category
			4. Idea State
			5. Number of Interested

			Array2 ... ArrayN: Contains the financists' data that has bookmarked the requested idea

			For each financist:
			1. Type of Entrepreneur
			2. Entrepreneur's Id
			3. Entrepreneur's data:

				INDIVIDUAL:
				3.1 First Name
				3.2 Last Name

				ORGANIZATION:
				3.1 Name 

			*/
			$iid = $_POST["iid"];

			$numrows = $_POST["numrows"];
			$numpage = $_POST["numpage"];

			$link = OpenConUser("e");

			$query = "SELECT I.title, I.description, CI.nombre as cin, SI.nombre as sin, I.cantInt FROM idea I, categoryIdea CI, stateidea SI WHERE I.iid = $iid AND I.category = CI.id AND I.state = SI.id";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$array = array();

			$title = $line["title"];
			$description = $line["description"];
			$cin = $line["cin"];
			$sin = $line["sin"];
			$cantInt = $line["cantInt"];

			$temp = array($title, $description, $cin, $sin, $cantInt);

			$array = array($temp);

			$query = "SELECT U.uid, U.type FROM finbook IB, users U WHERE IB.invId = U.uid AND IB.iid = $iid";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			pg_result_seek($result, (($numpage-1) * $numrows))

			while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC))
			{
				$temp = array();
				$type = $line["type"];
				$utemp = $line["uid"];

				if ($type == 1)
				{
					$query = "SELECT firstName, lastName FROM individual WHERE inid = '$utemp'";

					$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

					$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

					$firstName = $line["firstName"];
					$lastName = $line["lastName"];

					array_push($temp, 1, $utemp, $firstName, $lastName)

				}
				else
				{
					$query = "SELECT name FROM organization WHERE oid = '$utemp'";

					$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

					$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

					$name = $line["name"];

					array_push($temp, 0, $utemp, $name)
				}

				array_push($array, $temp)
			}

			echo json_encode($array);

			break;

	}

?>