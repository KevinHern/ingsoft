<?php  
	function OpenConAdmin()
	{
		$host = "localhost";
	    $db_name = "NetZ";
	    $pass = "";
	    $port = "5432";
		$username = "admin";
    	$adminPass = "netZRocks";
		$connect_str = "host=$host port=$port dbname=$db_name user=$username password=$adminPass";
		$conn = pg_connect($connect_str);
		return $conn;
	}

	function CloseCon($conn)
	{
		pg_close($conn);
		
	}

	function OpenConUser($option)
	{
		$host = "localhost";
	    $db_name = "NetZ";
	    $pass = "";
	    $port = "5432";
		$username = "";
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

			case 'u':
				$username = "orduser";
				$pass = "netzorduser";
		}
		$connect_str = "host=$host port=$port dbname=$db_name user=$username password=$pass";

		$conn = pg_connect($connect_str);
		return $conn;
	}
?>