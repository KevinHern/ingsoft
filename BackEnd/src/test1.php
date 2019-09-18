<?php
	include 'imgdirectory.php';
	$photo = $_FILES["fileToUpload"]["name"];
	$photoName = $_FILES["fileToUpload"]["tmp_name"];
	$folderid = $_POST["id"];
	if (CreateDir($folderid))
	{
		echo "Dir Created";
	}
	else
	{
		echo "Dir not Created";
	}
	/*
	if (DeleteDir($folderid))
	{
		echo "Dir Deleted";
	}
	else
	{
		echo "Dir not Deleted";
	}
	*/
	
	if (StoreFile($photo, $photoName, "profile", $folderid))
	{
		echo "File uploaded";
	}
	else
	{
		echo "Archivo Vacio";
	}
?>