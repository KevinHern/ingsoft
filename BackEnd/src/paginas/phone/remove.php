<?php
	//Libraries
	include '../connection.php';
	include '../getSub.php';
	permission();

	/*
	$json = file_get_contents('php://input');
	//Converts it into a PHP object
    $_POST = json_decode($json, true);
    */
	/*
	INPUTS:
	1. User's ID
	2. Phone Number
	3. Phone Extension

	------------

	OUTPUTS:
	1. Status: 1 if success, 0 otherwise
	*/
	$link = OpenConUser("u");

	$number = $_POST["number"];
	$ext = $_POST["extension"];
	$uid = getUid($_POST["uid"]);

	try
	{
		$query = "DELETE FROM telephone WHERE uid = '$uid' AND number = '$number' AND extension = $ext;";
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