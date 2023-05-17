<?php

require_once './abstract/AbstractProduct.php';
require_once './product/DVD.php';
require_once './product/Book.php';
require_once './product/Furniture.php';

class ProductFactory
{
    public static function createProduct($productType, $db)
    {
        $product = null;

        $productClass = ucfirst(strtolower($productType));
        if (class_exists($productClass)) {
            $product = new $productClass($db);
        }

        if ($product === null) {
            throw new Exception("Invalid product type: {$productType}");
        }

        return $product;
    }
}