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
require_once '../../classes/product/DVD.php';
require_once '../../classes/product/Book.php';
require_once '../../classes/product/Furniture.php';

// 👇 Create a database instance connection
$database = new Database();
$db = $database->getConnection();

// 🌚 get the raw POST data
$postData = json_decode(file_get_contents("php://input"));

// 🌝 Check if SKU is provided
if (!empty($postData) && is_array($postData)) {
    $skuArray = $postData;

    // Prepare a query with the correct number of placeholders based on the number of SKUs
    $placeholders = str_repeat('?,', count($skuArray) - 1) . '?';

    // Prepare the delete query
    $query = "DELETE FROM products WHERE sku IN ($placeholders)";
    $stmt = $db->prepare($query);

    // Bind each SKU from the array to the delete query
    foreach ($skuArray as $index => $sku) {
        $stmt->bindValue($index + 1, $sku);
    }

    // Execute the delete query
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['message' => 'Products deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Unable to delete products']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'SKUs not provided or not an array']);
}