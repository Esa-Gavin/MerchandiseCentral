<?php

require_once '../abstract/AbstractProduct.php';

class Furniture extends AbstractProduct {
    private $height;
    private $width;
    private $length;

    public function __construct($db) {
        parent::__construct($db);
    }

    public function setAttributesFromData($data)
    {
        $this->setDimensions($data->height, $data->width, $data->length);
    }

    public function getHeight() {
        return $this->height;
    }

    public function setHeight($height) {
        $this->height = $height;
    }

    public function getWidth() {
        return $this->width;
    }

    public function setWidth($width) {
        $this->width = $width;
    }

    public function getLength() {
        return $this->length;
    }

    public function setLength($length) {
        $this->length = $length;
    }

    public function setAttributesFromRow($row) {
        $this->setHeight($row['height']);
        $this->setWidth($row['width']);
        $this->setLength($row['length']);
    }

    public function create() {
        $query = "INSERT INTO products (sku, name, price, product_type, height, width, length) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(1, $this->sku);
        $stmt->bindParam(2, $this->name);
        $stmt->bindParam(3, $this->price);
        $stmt->bindParam(4, $productType = 'Furniture');
        $stmt->bindParam(5, $this->height);
        $stmt->bindParam(6, $this->width);
        $stmt->bindParam(7, $this->length);

        return $stmt->execute();
    }

    public function read() {
        $query = "SELECT * FROM products WHERE sku = ? AND product_type = 'Furniture' LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(1, $this->sku);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $this->setName($row['name']);
            $this->setPrice($row['price']);
            $this->setHeight($row['height']);
            $this->setWidth($row['width']);
            $this->setLength($row['length']);
        }
    }
}
