<?php
	//Libraries
	include 'connection.php';

	/*
	$json = file_get_contents('php://input');
	//Converts it into a PHP object
    $_POST = json_decode($json, true);
    */

	/*
	INPUTS:
	1. User's ID

	------------

	OUTPUTS: List of phones
	1. Phone
		1.1 Phone's id
		1.2 Phone's number
		1.3 Phone's extension
	*/

	$link = OpenConUser("u");

	$uid = $_POST["uid"];
	$query = "SELECT type FROM users WHERE uid = '$uid'";
	$type;
	try
	{
		$result = pg_query($link, $query);
		$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);
		$type = $line["type"];
	}
	catch (Exception $e)
	{
		$type = -1;
	}

	if ($type)
	{
		$query = "SELECT * FROM telephoneind WHERE uid = '$uid' ORDER BY number;";
	}
	else if($type == 0)
	{
		$query = "SELECT * FROM telephoneorg WHERE oid = '$uid' ORDER BY number;";
	}
	else
	{
		$phones = array('status' => 0, 'message' => "Ocurrio un error");
	}

	try
	{
		$phones = array('status' => 1);

		$result = pg_query($link, $query);
		$i = 0;
		while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC))
		{
			$id = $line["id"];
			$number = $line["number"];
			$extension = $line["extension"];

			$temp1 = array("id" =>  $id, "number" => $number, "extension" => $extension);

			$temp2 = array("phone$i" => $temp1);
			$i = $i + 1;

			$categories = array_merge($categories, $temp2);
		}
	}
	catch (Exception $e)
	{
		$phones = array('status' => 0, 'message' => "Ocurrio un error");
	}
	finally
	{
		echo json_encode($json);
	}

	CloseCon($link);


?>