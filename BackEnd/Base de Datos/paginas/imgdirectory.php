<?php

	function CreateDir($user)
	{
		if(!file_exists('img/$user'))
		{
			mkdir('img/$user', 0777, true);
		}
	}

	function DeleteDir($user)
	{
		if(file_exists('img/$user'))
		{
			rmdir('img/$user');
		}
	}

?>