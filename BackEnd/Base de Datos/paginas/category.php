<?php
	include 'connection.php';
	/*
	INPUTS:
	None

	-------------

	OUTSPUTS:
	1. Array of Categories

	for each category:
	1.1 Name
	1.2 Id

	*/
	$link = OpenConUser("f");

	$query = "SELECT * FROM categoryidea ORDER BY name";

	$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

	$categories = array();

	$i = 0;

	while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC))
	{
		$name = $line["name"];
		$id = $line["id"];

		$temp1 = array("id" =>  $id, "name" => $name);

		$temp2 = array("category$i" => $temp1);
		$i = $i + 1;

		$categories = array_merge($categories, $temp2);
	}

	echo json_encode($categories);

	CloseCon($link);

?>