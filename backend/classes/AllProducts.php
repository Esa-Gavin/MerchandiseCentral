<?php

require_once(__DIR__ . '/abstract/AbstractProduct.php');
require_once(__DIR__ . '/ProductFactory.php');
require_once(__DIR__ . '/product/DVD.php');
require_once(__DIR__ . '/product/Book.php');
require_once(__DIR__ . '/product/Furniture.php');

class AllProducts {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function fetchAll() {
        $query = "SELECT p.*, pa.attribute_name, pa.attribute_value
                FROM products p 
                LEFT JOIN product_attribute pa ON p.id = pa.product_id
                ORDER BY p.id";
        /* $query = "SELECT products.*, product_attribute.attribute_name, product_attribute.attribute_value FROM products LEFT JOIN product_attribute ON products.id = product_attribute.product_id ORDER BY products.id"; */
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $products = [];
        $lastProductId = null;
        $product = null;

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // If the id of the product in this row is different from the last one, 
            // we're starting a new product.
            if ($row['id'] !== $lastProductId) {
                // If there's an existing product, add it to the list.
                if ($product !== null) {
                    $products[] = $product;
                }

                $productType = $row['product_type'];
                $product = ProductFactory::createProduct($productType, $this->db);
                $product->setSku($row['sku']);
                $product->setName($row['name']);
                $product->setPrice($row['price']);
                $lastProductId = $row['id'];
            }
            // Always update the attributes of the current product.
            $product->setAttributesFromRow($row);
        }

        // Don't forget to add the last product to the list!
        if ($product !== null) {
            $products[] = $product;
        }
        
        return $products;
    }
}

