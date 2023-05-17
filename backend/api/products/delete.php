<?php

require_once '../../classes/Database.php';
require_once '../../classes/abstract/AbstractProduct.php';
require_once '../../classes/AllProducts.php';
require_once '../../classes/product/DVD.php';
require_once '../../classes/product/Book.php';
require_once '../../classes/product/Furniture.php';

// 👇 Create a database instance connection
$database = new Database();
$db = $database->getConnection();

// 🌚 get the raw POST data
$postData = json_decode(file_get_contents("php://input"));

// 🌝 Check if SKU is provided
if (!empty($postData->sku)) {
    // Instantiate the AllProducts class
    $product = new AllProducts($db);
    $product->setSku($postData->sku);

    // 😇 Here we call the delete method
    if ($product->delete()) {
        http_response_code(200);
        echo json_encode(['message' => 'Product deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Unable to delete product']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'SKU not provided']);
}