<?php
	//Libraries
	include 'connection.php';
	include '../Permission.php';
	include '../getSub.php';
	permission();

	$json = file_get_contents('php://input');
//	Converts it into a PHP object
    $_POST = json_decode($json, true);


	$option = $_POST["option"];

	//----- AGREEMENT -----//
	/*

	-- Values that $option can take: --

	LIST IDEAS, GENERAL INFO:	gi
	LIST IDEAS, IDEA DETAIL:	id

	*/
	//---------------------//

	switch ($option)
	{
		//---- LIST ENTREPRENEUR IDEAS: GENERAL INFO ----//
		case 'gi':
			/*
			INPUTS:
			1. User ID
			2. Number of Rows
			3. Page Number
			4. Idea Category

			-------------------

			RETURNS THIS:
			1. Status: 1 if success, 0 if failure, -1 if empty
			2. List of N ideas
				For each idea:
				2.1 Idea Title
				2.2 Idea ID

			*/

			$uid = getUid($_POST["uid"]);

			$rows = $_POST["rows"];
			$page = $_POST["page"];
			$filter = $_POST["filter"];
			$filter = "%(".strtolower($filter)."|".$filter."|".strtoupper($filter).")%";

			$ideas = array("status" => -1);
			$maxpage = 0;

			$link = OpenConUser("e");
			try
			{
				//----- Extract total number of rows -----//
				$query = "SELECT COUNT(iid) as total FROM idea WHERE uid = '$uid' AND title LIKE $filter";
				$result = pg_query($link, $query);
				$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);
				$total = $line["total"];
								
				if(($total % $rows) == 0)
				{
					$maxpage = $total / $rows;
				}	
				else
				{
					$maxpage = intdiv($total, $rows) + 1;
				}

				$maxpage = array('maxpage' => $maxpage);

				$tempres = ($page-1) * $rows;

				if ($total == 0)
				{
					$ideas["status"] = 0;
					$msg = array('message' => "No existen ideas para esta categoria." );
					$ideas = array_merge($ideas, $msg);

				}
				else if($tempres >= $total)
				{
					$ideas["status"] = 0;
					$msg = array('message' => "No existe este numero de pagina de ideas." );
					$ideas = array_merge($ideas, $msg);
				}
				else
				{
					//Get Ideas
					$query = "SELECT iid, title FROM idea WHERE uid = '$uid' AND category like $filter ORDER BY title";
					$result = pg_query($link, $query);
					pg_result_seek($result, $tempres);

					$i = 0;
					$list = array();
					while (($line = pg_fetch_array($result, NULL, PGSQL_ASSOC)) && ($i < $rows))
					{
						
						$title = $line["title"];
						$iid = $line["iid"];

						$temp = array("iid" => ((int)$iid), "title" => $title);

						$temp = array("idea$i" => $temp);
						$list = array_merge($list, $temp);
						$i = $i + 1;
					}
					$list = array('ideas' => $list);
					$ideas = array_merge($ideas, $maxpage, $list);
					$ideas["status"] = 1;
				}
			}
			catch(Exception $e)
			{
				$ideas["status"] = 0;
				$msg = array('message' => "Ocurrió un error." );
				$ideas = array_merge($ideas, $msg);
			}
			finally
			{
				CloseCon($link);
				echo json_encode($ideas);
			}

			break;

		//---- LIST ENTREPRENEUR IDEAS: IDEA DETAILS ----//
		case 'id':
			/*
			INPUTS:
			1. Idea ID
			2. Number of rows
			3. Page Number

			----------------
			OUTPUTS:

			1. Status: 1 if success and financist list is not empty, 2 if success and financists list is empty
			2. Title
			3. Description
			4. Category
			5. State
			6. Number of Interested
			7. List of Financists: f0, f1, ... ,fn
				7.1 Financist's ID
				7.2 Financist's Type of user

				INDIVIDUAL:
				7.3 First Name
				7.4 Last Name

				ORGANIZATION:
				7.3 Name 

			*/
			
			$iid = $_POST["iid"];
			$rows = $_POST["rows"];
			$page = $_POST["page"];

			$link = OpenConUser("e");
			try
			{
				//----- Extract Idea's basic information -----//
				$query = "SELECT I.title, I.description, CI.name as cname, SI.name as sname, I.cantInt FROM idea I, categoryIdea CI, stateidea SI WHERE I.iid = $iid AND I.category = CI.id AND I.state = SI.id";
				$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
				$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);

				$title = $line["title"];
				$description = $line["description"];
				$cname = $line["cname"];
				$sname = $line["sname"];
				$cantint = $line["cantint"];
				$details = array("status" => -1, "title" => $title, "description" => $description, "category" => $cname, "state" => $sname, "interested" => ((int)$cantint), "maxpage" => $maxpage);

				//----- Extract Financists that are interested -----//

				//--- Extract total number of rows ---//
				$query = "SELECT COUNT(uid) as total FROM finbook IB, users U WHERE IB.finid = U.uid AND IB.iid = $iid";
				$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
				$line = pg_fetch_array($result, NULL, PGSQL_ASSOC);
				$total = $line["total"];

				$maxpage = 0;
				if(($total % $rows) == 0)
				{
					$maxpage = $total / $rows;
				}	
				else
				{
					$maxpage = intdiv($total, $rows) + 1;
				}

				$tempres = ($page-1) * $rows;

				if($total == 0)
				{
					$details["status"] = 1;
				}
				else if ($tempres >= $total)
				{
					$details["status"] = 1;
				}
				else
				{
					
					//--- Extract Financists ---//
					$query = "SELECT U.uid, U.type FROM finbook IB, users U WHERE IB.finid = U.uid AND IB.iid = $iid";
					$result = pg_query($link, $query) or die('Query failed: ' . pg_result_error());
					pg_result_seek($result, $tempres);

					$i = 0;
					$financists = array();
					while (($line = pg_fetch_array($result, NULL, PGSQL_ASSOC)) && ($i < $rows))
					{
						$temp = array();
						$type = $line["type"];
						$utemp = $line["uid"];
						$temp = array("uid" => $utemp, "type" => ((int)$type));

						if ($type == 1)
						{
							$query = "SELECT firstName, lastName FROM individual WHERE inid = '$utemp'";

							$result1 = pg_query($link, $query);

							$line1 = pg_fetch_array($result1, NULL, PGSQL_ASSOC);

							$firstName = $line1["firstName"];
							$lastName = $line1["lastName"];

							$t = array("firstname" => $firstName, "lastname" => $lastName);
							$temp = array_merge($temp, $t);
						}
						else
						{
							$query = "SELECT name FROM organization WHERE oid = '$utemp'";

							$result1 = pg_query($link, $query);

							$line1 = pg_fetch_array($result1, NULL, PGSQL_ASSOC);

							$name = $line1["name"];

							$t = array("name" => $name);
							$temp = array_merge($temp, $t);
						}

						$financists = array_merge($financists, $temp);
						$i = $i + 1;
					}
					$financists = array("financists" => $financists);
					$details = array_merge($details, $maxpage, $financists);
					$details["status"] = 1;
				}
			}
			catch (Exception $e)
			{
				$details["status"] = 0;
				$msg = array('message' => "Ocurrió un error." );
				$details = array_merge($details, $msg);
			}
			finally
			{
				CloseCon($link);
				echo json_encode($details);
			}
			break;
	}

?>