<?php
require_once __DIR__ . '/../classes/ProductFactory.php';
require_once __DIR__ . '/../classes/product/DVD.php';
require_once __DIR__ . '/../classes/product/Book.php';
require_once __DIR__ . '/../classes/product/Furniture.php';

use PHPUnit\Framework\TestCase;

class ProductFactoryTest extends TestCase
{
    public function testCreateDVD()
    {
        $db = $this->createMock(PDO::class);
        $product = ProductFactory::createProduct('DVD', $db);
        $this->assertInstanceOf(DVD::class, $product);
    }

    public function testCreateBook()
    {
        $db = $this->createMock(PDO::class);
        $product = ProductFactory::createProduct('Book', $db);
        $this->assertInstanceOf(Book::class, $product);
    }

    public function testCreateFurniture()
    {
        $db = $this->createMock(PDO::class);
        $product = ProductFactory::createProduct('Furniture', $db);
        $this->assertInstanceOf(Furniture::class, $product);
    }
}
