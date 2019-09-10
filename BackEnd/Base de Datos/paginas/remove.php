<?php
	include 'connection.php';
	$option = $_POST["option"];


	// e = entrepreneur
	// f = financist
	// r = resource
	$typeuser = $_POST["type"];


	switch ($option) {

	/*--------------------------------*/
	/*--------------USER--------------*/
	/*--------------------------------*/

		//---- DELETE ACCOUNT ----//
		case '1':
			$uid = $_POST["uid"];

			$link = OpenConUser($typeuser);

			$query = "DELETE FROM users WHERE uid = '$uid';";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}
			
			break;

		//---- DELETE CATEGORY IDEA ----//
		case '3':
			$id = $_POST["id"];

			$link = OpenConAdmin();

			$query = "DELETE FROM categoryidea id = $id;";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}

			break;

		//---- DELETE STATE IDEA ----//
		case '4':
			$id = $_POST["id"];

			$link = OpenConAdmin();

			$query = "DELETE FROM stateidea WHERE id = $id;";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}

			break;

		//---- REGISTER IDEA ----//
		case 'idea':
			$iid = $_POST["iid"];

			$link = OpenConUser($typeuser);

			$query = "DELETE FROM idea WHERE iid = $idd";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}

			break;

		//---- REGISTER IND. TELEPHONE ----//
		case '5':
			$tid = $_POST["tid"];

			$link = OpenConUser($typeuser);

			$query = "DELETE FROM telephoneind WHERE tid= $tid;";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}

			break;

		//---- DELETE ORG. TELEPHONE ----//
		case '6':
			$tid = $_POST["tid"];

			$link = OpenConUser($typeuser);

			$query = "DELETE FROM telephoneorg WHERE tid = $tid;";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}

			break;

		//---- DELETE BOOKMARK ----//
		case 'bookmark':
			$iid = $_POST["iid"];
			$invid = $_POST["invid"];

			$link = OpenConUser($typeuser);

			$query = "DELETE FROM invbook WHERE iid = $iid AND invid = '$invid';";

			$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

			if ($result)
			{
				echo "{\"status\": \"1\"}";
			}
			else
			{
				echo "{\"status\": \"0\"}";
			}

			break;
	}
?>