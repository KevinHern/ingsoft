<?php
	include 'connection.php';
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

	-- Values that $typeuser can take: --

	e = entrepreneur
	f = financist
	r = resource

	*/
	//---------------------//
	$typeuser = $_POST["type"];


	switch ($option) {

	/*--------------------------------*/
	/*--------------USER--------------*/
	/*--------------------------------*/

		//---- DELETE ACCOUNT ----//
		case 'acc':
			$uid = $_POST["uid"];

			$link = OpenConUser($typeuser);

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
			
			break;

		//---- DELETE CATEGORY IDEA ----//
		case 'catid':
			$id = $_POST["id"];

			$link = OpenConAdmin();

			$query = "DELETE FROM categoryidea id = $id;";

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

			break;

		//---- DELETE IDEA ----//
		case 'idea':
			$iid = $_POST["iid"];

			$link = OpenConUser($typeuser);

			$query = "DELETE FROM idea WHERE iid = $idd";

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

			break;

		//---- DELETE IND. TELEPHONE ----//
		case 'indtel':
			$tid = $_POST["tid"];

			$link = OpenConUser($typeuser);

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

			break;

		//---- DELETE ORG. TELEPHONE ----//
		case 'orgtel':
			$tid = $_POST["tid"];

			$link = OpenConUser($typeuser);

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

			break;

		//---- DELETE BOOKMARK ----//
		case 'book':
			$iid = $_POST["iid"];
			$invid = $_POST["invid"];

			$link = OpenConUser($typeuser);

			$query = "DELETE FROM invbook WHERE iid = $iid AND invid = '$invid';";

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

			break;
	}
?>