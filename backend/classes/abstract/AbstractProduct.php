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
}