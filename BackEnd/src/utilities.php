<?php
	//include 'connection.php';

	//Functions that map a given parameter to a respective table field 
	function MapUser($parameter, $val)
	{
		$str;
		switch ($parameter)
		{
			case 'e':
				$str = "email = '$val'";
				break;

			case 'p':
				$str = "password = '$val'";
				break;

			case 'r':
				$str = "role = $val";
				break;
			
		}

		return $str;
	}

	function MapIndividual($parameter)
	{
		$str;
		switch ($parameter)
		{
			case 'f':
				$str = "firstname";
				break;

			case 'l':
				$str = "lastname";
				break;

			case 'n':
				$str = "nationality";
				break;

			case 'b':
				$str = "biography";
				break;

			case 'o':
				$str = "org";
				break;

			case 'bd':
				$str = "birthdate";
				break;
			
		}

		return $str;
	}

	function MapOrganization($parameter)
	{
		$str;
		switch ($parameter)
		{
			case 'n':
				$str = "name";
				break;

			case 'd':
				$str = "description";
				break;
			
			case 'c':
				$str = "country";
				break;

			case 'l':
				$str = "location";
				break;
		}

		return $str;
	}

	function MapTelephone($parameter, $val)
	{
		$str;
		switch ($parameter)
		{
			case 'n':
				$str = "number = '$val'";
				break;

			case 'e':
				$str = "extension = $val";
				break;
		}

		return $str;
	}

	function MapIdea($parameter, $val)
	{
		$str;
		switch ($parameter)
		{
			case 't':
				$str = "title = '$val'";
				break;

			case 'd':
				$str = "description = '$val'";
				break;

			case 'c':
				$str = "category = $val";
				break;

			case 's':
				$str = "state = $val";
				break;
		}

		return $str;
	}

	function MapIdeaMisc($parameter)
	{
		$str;
		switch ($parameter)
		{
			case 'n':
				$str = "name";
				break;
		}

		return $str;
	}

	/*
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

		
		$link = OpenConUser($role);

		$query = "SELECT * FROM categoryidea ORDER BY name";

		$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

		$array = array();

		while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC))
		{
			$name = $line["name"];
			$id = $line["id"];

			$temp = array($name, $id);

			array_push($array, $temp);
		}

		CloseCon($link);

		return $array;
	}*/


?>