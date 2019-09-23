<?php

	function CreateDir($path)
	{
		$path = 'img/' . $path;
		if(!file_exists($path))
		{
			mkdir($path, 0777, true);
			return true;
		}
		else
		{
			return false;
		}
	}

	function DeleteDir($path)
	{
		$path = 'img/' . $path;
		if(file_exists($path))
		{
			rmdir($path);
			return true;
		}
		else
		{
			return false;
		}
	}

	function StoreFile($name, $tmp_name, $newname, $folderid)
	{
		if ($name != "")
		{
			$temp = explode(".", $name);
			$ext = end($temp);
			move_uploaded_file($tmp_name, "img/" . $folderid . "/" . $newname . "." . $ext);
			return true;
		}
		else
		{
			return false;
		}
	}
?>