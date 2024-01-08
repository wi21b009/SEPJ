<?php

class SearchAgent
{

    public $id;
    public $userId;
    public $brand;
    public $model;
    public $maxPrice;
    public $mileage;
    public $yearOfManufacture;
    public $country;
    public $region;
    public $engine;
    public $features;
    public $isActive;

    public function __construct(
        $id,
        $userId,
        $brand,
        $model,
        $maxPrice,
        $mileage,
        $yearOfManufacture,
        $country,
        $region,
        $engine,
        $features,
        $isActive
    ) {
        $this->id = $id;
        $this->userId = $userId;
        $this->brand = $brand;
        $this->model = $model;
        $this->maxPrice = $maxPrice;
        $this->mileage = $mileage;
        $this->yearOfManufacture = $yearOfManufacture;
        $this->country = $country;
        $this->region = $region;
        $this->engine = $engine;
        $this->features = $features;
        $this->isActive = $isActive;
    }

}
