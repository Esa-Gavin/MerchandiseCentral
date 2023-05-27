<?php

/* require_once __DIR__ . '/../vendor/autoload.php'; */

use Dotenv\Dotenv;

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        /* $dotenv = Dotenv::createImmutable(__DIR__ . '/../config');
        $dotenv->load(); */

        /* // Add this line:
        var_dump(file_get_contents(__DIR__ . '/../config/.env'));
        */

        $this->host = $_ENV['DB_HOST'];
        $this->db_name = $_ENV['DB_NAME'];
        $this->username = $_ENV['DB_USER'];
        $this->password = $_ENV['DB_PASS'];

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
