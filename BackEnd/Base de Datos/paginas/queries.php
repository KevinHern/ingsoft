<?php
	//Libraries
	include 'connection.php';
	$option = $_POST["option"];

	switch ($option)
	{

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