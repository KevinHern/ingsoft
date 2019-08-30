<?php
/*Connection class I am using for trials*/

class DataBase {

    private $host = "localhost";
    private $db_name = "Prueba";
    private $username = "";
    private $adminPass = "admin";
    private $clientPass = "client";
    private $pass = "";
    private $port = "5432";
    public $conn;


    public function __construct($username) {
        if(($username == "client")){
            $this->username = $username;
            $this->pass = $this ->clientPass;
        }else if($username == "admin"){
            $this->username = $username;
            $this->pass = $this ->adminPass;
        }else{
            throw new InvalidArgumentException("$username must not be empty");
        }
    }

    public function getConnection(){
        $this->conn = null;
        try{
            $connectionString = "host = $this->host port = $this->port dbname = $this->db_name 
             user=$this->username password=$this->pass";
            $this->conn = pg_connect($connectionString);
        }catch(Exception $exception){
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
    function disconnect(){
        pg_close($this->conn);
    }

}


