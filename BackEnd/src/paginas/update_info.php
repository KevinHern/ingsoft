<?php
	include 'connection.php';
	include 'utilities.php';
	include '../getSub.php';
	permission();
	//-----------------------------------------//
	//---- FILE USED TO UPDATE INFORMATION ----//
	//-----------------------------------------//

	
	$json = file_get_contents('php://input');
	//Converts it into a PHP object
    $_POST = json_decode($json, true);
    

    $option = $_POST["option"];			//Parameter that decides which table to modify

	//----- AGREEMENT -----//
	/*
	
	-- Values that $option can take: --

	UPDATE USER INFORMATION: 		user
	UPDATE INDIVIDUAL: 				ind
	UPDATE ORGANIZATION:			org
	UPDATE IDEA:					idea
	UPDATE CATEGORY IDEA:			catid
	UPDATE STATE IDEA:				staid

	*/
	//---------------------//

	switch ($option) {
		//---------------------------------//
		//---- UPDATE USER INFORMATION ----//
		//---------------------------------//
		case 'user':
			/*
			INPUTS:
			1. User's ID
			2. Field to modify
			3. New field's Value

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/

			$attr = $_POST["attr"];		//Parameter that decides which table attribute must be updated
			/*
			-- Values that $attr can take: --
			UPDATE EMAIL: 		e
			UPDATE PASSWORD: 	p
			UPDATE ROLE:		r
			*/
		
			$val = $_POST["val"];		//New value of the attribute

			$link = OpenConUser("u");

			//Extracts User ID
			$uid = getUid($_POST["uid"]);

			$json;
			try
			{
				$field = MapUser($attr, $val);
				$query = "UPDATE users SET $field WHERE uid = '$uid';";
				$result = pg_query($link, $query);
				$json = array('status' => 1);
				
			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al actualizar los datos.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
			break;

		//---------------------------------------//
		//---- UPDATE INDIVIDUAL INFORMATION ----//
		//---------------------------------------//
		case 'ind':
			/*
			INPUTS:
			1. User's ID
			2. Field to modify
			3. New field's Value

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/

			$attr = $_POST["attr"];		//Parameter that decides which table attribute must be updated
			/*
			-- Values that $attr can take: --
			UPDATE FIRSTNAME: 		f
			UPDATE LASTNAME: 		l
			UPDATE NATIONALITY:		n
			UPDATE BIOGRAPHY:		b
			UPDATE ORGANIZATION:	o
			UPDATE BIRTHDATE:		db

			*/
		
			$val = $_POST["val"];		//New value of the attribute

			$link = OpenConUser("u");

			//Extracts User ID
			$uid = getUid($_POST["uid"]);

			$query = "UPDATE individual SET $attr = '$val' WHERE inid = '$uid';";
			$json;
			try
			{
				
				$result = pg_query($link, $query);
				$json = array('status' => 1);
				
			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al actualizar los datos.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
			break;


		//-----------------------------------------//
		//---- UPDATE ORGANIZATION INFORMATION ----//
		//--------------------------..-------------//
		case 'org':
			/*
			INPUTS:
			1. User's ID
			2. Field to modify
			3. New field's Value

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/

			$attr = $_POST["attr"];		//Parameter that decides which table attribute must be updated
			/*
			-- Values that $attr can take: --
			UPDATE NAME: 			n
			UPDATE DESCRIPTION: 	d
			UPDATE COUNTRY:			c
			UPDATE LOCATION:		l

			*/
		
			$val = $_POST["val"];		//New value of the attribute

			$link = OpenConUser("u");

			//Extracts User ID
			$uid = getUid($_POST["uid"]);

			$query = "UPDATE organization SET $attr = '$val' WHERE oid = '$uid';";
			$json;
			try
			{
				$result = pg_query($link, $query);
				$json = array('status' => 1);
				
			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al actualizar los datos.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
			break;

		//---------------------//
		//---- UPDATE IDEA ----//
		//---------------------//
		case 'idea':
			/*
			INPUTS:
			1. Idea's ID
			2. Field to modify
			3. New field's Value

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/

			$attr = $_POST["attr"];		//Parameter that decides which table attribute must be updated
			/*
			-- Values that $attr can take: --
			UPDATE TITLE: 			t
			UPDATE DESCRIPTION: 	d
			UPDATE CATEGORY:		c
			UPDATE STATE:			s

			*/
		
			$val = $_POST["val"];		//New value of the attribute

			$link = OpenConUser("e");

			//Extracts Idea ID
			$iid = $_POST["iid"];

			$field = MapIdea($attr, $val);

			$query = "UPDATE idea SET $field WHERE iid = $iid;";
			$json;
			try
			{
				$result = pg_query($link, $query);
				$json = array('status' => 1);
				
			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al actualizar los datos.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
			break;

		//------------------------------//
		//---- UPDATE CATEGORY IDEA ----//
		//------------------------------//
		case 'catid':
			/*
			INPUTS:
			1. Category's ID
			2. Name's new value

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/
		
			$val = $_POST["val"];		//New value of the attribute

			$link = OpenConAdmin();

			//Extracts Category ID
			$id = $_POST["id"];

			$query = "UPDATE categoryidea SET name = '$val' WHERE id = $id;";
			$json;
			try
			{
				$result = pg_query($link, $query);
				$json = array('status' => 1);
				
			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al actualizar los datos.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
			break;

		//---------------------------//
		//---- UPDATE STATE IDEA ----//
		//---------------------------//
		case 'staid':
			/*
			INPUTS:
			1. State's ID
			2. Name's new value

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/
		
			$val = $_POST["val"];		//New value of the attribute

			$link = OpenConAdmin();

			//Extracts Category ID
			$id = $_POST["id"];

			$query = "UPDATE stateidea SET name = '$val' WHERE id = $id;";
			$json;
			try
			{
				$result = pg_query($link, $query);
				$json = array('status' => 1);
				
			}
			catch (Exception $e)
			{
				$json = array('status' => 0, 'message' => "Ocurrió un error al actualizar los datos.");
			}
			finally
			{
				CloseCon($link);
				echo json_encode($json);
			}
			break;

	}
?>