<?php

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}


require_once '../../classes/Database.php';
require_once '../../classes/abstract/AbstractProduct.php';
require_once '../../classes/AllProducts.php';
require_once '../../classes/product/DVD.php';
require_once '../../classes/product/Book.php';
require_once '../../classes/product/Furniture.php';

// 👇 This is for creating a database connection instance
$database = new Database();
$db = $database->getConnection();

if ($db === null) {
    die('Database connection is null');
}

$product = new AllProducts($db);

// 🌚 Call the readAll() method to get all products
$products = $product->fetchAll();

// 👇 Convert the resulting array of product objects to JSON
$jsonData = json_encode($products, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $jsonData;