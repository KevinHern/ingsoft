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
	2. Phone number
	3. Number's extension

	------------

	OUTPUTS:
	1. Status: 1 if success, 0 otherwise
	*/

	$number = $_POST["number"];
	$ext = $_POST["ext"];

	$link = OpenConUser("u");
	$json = "";

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
		$query = "INSERT INTO telephoneind VALUES(DEFAULT, '$uid', '$number', $ext);";
	}
	else if($type == 0)
	{
		$query = "INSERT INTO telephoneorg VALUES(DEFAULT, '$uid', '$number', $ext);";
	}
	else
	{
		$json = array('status' => 0, 'message' => "Ocurrio un error");
	}

	try
	{
		$result = pg_query($link, $query);
		$json = array('status' => 1);
	}
	catch (Exception $e)
	{
		$json = array('status' => 0, 'message' => "Ocurrio un error");
	}
	finally
	{
		echo json_encode($json);
	}

	CloseCon($link);


?>