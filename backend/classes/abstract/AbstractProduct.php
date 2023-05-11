<?php

require_once '../product/DVD.php';
require_once '../product/Book.php';
require_once '../product/Furniture.php';

abstract class AbstractProduct {
    protected $sku;
    protected $name;
    protected $price;
    protected $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getSku() {
        return $this->sku;
    }

    public function setSku($sku) {
        $this->sku = $sku;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getPrice() {
        return $this->price;
    }

    public function setPrice($price) {
        $this->price = $price;
    }

    // 👇 Abstract CRUD methods
    abstract public function create();
    abstract public function read();

    // 👇 Helper method to read all products
    public function readAll() {
        $query = "SELECT * FROM products ORDER BY id";
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $products = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $productType = $row['product_type'];

            switch ($productType) {
                case 'DVD':
                    $product = new DVD($this->db);
                    break;
                case 'Book':
                    $product = new Book($this->db);
                    break;
                case 'Furniture':
                    $product = new Furniture($this->db);
                    break;
                default:
                    throw new Exception("Invalid product type: {$productType}");
            }

            $product->setSku($row['sku']);
            $product->setName($row['name']);
            $product->setPrice($row['price']);
            $product->setAttributesFromRow($row);

            $products[] = $product;
        }

        return $products;
    }
}