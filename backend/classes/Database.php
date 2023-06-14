<?php

use Dotenv\Dotenv;

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

public function __construct() {
    $url = parse_url("mysql://b2c687f6959cc4:bc0d6b54@us-cdbr-east-06.cleardb.net/heroku_a89432921adc9f0?reconnect=true");

    $this->host = $url["host"];
    $this->db_name = substr($url["path"], 1);
    $this->username = $url["user"];
    $this->password = $url["pass"];
}

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host={$this->host};dbname={$this->db_name}", $this->username, $this->password);
            $this->conn->exec("set names utf8");

            /* // run a test query
            $stmt = $this->conn->query('SELECT * FROM products');

            // fetch and display the results
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                print_r($row);
            } */

        } catch (PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
            throw $exception; 
        }

        return $this->conn;
    }
}
