<?php

require_once(__DIR__ . '/../abstract/AbstractProduct.php');

class Furniture extends AbstractProduct implements JsonSerializable {
    private $height;
    private $width;
    private $length;

    public function __construct($db) {
        parent::__construct($db);
    }

    public function setAttributesFromData($data)
    {
        parent::setAttributesFromData($data);
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

    public function setDimensions($height, $width, $length) {
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
    }

    public function setAttributesFromRow($row) {
        if(isset($row['attribute_name']) && $row['attribute_name'] == 'height') {
            $this->setHeight($row['attribute_value']);
        }
        if(isset($row['attribute_name']) && $row['attribute_name'] == 'width') {
            $this->setWidth($row['attribute_value']);
        }
        if(isset($row['attribute_name']) && $row['attribute_name'] == 'length') {
            $this->setLength($row['attribute_value']);
        }
    }


    public function jsonSerialize(): mixed {
        return [
            'sku' => $this->sku,
            'name' => $this->name,
            'price' => $this->price,
            'height' => $this->height,
            'width' => $this->width,
            'length' => $this->length,
            'type' => 'Furniture'
        ];
    }

    public function create() {
        // start a transaction
        $this->db->beginTransaction();

        try {

            // assign the product type before calling bindParam
            $productType = 'Furniture';

            $query = "INSERT INTO products (sku, name, price, product_type) VALUES (?, ?, ?, ?)";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(1, $this->sku);
            $stmt->bindParam(2, $this->name);
            $stmt->bindParam(3, $this->price);
            $stmt->bindParam(4, $productType);

            $stmt->execute();

            // get the id of the inserted product
            $product_id = $this->db->lastInsertId();

            // insert the attributes into product_attribute table
            $attributes = ['height' => $this->height, 'width' => $this->width, 'length' => $this->length];
            foreach($attributes as $name => $value) {
                $query = "INSERT INTO product_attribute (product_id, attribute_name, attribute_value) VALUES (?, ?, ?)";
                $stmt = $this->db->prepare($query);
                $stmt->bindParam(1, $product_id);
                $stmt->bindParam(2, $name);
                $stmt->bindParam(3, $value);

                $stmt->execute();
            }

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
        // Use a JOIN in your SQL statement to get data from both the products table and product_attribute table
        $query = "SELECT p.*, pa.attribute_name, pa.attribute_value
                FROM products p 
                LEFT JOIN product_attribute pa ON p.id = pa.product_id
                WHERE p.sku = ? AND p.product_type = 'Furniture'";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(1, $this->sku);
        $stmt->execute();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // For the first iteration, set the name and price
        if (!isset($this->name)) {
            $this->setName($row['name']);
            $this->setPrice($row['price']);
        }

        // Then, based on attribute_name, set the height, width, or length
        $this->setAttributesFromRow($row);
        }   
    }
}
