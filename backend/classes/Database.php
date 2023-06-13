<?php

use Dotenv\Dotenv;

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {

        $this->host = '127.0.0.1';
        $this->db_name = 'scandiweb';
        $this->username = 'my_user';
        $this->password = 'Mzabibu21#';

        /* // debug lines
        var_dump($this->host);
        var_dump($this->db_name);
        var_dump($this->username);
        var_dump($this->password); */
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
