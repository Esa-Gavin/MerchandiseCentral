<?php

require_once(__DIR__ . '/abstract/AbstractProduct.php'); 
require_once __DIR__ . '/product/DVD.php';
require_once __DIR__ . '/product/Book.php';
require_once __DIR__ . '/product/Furniture.php';

class ProductFactory
{
    public static function createProduct($productType, $db)
    {
        $classMap = [
            'dvd' => 'DVD',
            'book' => 'Book',
            'furniture' => 'Furniture'
        ];

        $key = strtolower($productType);

        if (!isset($classMap[$key]) || !class_exists($classMap[$key])) {
            throw new Exception("Invalid product type: {$productType}");
        }

        $productClass = $classMap[$key];

        return new $productClass($db);
    }
}
