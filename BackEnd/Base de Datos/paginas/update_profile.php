<?php
	include 'connection.php';
	include 'imgdirectory.php';
	//--------------------------------------------//
	//---- FILE USED TO UPDATE PROFILE PHOTOS ----//
	//--------------------------------------------//

	/*
	INPUTS:
	1. User's ID
	2. New Photo

	------------

	OUTPUTS:
	1. Status: 1 if success, 0 otherwise
	*/

	//Extracts User ID
	$uid = $_POST["uid"];

	$link = OpenConUser("u");

	$json;
	try
	{
		//----- Extract user's directoy path -----//
		$query = "SELECT folderid FROM users WHERE uid = '$uid';";
		$result = pg_query($link, $query);
		$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);
		$folderid = $line["folderid"];

		//----- Update profile picture -----//
		$name = $_FILES["photo"]["name"];
		$tmp_name = $_FILES["photo"]["tmp_name"];
		$exito = StoreFile($name, $tmp_name, "profile", $folderid);
		$json = array('status' => 1);
		
	}
	catch (Exception $e)
	{
		$json = array('status' => 0, 'error' => $e);
	}
	finally
	{
		echo json_encode($json);
	}
?>