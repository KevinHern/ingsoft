<?php

    $host = "localhost";
    $db_name = "reservas";
    $clientPass = "client";
    $pass = "";
    $port = "5432";
    
	function OpenConAdmin()
	{
		$username = "admin";
    	$adminPass = "netZRocks";
		$connect_str = "host=$host port=$port dbname=$db_name user=$username password=$adminPass";
		$conn = pg_connect($GLOBALS['connect_str']);
		return $conn;
	}

	function CloseCon($conn)
	{
		pg_close($conn);
		
	}

	function OpenConUser($option)
	{
		$username = "";
		$pass = "";
		switch ($option)
		{
			case 'e':
				$username = "entrepreneur";
				$pass = "netzentrepreneur";
				break;

			case 'f':
				$username = "financist";
				$pass = "netzfinancist";
				break;

			case 'r':
				$username = "resource";
				$pass = "netzresource";
				break;
		}
		$connect_str = "host=$host port=$port dbname=$db_name user=$username password=$pass";

		$conn = pg_connect($GLOBALS['connect_str']);
		return $conn;
	}
?>