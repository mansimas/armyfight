<?php

namespace Acme\DemoBundle\Services;

class Coord
{
public $x = 0;
public $y = 0;
public function __construct($x, $y) {
$this->x = $x;
$this->y = $y;
}

/**
* @return int
*/
public function getX()
{
return $this->x;
}

/**
* @param int $x
*/
public function setX($x)
{
$this->x = $x;
}

/**
* @return int
*/
public function getY()
{
return $this->y;
}

/**
* @param int $y
*/
public function setY($y)
{
$this->y = $y;
}
}
