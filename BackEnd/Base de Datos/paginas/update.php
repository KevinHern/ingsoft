<?php
	include 'connection.php';
	include 'utilities.php';

	/*
	$json = file_get_contents('php://input');
	//Converts it into a PHP object
    $_POST = json_decode($json, true);
    */

    $option = $_POST["option"];			//Parameter that decides which table to modify

	//----- AGREEMENT -----//
	/*
	
	-- Values that $option can take: --

	UPDATE USER INFORMATION: 		user
	UPDATE INDIVIDUAL: 				ind
	UPDATE ORGANIZATION:			org
	UPDATE TELEPHONE INDIVIDUAL:	telind
	UPDATE TELEPHONE ORGANIZATION:	telorg
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
			$uid = $_POST["uid"];

			$field = MapUser($attr);

			$query = "UPDATE users SET $field WHERE uid = '$uid';";
			$json;
			try
			{
				$result = pg_query($link, $query);
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
			$inid = $_POST["inid"];

			$field = MapIndividual($attr);

			$query = "UPDATE individual SET $field = '$val' WHERE inid = '$inid';";
			$json;
			try
			{
				$result = pg_query($link, $query);
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
			$oid = $_POST["oid"];

			$field = MapOrganization($attr);

			$query = "UPDATE organization SET $field = '$val' WHERE oid = '$oid';";
			$json;
			try
			{
				$result = pg_query($link, $query);
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
			break;

		//-------------------------------------//
		//---- UPDATE INDIVIDUAL TELEPHONE ----//
		//-------------------------------------//
		case 'telind':
			/*
			INPUTS:
			1. Telephone's ID
			2. Field to modify
			3. New field's Value

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/

			$attr = $_POST["attr"];		//Parameter that decides which table attribute must be updated
			/*
			-- Values that $attr can take: --
			UPDATE NUMBER: 			n
			UPDATE EXTENSION: 		e

			*/
		
			$val = $_POST["val"];		//New value of the attribute

			$link = OpenConUser("u");

			//Extracts User ID
			$tid = $_POST["tid"];

			$field = MapTelephone($attr);

			$query = "UPDATE telephoneind SET $field WHERE tid = $tid;";
			$json;
			try
			{
				$result = pg_query($link, $query);
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
			break;

		//---------------------------------------//
		//---- UPDATE ORGANIZATION TELEPHONE ----//
		//---------------------------------------//
		case 'telorg':
			/*
			INPUTS:
			1. Telephone's ID
			2. Field to modify
			3. New field's Value

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/

			$attr = $_POST["attr"];		//Parameter that decides which table attribute must be updated
			/*
			-- Values that $attr can take: --
			UPDATE NUMBER: 			n
			UPDATE EXTENSION: 		e

			*/
		
			$val = $_POST["val"];		//New value of the attribute

			$link = OpenConUser("u");

			//Extracts User ID
			$tid = $_POST["tid"];

			$field = MapTelephone($attr);

			$query = "UPDATE telephoneorg SET $field WHERE tid = $tid;";
			$json;
			try
			{
				$result = pg_query($link, $query);
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
			UPDATE NUMBER: 			n
			UPDATE EXTENSION: 		e

			*/
		
			$val = $_POST["val"];		//New value of the attribute

			$link = OpenConUser("e");

			//Extracts Idea ID
			$iid = $_POST["iid"];

			$field = MapIdea($attr);

			$query = "UPDATE idea SET $field WHERE iid = $iid;";
			$json;
			try
			{
				$result = pg_query($link, $query);
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
			break;

		//------------------------------//
		//---- UPDATE CATEGORY IDEA ----//
		//------------------------------//
		case 'catid':
			/*
			INPUTS:
			1. Category's ID
			2. Field to modify
			3. New field's Value

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/

			$attr = $_POST["attr"];		//Parameter that decides which table attribute must be updated
			/*
			-- Values that $attr can take: --
			UPDATE NUMBER: 			n
			UPDATE EXTENSION: 		e

			*/
		
			$val = $_POST["val"];		//New value of the attribute

			$link = OpenConAdmin();

			//Extracts Category ID
			$id = $_POST["id"];

			$field = MapIdeaMisc($attr);

			$query = "UPDATE categoryidea SET $field = '$val' WHERE id = $id;";
			$json;
			try
			{
				$result = pg_query($link, $query);
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
			break;

		//---------------------------//
		//---- UPDATE STATE IDEA ----//
		//---------------------------//
		case 'staid':
			/*
			INPUTS:
			1. State's ID
			2. Field to modify
			3. New field's Value

			------------

			OUTPUTS:
			1. Status: 1 if success, 0 otherwise
			*/

			$attr = $_POST["attr"];		//Parameter that decides which table attribute must be updated
			/*
			-- Values that $attr can take: --
			UPDATE NUMBER: 			n
			UPDATE EXTENSION: 		e

			*/
		
			$val = $_POST["val"];		//New value of the attribute

			$link = OpenConAdmin();

			//Extracts Category ID
			$id = $_POST["id"];

			$field = MapIdeaMisc($attr);

			$query = "UPDATE stateidea SET $field = '$val' WHERE id = $id;";
			$json;
			try
			{
				$result = pg_query($link, $query);
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
			break;

	}
?>