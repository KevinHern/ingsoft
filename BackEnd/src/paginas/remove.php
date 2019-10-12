<?php
	include 'connection.php';
	include 'imgdirectory.php';
	include '../getSub.php';
	permission();

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
			$uid = getUid($_POST["uid"]);

			$link = OpenConUser("u");

			try
			{
				$query = "SELECT folderid FROM users WHERE uid = '$uid';";

				$result = pg_query($link, $query);
				$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);
				$folderid = $line["folderid"];

				DeleteDir($folderid);

				$query = "DELETE FROM users WHERE uid = '$uid';";
				$result = pg_query($link, $query);

				$json = array('status' => 1);
			}
			catch(Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al eliminar la cuenta.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
			break;

		//---- DELETE IDEA ----//
		case 'idea':
			$iid = $_POST["iid"];

			$link = OpenConUser("e");

			try
			{
				$query = "DELETE FROM idea WHERE iid = $iid";

				$result = pg_query($link, $query);
				$json = array('status' => 1);
			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al eliminar la idea.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
			break;

		//---- DELETE CATEGORY IDEA ----//
		case 'catid':
			$id = $_POST["id"];

			$link = OpenConUser("e");

			try
			{
				$query = "DELETE FROM categoryidea WHERE id = $id";

				$result = pg_query($link, $query);
				$json = array('status' => 1);
			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al eliminar la categoría.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
			break;

		//---- DELETE STATE IDEA ----//
		case 'catid':
			$id = $_POST["id"];

			$link = OpenConUser("e");

			try
			{
				$query = "DELETE FROM stateidea WHERE id = $id";

				$result = pg_query($link, $query);
				$json = array('status' => 1);
			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al eliminar el estado.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
			break;

		//---- DELETE BOOKMARK ----//
		case 'book':
			$iid = $_POST["iid"];
			$finid = $_POST["finid"];

			$link = OpenConUser("f");

			try
			{
				$query = "DELETE FROM finBook WHERE iid = $iid AND finid = '$finid';";

				$result = pg_query($link, $query);
				$json = array('status' => 1);
			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al borrar la idea del bookmark.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}		
			break;
	}
?>