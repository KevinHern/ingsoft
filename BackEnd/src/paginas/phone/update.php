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
	2. List of Phones:
		2.1 Phone number
		2.2 Phone extension

	------------

	OUTPUTS:
	1. Status: 1 if success, 0 otherwise
	*/
	$link = OpenConUser("u");
	$uid = $_POST["uid"];

	try
	{
		$query = "DELETE FROM telephone WHERE uid = 'uid$';";
		$result = pg_query($link, $query);

		foreach ($_POST["phone"] as $phone)
		{
			$number = $phone["number"];
			$ext = $phone["extension"];
			$query = "INSERT INTO telephone VALUES('$uid', '$number', $ext);";
			$result = pg_query($link, $query);
		}

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