<?php

namespace Acme\DemoBundle\Services;

/**
 * Handling of y=mx+b
 * Note the line direction is assumed to be AB thus point order in constructor
<?php

namespace Acme\DemoBundle\Services;

/**
 * Handling of y=mx+b
 * Note the line direction is assumed to be AB thus point order in constructor
 * matters if direction functionality is going to be used
 */
class Game {
    const X_DIFF = 1.666; //real map comparison to heatmap is x=40:20, y=20:10
    const Y_DIFF = 1.666;
    public function addHeatmapData()
    {
//        $previous = new Coord(10, 10);
//        $current = new Coord(0, 0);
        $previous = new Coord(0, 0);
        $current = new Coord(10, 10);
        $pointsX = [];
        $pointsY = [];
        if($current->getX() < 0 || $current->getY() < 0 || $previous->getX() < 0 || $previous->getX() < 0 ) {
            return false;
        }
        $current_x = intval($current->getX() / self::X_DIFF);
        $previous_x = intval($previous->getX() / self::X_DIFF);
        $current_y = intval($current->getY() / self::Y_DIFF);
        $previous_y = intval($previous->getY() / self::Y_DIFF);
        $lineFunction = new LineFunction($previous->getX(), $previous->getY(), $current->getX(), $current->getY());
        $xSquares = $current_x - $previous_x;
        $ySquares = $current_y - $previous_y;
        $pointsX[] = [$previous_x . ', ' . $previous_y, $previous_x, $previous_y];
        foreach (range(0, $ySquares) as $ySquare) {
            $heatmap_coord = abs($previous_x+$ySquare) . ', ' . abs($previous_y+$ySquare);
            if($ySquare < 0) {
                $strikingY = ($previous->getY() - ceil($previous->getY() + $ySquare)) * self::Y_DIFF;
                $xPoint = $lineFunction->getX($strikingY);
                $pointsY[] = [$heatmap_coord, abs($xPoint), abs($strikingY)];
            } else if($ySquare > 0) {
                $strikingY = ($previous->getY() - floor($previous->getY() + $ySquare)) * self::Y_DIFF;
                $xPoint = $lineFunction->getX($strikingY);
                $pointsY[] = [$heatmap_coord, abs($xPoint), abs($strikingY)];
            }
        }

        foreach (range(0, $xSquares) as $xSquare) {
            $heatmap_coord = abs($previous_x+$xSquare) . ', ' . abs($previous_y+$xSquare);
            if($xSquare < 0) {
                $strikingX = ($previous->getX() - ceil($previous->getX() + $xSquare)) * self::X_DIFF;
                $xPoint = $lineFunction->getY($strikingX);
                $pointsX[] = [$heatmap_coord, abs($strikingX), abs($xPoint)];
            } else if($xSquare > 0) {
                $strikingX = ($previous->getX() - floor($previous->getX() + $xSquare)) * self::X_DIFF;
                $xPoint = $lineFunction->getY($strikingX);
                $pointsX[] = [$heatmap_coord, abs($strikingX), abs($xPoint)];
            }
        }
        $x = array_merge($pointsX, $pointsY);
//        $unique_array = [];
//        foreach($x as $key => $val) {
//            $unique_array[] = $val[0].','.$val[1];
//        }
//        array_unique($unique_array);
////        if(abs($x[0][0] - end($x[0]) > 0.002)) {
////            asort($x);
////        } else {
////
////        }
//        asort($unique_array);

        return $x;

    }

}










