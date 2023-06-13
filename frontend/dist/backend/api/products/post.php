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

    
