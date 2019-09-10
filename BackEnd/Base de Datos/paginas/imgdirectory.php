<?php

	function CreateDir($path)
	{
		if(!file_exists('img/$path'))
		{
			mkdir('img/$path', 0777, true);
		}
	}

	function DeleteDir($path)
	{
		if(file_exists('img/$path'))
		{
			rmdir('img/$path');
		}
	}

	function StoreFile($name, $tmp_name, $newname, $folderid)
	{
		if ($name != "")
		{
			$ext = end(explode(".", $name));
			move_uploaded_file($tmp_name, "img/" . $folderid . "/" . $newname . $ext);
			return true;
		}
		else
		{
			return false;
		}
	}
?>