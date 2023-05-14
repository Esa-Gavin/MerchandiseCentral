<?php

require_once './abstract/AbstractProduct.php';
require_once './product/DVD.php';
require_once './product/Book.php';
require_once './product/Furniture.php';

class AllProducts {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function fetchAll() {
        $query = "SELECT * FROM products ORDER BY id";
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $products = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $productType = $row['product_type'];
            $product = ProductFactory::create($productType, $this->db);
            $product->setSku($row['sku']);
            $product->setName($row['name']);
            $product->setPrice($row['price']);
            $product->setAttributeFromRow($row);

            $products[] = $product;
        }

        return $products;
    }
}
