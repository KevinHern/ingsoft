<?php
	include 'connection.php';
	include 'imgdirectory.php';
	$option = $_POST["option"];

	//----- AGREEMENT -----//
	/*
	
	-- Values that $option can take: --

	DELETE ACCOUNT: 		acc
	DELETE CATEGORY IDEA:	catid
	DELETE STATE IDEA:		staid
	DELETE IDEA:			idea
	DELETE IND. TELEPHONE:	indtel
	DELETE ORD. TELEPHONE:	orgtel
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

		//---- DELETE CATEGORY IDEA ----//
		case 'catid':
			$id = $_POST["id"];

			$link = OpenConAdmin();

			$query = "DELETE FROM categoryidea WHERE id = $id;";

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

		//---- DELETE STATE IDEA ----//
		case 'staid':
			$id = $_POST["id"];

			$link = OpenConAdmin();

			$query = "DELETE FROM stateidea WHERE id = $id;";

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

		//---- DELETE IND. TELEPHONE ----//
		case 'indtel':
			$tid = $_POST["tid"];

			$link = OpenConUser("u");

			$query = "DELETE FROM telephoneind WHERE tid= $tid;";

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

		//---- DELETE ORG. TELEPHONE ----//
		case 'orgtel':
			$tid = $_POST["tid"];

			$link = OpenConUser("u");

			$query = "DELETE FROM telephoneorg WHERE tid = $tid;";

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