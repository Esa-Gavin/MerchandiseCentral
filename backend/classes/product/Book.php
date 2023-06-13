<?php

require_once(__DIR__ . '/../abstract/AbstractProduct.php');

class Book extends AbstractProduct implements JsonSerializable {
    private $weight;

    public function __construct($db) {
        parent::__construct($db);
    }

    public function setAttributesFromData($data)
    {
        parent::setAttributesFromData($data);
        if (property_exists($data, 'weight')) {
            $this->setWeight($data->weight);
        }
    }

    public function getWeight() {
        return $this->weight;
    }

    public function setWeight($weight) {
        $this->weight = $weight;
    }

    public function setAttributesFromRow($row) {
        if(isset($row['attribute_name']) && $row['attribute_name'] == 'weight') {
            $this->setWeight($row['attribute_value']);
        }
    }


    public function jsonSerialize(): mixed {
        return [
            'sku' => $this->sku,
            'name' => $this->name,
            'price' => $this->price,
            'type' => 'Book',
            'weight' => $this->getWeight()
        ];
    }

    public function create() {
        // start a transaction
        $this->db->beginTransaction();

        try {
            // insert the product into products table
            $query = "INSERT INTO products (sku, name, price, product_type) VALUES (?, ?, ?, ?)";
            $stmt = $this->db->prepare($query);

            $productType = 'Book'; // 👈 Set value before binding
            $stmt->bindParam(1, $this->sku);
            $stmt->bindParam(2, $this->name);
            $stmt->bindParam(3, $this->price);
            $stmt->bindParam(4, $productType);

            $stmt->execute();

            // get the id of the inserted product
            $product_id = $this->db->lastInsertId();

            // insert the attributes into product_attribute table
            $query = "INSERT INTO product_attribute (product_id, attribute_name, attribute_value) VALUES (?, ?, ?)";
            $stmt = $this->db->prepare($query);

            $attribute_name = 'weight'; // 👈 Set value before binding
            $stmt->bindParam(1, $product_id);
            $stmt->bindParam(2, $attribute_name);
            $stmt->bindParam(3, $this->weight);

            $stmt->execute();

            // commit the transaction
            $this->db->commit();

            return true;
        } catch (PDOException $e) {
            // rollback the transaction if something failed
            $this->db->rollBack();

            return false;
        }
    }

    public function read() {
        // Use a JOIN in your SQL statement to get data from both the products table and product_attribute table
        $query = "SELECT p.*, pa.attribute_name, pa.attribute_value
                FROM products p 
                LEFT JOIN product_attribute pa ON p.id = pa.product_id
                WHERE p.sku = ? AND p.product_type = 'Book'";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(1, $this->sku);
        $stmt->execute();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // For the first iteration, set the name and price
        if (!isset($this->name)) {
        $this->setName($row['name']);
        $this->setPrice($row['price']);
        }

        // Then, based on attribute_name, set the weight
        $this->setAttributesFromRow($row);
        }   
    }
}
