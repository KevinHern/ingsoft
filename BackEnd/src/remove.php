<?php
	include 'connection.php';
	include 'imgdirectory.php';

	$json = file_get_contents('php://input');
	//     Converts it into a PHP object
    $_POST = json_decode($json, true);

	$option = $_POST["option"];

	//----- AGREEMENT -----//
	/*
	
	-- Values that $option can take: --

	DELETE ACCOUNT: 		acc
	DELETE IDEA:			idea
	DELETE BOOKMARK:		book

	*/
	//---------------------//

	switch ($option) {

	/*--------------------------------*/
	/*--------------USER--------------*/
	/*--------------------------------*/

		//---- DELETE ACCOUNT ----//
		case 'acc':
			$uid = $_POST["uid"];

			$link = OpenConUser("u");

			$query = "SELECT folderid FROM users WHERE uid = '$uid';";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);
			$folderid = $line["folderid"];

			DeleteDir($folderid);

			$query = "DELETE FROM users WHERE uid = '$uid';";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}
			
			CloseCon($link);
			break;

		//---- DELETE IDEA ----//
		case 'idea':
			$iid = $_POST["iid"];

			$link = OpenConUser("e");

			$query = "DELETE FROM idea WHERE iid = $iid";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}

			CloseCon($link);
			break;

		//---- DELETE BOOKMARK ----//
		case 'book':
			$iid = $_POST["iid"];
			$finId = $_POST["finId"];

			$link = OpenConUser("f");

			$query = "DELETE FROM finBook WHERE iid = $iid AND finId = '$finId';";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				$json = array('status' => 1);
				echo json_encode($json);
			}
			else
			{
				$json = array('status' => 0);
				echo json_encode($json);
			}

			CloseCon($link);
			break;
	}
?>