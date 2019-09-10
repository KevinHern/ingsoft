<?php
	//Libraries
	include 'connection.php';
	$option = $_POST["option"];

	$typeuser = $_POST["typeuser"];

	switch ($option)
	{
		//---- LIST ENTREPRENEUR IDEAS ----//
		case 'value':
			$uid = $_POST["uid"];

			$numrows = $_POST["numrows"];
			$numpages = $_POST["numpages"];

			$link = OpenConUser($typeuser);

			$query = "SELECT I.title, I.cantInt, I.description, CI.nombre as cin, SI.nombre as sin FROM idea I, categoryIdea CI, stateidea SI WHERE I.uid = '$uid' AND I.category = CI.id AND I.state = SI.id ORDER BY title";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
			pg_result_seek($result, (($numpages-1) * $numrows))

			$i = 0;
			$array = array();
			while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC) && $i < $numrows)
			{
				$title = $line["title"];
				$description = $line["description"];
				$category = $line["cin"];
				$state = $line["sin"];
				$cantInt = $line["cantInt"];

				$temp = array($title, $description, $category, $state, $cantInt);
				array_push($array, $temp);
				$i = $i + 1;
			}

			echo json_encode($array);

			break;

		//---- LIST IDEAS TO FINANCIST ----//
		case 'value':
			$category = $_POST["category"];

			$numrows = $_POST["numrows"];
			$numpages = $_POST["numpages"];

			$link = OpenConUser($typeuser);

			$query = "SELECT U.uid, U.type, I.cantInt, I.title, I.description, CI.nombre as cin, SI.nombre as sin FROM idea I, categoryIdea CI, stateidea SI, users U WHERE I.category = $category AND I.category = CI.id AND I.state = SI.id AND U.uid = I.uid ORDER BY title";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
			pg_result_seek($result, (($numpages-1) * $numrows))

			$i = 0;
			$array = array();

			while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC) && $i < $numrows)
			{
				//Obtención del nombre del autor
				$uid = $line["uid"];
				$type = $line["type"];

				if ($type == 1)
				{
					$query = "SELECT firstName, lastName FROM individual WHERE inid= '$uid'";
				}
				else
				{
					$query = "SELECT  FROM individual WHERE inid= '$uid'";
				}


				$title = $line["title"];
				$description = $line["description"];
				$category = $line["cin"];
				$state = $line["sin"];
				$cantInt = $line["cantInt"];
			}
			break;

		//---- LIST BOOKMARK ----//
		case 'value':
			# code...
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