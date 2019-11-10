<?php
	//Libraries
	include '../connection.php';
	include '../../getSub.php';
	permission();


	$json = file_get_contents('php://input');
	//Converts it into a PHP object
    $_POST = json_decode($json, true);

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
	$uid = getUid($_POST["uid"]);

	try
	{
		$query = "DELETE FROM telephone WHERE uid = '$uid';";
		$result = pg_query($link, $query);
        $i = 0;
		foreach ($_POST["phone"] as $phone)
		{
//            print_r($phone);
            $number = $phone["phone$i"]['number'];
			$query = "INSERT INTO telephone VALUES('$uid', '$number');";
			$result = pg_query($link, $query);
			$i++;
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