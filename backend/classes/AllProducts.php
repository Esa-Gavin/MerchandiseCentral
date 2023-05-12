<?php

require_once '../classes/abstract/AbstractProduct.php';

class AllProducts extends AbstractProduct {
    
    public function create() {
        throw new Exception('Not implemented');
    }

    public function read() {
        throw new Exception('Not implemented');
    }
}