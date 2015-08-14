<?php

namespace Acme\DemoBundle\Services;

class Unit
{
    public $x = 0;
    public $y = 0;
    public $team = 1;
    public $stopped;

    public function __construct($x, $y, $team, $stopped = false) {
        $this->x = $x;
        $this->y = $y;
        $this->team = $team;
        $this->stopped = $stopped;
    }

    public function move($places) {
        $this->checkForward($places);
        return [$this->x.','.$this->y, $this->team];
    }

    private function checkForward($places) {
        $forward = $this->x + $this->team; // TODO: find out formula to replace the 4 ifs
        $forward1 = $this->x + $this->team*2;
        $forward2 = $this->x + $this->team*3;
        $forward3 = $this->x + $this->team*4;
        if(isset($places[$forward.','.$this->y])) {
            $this->stopped = true;
        } else if (isset($places[$forward1.','.$this->y])) {
            $this->stopped = true;
        } else if (isset($places[$forward2.','.$this->y])) {
            $this->stopped = true;
        } else if (isset($places[$forward3.','.$this->y])) {
            $this->stopped = true;
        } else {
            $this->stopped = false;
        }

        if($this->stopped == false) { // move forward it is not stopped
            $this->x = $this->x + $this->team;
        }
    }
}
