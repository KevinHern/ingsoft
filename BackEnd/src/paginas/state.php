<?php
	//Libraries
	include 'connection.php';
	include '../Permission.php';
	permission();

	/*
	$json = file_get_contents('php://input');
	//Converts it into a PHP object
    $_POST = json_decode($json, true);
    */
	/*
	INPUTS:
	None

	-------------

	OUTSPUTS:
	1. Array of States

	for each category:
	1.1 Name
	1.2 Id

	*/
	$link = OpenConUser("f");

	$query = "SELECT * FROM stateidea ORDER BY name";

	$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

	$states = array("status" => 1);

	$i = 0;

	while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC))
	{
		$name = $line["name"];
		$id = $line["id"];

		$temp1 = array("id" =>  $id, "name" => $name);

		$temp2 = array("state$i" => $temp1);
		$i = $i + 1;

		$states = array_merge($states, $temp2);
	}

	echo json_encode($states);

	CloseCon($link);

?>