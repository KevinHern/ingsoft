<?php
	//Libraries
	include 'connection.php';
/*
	$json = file_get_contents('php://input');
	//Converts it into a PHP object
    $_POST = json_decode($json, true);
*/

	$option = $_POST["option"];

	//----- AGREEMENT -----//
	/*

	-- Values that $option can take: --

	LIST IDEAS BY CATEGORY: 		list
	LIST BOOKMARKED IDEAS:			book

	*/
	//---------------------//

	switch ($option)
	{

		//---- LIST IDEAS TO FINANCIST BY CATEGORY  ----//
		case 'list':
			/*
			INPUTS:
			1. Idea Category
			2. Number of Rows
			3. Page Number

			------------

			OUTPUTS: List of Ideas, each idea contains:
			1. Idea's ID
			2. Idea's Title
			3. Idea's Description
			4. Idea's State
			5. Entrepreneur's Information
				INDIVIDUAL:
				5.1 Individual's ID
				5.2 Individual's Type of User
				5.3 Individual's Firt Name
				5.4 Individual's Last Name

				ORGANIZATION:
				5.1 Organization's ID
				5.2 Organization's Type of User
				5.3 Organization's Name
			*/

			$category = $_POST["category"];

			$rows = $_POST["rows"];
			$page = $_POST["page"];

			$link = OpenConUser("f");

			//----- Extract total number of rows -----//
			$query = "SELECT COUNT(iid) as total FROM idea WHERE category = '$category'";
			$result = pg_query($link, $query);
			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$total = $line["total"];

			$tempres = ($page-1) * $rows;

			$ideas = array("status" => -1);

			if ($total == 0)
			{
				$ideas["status"] = 0;

			}
			else if($tempres > $total)
			{
				$ideas["status"] = 0;
			}
			else
			{
				//----- Extract Ideas filtered by category -----//
				$query = "SELECT I.iid, I.uid, I.title, I.description, SI.name, U.uid, U.type FROM idea I, users U, stateidea SI  WHERE I.category = $category AND I.uid = U.uid AND SI.id = I.state ORDER BY title";

				$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

				pg_result_seek($result, (($page-1) * $rows));

				$i = 0;

				while (($line = pg_fetch_array($result, NULL, PGSQL_ASSOC)) && ($i < $rows))
				{
					
					//--- Idea's Basic Information ---//
					$iid = $line["iid"];
					$title = $line["title"];
					$description = $line["description"];
					$state = $line["name"];

					$temp = array("iid" => $iid, "title" => $title, "description" => $description, "state" => $state);

					//--- Entrepreneur's Basic Information ---//
					$uid = $line["uid"];
					$type = $line["type"];

					if ($type == 1)
					{
						$query = "SELECT firstname, lastname FROM individual WHERE inid = '$uid'";
						$result1 = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
						$line1 = pg_fetch_array($result1, NULL, PGSQL_ASSOC);

						$firstname = $line1["firstname"];
						$lastname = $line1["lastname"];

						//--- Individual's Basic Information ---//
						$t = array("uid" => $uid, "type" => $type, "fname" => $firstname, "lname" => $lastname);
						$temp = array_merge($temp, $t);

						$temp = array("e$i" => $temp);
					}
					else
					{
						$query = "SELECT name FROM organization WHERE oid = '$uid'";
						$result1 = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
						$line1 = pg_fetch_array($result1, NULL, PGSQL_ASSOC);

						//--- Organization's Basic Information ---//
						$name = $line1["name"];

						$t = array("uid" => $uid, "type" => $type, "name" => $name);
						$temp = array_merge($temp, $t);

						$temp = array("e$i" => $temp);
					}

					$ideas = array_merge($ideas, $temp);
					$i = $i + 1;
				}
				$ideas["status"] = 1;
			}

			echo json_encode($ideas);
			break;

		//---- LIST BOOKMARKED IDEAS ----//
		case 'book':
			/*
			INPUTS:
			1. Financist Id
			2. Idea Category
			3. Number of rows
			4. Page Number

			------------

			OUTPUTS: List of Ideas, each idea contains:
			1. Idea's ID
			2. Idea's Title
			3. Idea's Description
			4. Idea's State
			5. Entrepreneur's Information
				INDIVIDUAL:
				5.1 Individual's ID
				5.2 Individual's Type of User
				5.3 Individual's Firt Name
				5.4 Individual's Last Name

				ORGANIZATION:
				5.1 Organization's ID
				5.2 Organization's Type of User
				5.3 Organization's Name
			*/
				
			$uid = $_POST["uid"];
			$category = $_POST["category"];

			$rows = $_POST["rows"];
			$page = $_POST["page"];

			$link = OpenConUser("f");

			//----- Extract total number of rows -----//
			$query = "SELECT COUNT(FB.iid) as total FROM idea I, finbook FB WHERE I.category = '$category' AND I.iid = FB.iid AND FB.finid = '$uid'";
			$result = pg_query($link, $query);
			$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

			$total = $line["total"];

			$tempres = ($page-1) * $rows;

			$ideas = array("status" => -1);

			if ($total == 0)
			{
				$ideas["status"] = 0;

			}
			else if($tempres > $total)
			{
				$ideas["status"] = 0;
			}
			else
			{
				//----- Extract Ideas from bookmark filtered by category -----//
				$query = "SELECT I.iid, I.title, I.description, SI.name, U.uid, U.type FROM idea I, finbook FB, users U, stateid SI WHERE I.category = '$category' AND I.iid = FB.iid AND FB.finid = '$uid' AND I.uid = U.uid AND SI.id = I.state ORDER BY title";

				$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());

				pg_result_seek($result, (($page-1) * $rows));

				$i = 0;

				while (($line = pg_fetch_array($result, NULL, PGSQL_ASSOC)) && ($i < $rows))
				{
					
					//--- Idea's Basic Information ---//
					$iid = $line["iid"];
					$title = $line["title"];
					$description = $line["description"];
					$state = $line["name"];

					$temp = array("iid" => $iid, "title" => $title, "description" => $description, "state" => $state);

					//--- Entrepreneur's Basic Information ---//
					$uid = $line["uid"];
					$type = $line["type"];

					if ($type == 1)
					{
						$query = "SELECT firstname, lastname FROM individual WHERE inid = '$uid'";
						$result1 = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
						$line1 = pg_fetch_array($result1, NULL, PGSQL_ASSOC);

						$firstname = $line1["firstname"];
						$lastname = $line1["lastname"];

						//--- Individual's Basic Information ---//
						$t = array("uid" => $uid, "type" => $type, "fname" => $firstname, "lname" => $lastname);
						$temp = array_merge($temp, $t);

						$temp = array("e$i" => $temp);
					}
					else
					{
						$query = "SELECT name FROM organization WHERE oid = '$uid'";
						$result1 = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
						$line1 = pg_fetch_array($result1, NULL, PGSQL_ASSOC);

						//--- Organization's Basic Information ---//
						$name = $line1["name"];

						$t = array("uid" => $uid, "type" => $type, "name" => $name);
						$temp = array_merge($temp, $t);

						$temp = array("e$i" => $temp);
					}

					$ideas = array_merge($ideas, $temp);
					$i = $i + 1;
				}
				$ideas["status"] = 1;
			}

			echo json_encode($ideas);
			break;
	}

	CloseCon($link);
?>