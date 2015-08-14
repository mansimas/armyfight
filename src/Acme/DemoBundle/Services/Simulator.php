<?php

namespace Acme\DemoBundle\Services;

use RecursiveIteratorIterator;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Iterator\RecursiveDirectoryIterator;

class Simulator
{
    private $units;
    private $places = [];
    private $oldPlaces = [];

    public function initiateGame() {
//        $this->deleteAndMakeDirs();
        $this->createUnits();
        $this->startMoving();
    }

    private function createUnits() {
        foreach(range(0, 10) as $column) { // i like exact army formation to look nice, so its 150x140=21000 units
            foreach (range(0, 10) as $row) {
                $this->setUnits($column, $row);
            }
        }
        $this->oldPlaces = $this->places;
    }

    private function setUnits($column, $row) {
        $beginning_of_team_A = 6; //starting point on canvas for A unit to look nice on screen
        $unit_size_and_free_place = 6; //unit size= 3x3 (look js), and free place between each unit is 3 pixels.
        $beginning_of_team_B = 1100; // next side where enemy army starts appearing
        $x_a = $beginning_of_team_A + $column * $unit_size_and_free_place; // team A
        $y = $beginning_of_team_A + $row * $unit_size_and_free_place; // same for both teams
        $unitA = new Unit($x_a, $y, 1); // 1 is team A (it goes always +1 pixel every frame)
        $this->units[] = $unitA;
        $x_b = $beginning_of_team_B + $column * $unit_size_and_free_place;  // team B
        $unitB = new Unit($x_b, $y, -1); // -1 is team B (it goes always -1 pixel every frame)
        $this->units[] = $unitB;
        $this->places[$x_a.','.$y] = 1; // now that way tracking units, and calculating their next move
        $this->places[$x_b.','.$y] = -2;
    }

    private function startMoving() {
        set_time_limit(30000); // by default after 1 minute it throws exception
        foreach(range(0, 50) as $frame) { //giving 400 frames is like 400/40=10 seconds of action
            $this->places = [];
            foreach($this->units as $unit) {
                $returned = $unit->move($this->oldPlaces); //giving whole units list to every unit to look forward
                $this->places[$returned[0]] = $returned[1]; // returns (next x/y position as string ['1514,148'] ) = ( id as int [15] )
            }
            file_put_contents('assets/games/'.$frame.'.json', json_encode($this->units)); // writing into file  every frame and it uses ~2mb
            $this->oldPlaces = $this->places; //resetting old positions
        }
    }
//
//    private function deleteAndMakeDirs() {
//        $fs = new Filesystem();
//        if ($fs->exists('assets/games')) {
//            $dir = 'assets' . DIRECTORY_SEPARATOR . 'games';
//            $it = new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS);
//            $files = new RecursiveIteratorIterator($it,
//                RecursiveIteratorIterator::CHILD_FIRST);
//            foreach ($files as $file) {
//                if ($file->isDir()) {
//                    rmdir($file->getRealPath());
//                } else {
//                    unlink($file->getRealPath());
//                }
//            }
//            rmdir($dir);
//        }
//        $fs->mkdir('assets/games');
//    }

}
