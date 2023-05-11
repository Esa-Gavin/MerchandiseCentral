<?php

abstract class AbstractProduct {
    protected $sku;
    protected $name;
    protected $price;
    protected $db;

    public function __construct($db) {
        $this->db = db;
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
}