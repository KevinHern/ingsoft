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
		
			$attr = $_POST["field"];
			$link = OpenConUser("u");

			//Extracts User ID
			$val = $_POST["val"];		//New value of the attribute
			$json;
			try
			{
				$field = MapUser($attr, $val);
				$query = "UPDATE users SET $field WHERE uid = '$uid';";
				
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

			$link = OpenConUser("u");

			//Extracts User ID
			$uid = getUid($_POST["uid"]);
			$fields = $_POST["fields"];
			$vals = $_POST["vals"];
			$json;
			try
			{
				$length = count($fields);
				$modify = "";
				for ($i=0; $i < $length ; $i++)
				{ 
					$field = $fields[$i];
					$val = $vals[$i];

					if ($field == "firstname")
					{
						$modify .= "firstname";
					}
					elseif ($field == "lastname")
					{
						$modify .= "lastname";
					}
					elseif ($field == "nationality")
					{
						$modify .= "nationality";
					}
					elseif ($field == "biography")
					{
						$modify .= "biography";
					}
					elseif ($field == "org")
					{
						$modify .= "org";
					}
					else
					{
						$modify .= "birthdate";
					}


					$modify .= " = '$val', ";
					
				}
				$modify = substr($modify, 0, -2);
				$query = "UPDATE individual SET $modify WHERE inid = '$uid';";
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
	
			$json;
			$link = OpenConUser("u");

			//Extracts User ID
			$uid = getUid($_POST["uid"]);
			$fields = $_POST["fields"];
			$vals = $_POST["vals"];
			$json;
			try
			{
				$length = count($fields);
				$modify = "";
				for ($i=0; $i < $length ; $i++)
				{ 
					$field = $fields[$i];
					$val = $vals[$i];

					if ($field == "name")
					{
						$modify .= "name";
					}
					elseif ($field == "description")
					{
						$modify .= "description";
					}
					elseif ($field == "country")
					{
						$modify .= "country";
					}
					else
					{
						$modify .= "location";
					}


					$modify .= " = '$val', ";
					
				}
				$modify = substr($modify, 0, -2);
				$query = "UPDATE organization SET $modify WHERE oid = '$uid';";
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

			$link = OpenConUser("e");

			//Extracts Idea ID
			$iid = $_POST["iid"];
			$title = $_POST["title"];
			$description = $_POST["description"];
			$category = $_POST["category"];
			$state = $_POST["state"];

			$query = "UPDATE idea SET title = '$title', description = '$description', category = $category, state = $state WHERE iid = $iid;";
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