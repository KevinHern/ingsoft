<?php
	include 'connection.php';


	//function: Get category ideas
	function GetCategories($role)
	{
		/*
		INPUTS:
		1. Role of user

		-------------

		OUTSPUTS:
		1. Array of Categories

		for each category:
		1.1 Name
		1.2 Id

		*/
		$link = OpenConUser($role);

		$query = "SELECT * FROM categoryidea ORDER BY name";

		$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

		$array = array();

		while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC))
		{
			$name = $line["name"];
			$id = $line["id"];

			$temp = array($name, $id);

			array_push($array, $temp)
		}

		CloseCon($link);

		return $array;
	}


?>