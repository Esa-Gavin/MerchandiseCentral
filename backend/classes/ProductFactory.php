<?php

require_once(__DIR__ . '/abstract/AbstractProduct.php'); 
require_once __DIR__ . '/product/DVD.php';
require_once __DIR__ . '/product/Book.php';
require_once __DIR__ . '/product/Furniture.php';

class ProductFactory
{
    public static function createProduct($productType, $db)
    {
        $product = null;

        $productClass = strtoupper($productType);
        // 👇 this is a debug line i used to display the product class
        /* echo "Product class: " . $productClass . PHP_EOL; */
        if (class_exists($productClass)) {
            $product = new $productClass($db);
        }

        if ($product === null) {
            throw new Exception("Invalid product type: {$productType}");
        }

        return $product;
    }
}