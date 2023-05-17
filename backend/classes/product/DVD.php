<?php

require_once '../abstract/AbstractProduct.php';

class DVD extends AbstractProduct {
    private $size;

    public function __construct($db) {
        parent::__construct($db);
    }

    public function setAttributesFromData($data)
    {
        $this->setSize($data->size);
    }

    public function getSize() {
        return $this->size;
    }

    public function setSize($size) {
        $this->size = $size;
    }

    public function setAttributesFromRow($row) {
        $this->setSize($row['size']);
    }

    public function create() {
        $query = "INSERT INTO products (sku, name, price, product_type, size) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(1, $this->sku);
        $stmt->bindParam(2, $this->name);
        $stmt->bindParam(3, $this->price);
        $stmt->bindParam(4, $productType = 'DVD');
        $stmt->bindParam(5, $this->size);

        return $stmt->execute();
    }

    public function read() {
        $query = "SELECT * FROM products WHERE sku = ? AND product_type = 'DVD' LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(1, $this->sku);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $this->setName($row['name']);
            $this->setPrice($row['price']);
            $this->setSize($row['size']);
        }
    }
}