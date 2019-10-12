<?php
	//include 'connection.php';

	//Functions that map a given parameter to a respective table field 
	function MapUser($parameter, $val)
	{
		$str;
		switch ($parameter)
		{
			case 'email':
				$str = "email = '$val'";
				break;

			case 'password':
				$str = "password = '$val'";
				break;

			case 'role':
				$str = "role = $val";
				break;
			
		}

		return $str;
	}

	function MapIdea($parameter, $val)
	{
		$str;
		switch ($parameter)
		{
			case 'title':
				$str = "title = '$val'";
				break;

			case 'description':
				$str = "description = '$val'";
				break;

			case 'category':
				$str = "category = $val";
				break;

			case 'state':
				$str = "state = $val";
				break;
		}

		return $str;
	}

	function GenRegex($string)
	{
		$caps = strtoupper($string[0]);
		$lower = strtolower($caps);

		$regex = "(".$caps."|".$lower.")";
		for ($i=1; $i < strlen($string); $i++)
		{ 
			$char = $string[$i];
			if ($char == " ")
			{
				$regex .= " ";
			}
			else
			{
				$caps = strtoupper($char);
				$lower = strtolower($char);
				$regex .= "(".$caps."|".$lower.")";
			}
		}

		return $regex;
	}
?>