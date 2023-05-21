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
        $query = "SELECT products.*, product_attribute.attribute_name, product_attribute.attribute_value FROM products LEFT JOIN product_attribute ON products.id = product_attribute.product_id ORDER BY products.id";
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $products = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $productType = $row['product_type'];
            $product = ProductFactory::createProduct($productType, $this->db);
            $product->setSku($row['sku']);
            $product->setName($row['name']);
            $product->setPrice($row['price']);
            if(isset($row['attribute_name']) && $row['attribute_name'] == 'size') {
                $product->setAttributesFromRow($row);
            }
            
            $products[] = $product;
        }

        return $products;
    }
}

