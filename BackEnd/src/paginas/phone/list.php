<?php
	//Libraries
	include '../connection.php';

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
		1.1 Phone's number
		1.2 Phone's extension
	*/

	$link = OpenConUser("u");

	$uid = $_POST["uid"];
	$phones = array('status' => 0);
	try
	{
		$query = "SELECT * FROM telephone WHERE uid = '$uid' ORDER BY number;";
		$result = pg_query($link, $query);
		$i = 0;
		
		while ($line = pg_fetch_array($result, NULL, PGSQL_ASSOC))
		{
			$number = $line["number"];
			$extension = $line["extension"];

			$temp1 = array("number" => $number, "extension" => $extension);

			$temp2 = array("phone$i" => $temp1);
			$i = $i + 1;

			$phones = array_merge($phones, $temp2);
		}
		$phones["status"] = 1;
	}
	catch (Exception $e)
	{
		$phones = array('status' => 0, 'message' => "Ocurrio un error");
	}
	finally
	{
		echo json_encode($phones);
	}

	CloseCon($link);


?>