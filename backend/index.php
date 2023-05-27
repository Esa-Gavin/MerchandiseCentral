<?php
require_once __DIR__ . '/backend/vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/backend/config');
$dotenv->load();

echo "Hello, this is the PHP backend"
?>