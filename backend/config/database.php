<?php
// 🌚 this file is for configuring a connection to the database //
// by using a PDO(PHP Data Objects) //
class Database
{
    private $host = 'myapp.local';
    private $db_name = 'scandiweb';
    private $username = 'esa';
    private $password = 'mzabibu21';
    public $conn;

    public function getConnection()
    {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
        }catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}