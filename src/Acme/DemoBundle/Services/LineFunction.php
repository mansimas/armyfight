<?php

namespace Acme\DemoBundle\Services;

/**
 * Handling of y=mx+b
 * Note the line direction is assumed to be AB thus point order in constructor
 * matters if direction functionality is going to be used
 */
class LineFunction
{
    /**
     * Directional constant
     *
     * @var float
     */
    private $directionConstant;

    /**
     * Y intercept constant
     *
     * @var float
     */
    private $yIntercept;

    /**
     * When trajectory is parallel to y axis
     *
     * @var float
     */
    private $constX;

    public function __construct($ax, $ay, $bx, $by)
    {
        if (abs($ax - $bx) < 0.0001) {
            $this->constX = $ax;
        } else {
            $this->directionConstant = ($ay - $by) / ($ax - $bx);
            $this->yIntercept = $ay - $this->directionConstant * $ax;
        }

        $this->points = [
            'a' => ['x' => $ax, 'y' => $ay],
            'b' => ['x' => $bx, 'y' => $by]
        ];
    }

    /**
     * Calculate x value at y
     *
     * @param float $y
     * @return float
     */
    public function getX($y)
    {
        if ($this->constX !== null) {
            return $this->constX;
        }

        return ($y - $this->yIntercept) / $this->directionConstant;
    }

    /**
     * Calculate y value at x
     *
     * @param float $x
     * @return float|false
     */
    public function getY($x)
    {
        if ($this->constX !== null) {
            return false;
        }

        return $this->directionConstant * $x + $this->yIntercept;
    }

    /**
     * Check if x change is positive in AB direction
     *
     * @return bool
     */
    public function isPositiveXDirection()
    {
        return $this->points['b']['x'] - $this->points['a']['x'] > 0;
    }

    /**
     * Check if y change is positive in AB direction
     *
     * @return bool
     */
    public function isPositiveYDirection()
    {
        return $this->points['b']['y'] - $this->points['a']['y'] > 0;
    }
}
