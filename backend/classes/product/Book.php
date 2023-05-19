<?php

require_once(__DIR__ . '/../abstract/AbstractProduct.php');

class Book extends AbstractProduct {
    private $weight;

    public function __construct($db) {
        parent::__construct($db);
    }

    public function setAttributesFromData($data)
    {
        $this->setWeight($data->weight);
    }

    public function getWeight() {
        return $this->weight;
    }

    public function setWeight($weight) {
        $this->weight = $weight;
    }

    public function setAttributesFromRow($row) {
        $this->setWeight($row['weight']);
    }

    public function create() {
        $query = "INSERT INTO products (sku, name, price, product_type, weight) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(1, $this->sku);
        $stmt->bindParam(2, $this->name);
        $stmt->bindParam(3, $this->price);
        $stmt->bindParam(4, $productType = 'Book');
        $stmt->bindParam(5, $this->weight);

        return $stmt->execute();
    }

    public function read() {
        $query = "SELECT * FROM products WHERE sku = ? AND product_type = 'Book' LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(1, $this->sku);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $this->setName($row['name']);
            $this->setPrice($row['price']);
            $this->setWeight($row['weight']);
        }
    }
}
