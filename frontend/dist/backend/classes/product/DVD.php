<?php

require_once(__DIR__ . '/../abstract/AbstractProduct.php');

class DVD extends AbstractProduct implements JsonSerializable {
    private $size;

    public function __construct($db) {
        parent::__construct($db);
    }

    public function setAttributesFromData($data)
    {
        $this->setSku($data->sku);
        $this->setName($data->name);
        $this->setPrice($data->price);
        $this->setSize($data->size);
    }

    public function getSize() {
        return $this->size;
    }

    public function setSize($size) {
        $this->size = $size;
    }

    public function setAttributesFromRow($row) {
        if(isset($row['attribute_name']) && $row['attribute_name'] == 'size') {
            $this->setSize($row['attribute_value']);
        }
    }

    public function jsonSerialize(): mixed {
        return [
            'sku' => $this->sku,
            'name' => $this->name,
            'price' => $this->price,
            'type' => 'DVD', 
            'size' => $this->size,
        ];
    }


    public function create() {
        // start a transaction
        $this->db->beginTransaction();

        try {
            // insert the product into products table
            $query = "INSERT INTO products (sku, name, price, product_type) VALUES (?, ?, ?, ?)";
            $stmt = $this->db->prepare($query);

            $productType = 'DVD';

            $stmt->bindParam(1, $this->sku);
            $stmt->bindParam(2, $this->name);
            $stmt->bindParam(3, $this->price);
            $stmt->bindParam(4, $productType);

            $stmt->execute();

            // get the id of the inserted products
            $product_id = $this->db->lastInsertId();

            // insert the attribute into product_attribute table
            $query = "INSERT INTO product_attribute (product_id, attribute_name, attribute_value) VALUES (?, ?, ?)";
            $stmt = $this->db->prepare($query);

            $attribute_name = 'size';

            $stmt->bindParam(1, $product_id);
            $stmt->bindParam(2, $attribute_name);
            $stmt->bindParam(3, $this->size);

            $stmt->execute();

            // commit the transaction
            $this->db->commit();

            return true;
        } catch (PDOException $e) {
            // rollback the transaction if something failed
            $this->db->rollBack();

            // for debugging: print the error message
            echo "Error: " . $e->getMessage();

            return false;
        }
    }

    public function read() {
        $query = "SELECT p.*, pa.attribute_name, pa.attribute_value
                FROM products p 
                LEFT JOIN product_attribute pa ON p.id = pa.product_id
                WHERE p.sku = ? AND p.product_type = 'DVD'";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(1, $this->sku);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $this->setName($row['name']);
            $this->setPrice($row['price']);
        }
        $this->setAttributesFromRow($row);
    }
}