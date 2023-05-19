<?php

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