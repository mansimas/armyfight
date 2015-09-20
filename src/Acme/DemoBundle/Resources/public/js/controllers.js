var controllers = angular.module('controllers', ['service']);

controllers.controller('game', ['$scope', '$interval', 'core',
    function($scope, $interval, Core) {
        "use strict";

        $scope.attacking = false;
        $scope.frame = 0;
        $scope.countAlly = 0;
        $scope.countEnemy = 0;

        var canvas  = document.getElementById("game"),
            ctx = canvas.getContext("2d"),
            ally_formation = [
                {color: 'red',  dmg: 10, hp: 100, column: 150, row: 150, x: 170, y: 1 }
            ],
            enemy_formation = [
                {color: 'blue', dmg: 10, hp: 100, column: 150, row: 150, x: 220, y: 1 }
            ],
            unit_width = 4,
            distance_x = 5,
            distance_y = 5;

        var core = new Core( ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx );

        function start_animation_loop() {
            core.initiate();
            $scope.promise = $interval(function() {
                if($scope.attacking == true) {
                    animate();
                    $scope.frame++;
                }
            }, 40 );
        }

        function animate() {
            clear_canvas();
            core.calculate_ally();
            core.calculate_enemy();
            $scope.countAlly = core.getCountAlly();
            $scope.countEnemy = core.getCountEnemy();
        }

        function clear_canvas() {
            ctx.clearRect(0, 0, 1800, 900);
            core.resetCounts();
        }

        $scope.log = function() {
            core.log();
        };

        $scope.add_frame = function() {
            animate();
            $scope.frame++;
        };

        start_animation_loop();
    }]);
