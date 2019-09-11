<?php
	//Libraries
	include 'connection.php';
	$option = $_POST["option"];

	switch ($option)
	{
		//---- LIST ENTREPRENEUR IDEAS: GENERAL INFO ----//
		case 'variable':
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
			$numpages = $_POST["numpages"];}

			$category = $_POST["category"];

			$link = OpenConUser("e");

			$query = "SELECT iid, title FROM idea WHERE category = $category ORDER BY title";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			pg_result_seek($result, (($numpages-1) * $numrows))

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
			
			break;

		//---- LIST ENTREPRENEUR IDEAS: IDEA DETAILS ----//
		case 'value':
			/*
			INPUTS:
			1. Idea ID

			----------------
			OUTPUTS:
			
			1. Idea Title
			2. Idea Description
			3. Idea Category
			4. Idea State
			5. Number of Interested

			*/
			$iid = $_POST["iid"];

			$link = OpenConUser($typeuser);

			$query = "SELECT I.title, I.description, CI.nombre as cin, SI.nombre as sin, I.cantInt FROM idea I, categoryIdea CI, stateidea SI WHERE I.iid = $iid AND I.category = CI.id AND I.state = SI.id";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$array = array();

			$title = $line["title"];
			$description = $line["description"];
			$cin = $line["cin"];
			$sin = $line["sin"];
			$cantInt = $line["cantInt"];

			$array = array($title, $description, $cin, $sin, $cantInt);

			echo json_encode($array);

			break;

	}

?>