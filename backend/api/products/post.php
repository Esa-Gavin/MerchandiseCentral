<?php

require_once '../../classes/Database.php';
require_once '../../classes/ProductFactory.php';

$database = new Database();
$db = $database->getConnection();

// 👇 this is for getting the raw POST data
$postData = json_decode(file_get_contents("php://input"));

// 🌚 Validation
if (!empty($postData->sku) && !empty($postData->name) && !empty($postData->price) && !empty($postData->productType)) {
    $product = ProductFactory::createProduct($postData->productType, $db);

    if ($product !== null) {
        $product->setAttributesFromData($postData);

        if ($product->create()) {
            http_response_code(201);
            echo json_encode(['message' => 'Product created successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Unable to create product']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid product type']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Incomplete data']);
}

    
