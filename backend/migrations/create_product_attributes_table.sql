CREATE TABLE product_attribute (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    attribute_name VARCHAR(255) NOT NULL,
    attribute_value VARCHAR(255) NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
)