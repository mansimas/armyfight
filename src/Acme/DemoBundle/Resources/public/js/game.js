var app = angular.module('app', []);

app.controller('game', function($scope, $interval) {

    $scope.attacking = false;
    $scope.frame = 0;
    $scope.countAlly = 0;
    $scope.countEnemy = 0;

    var canvas  = document.getElementById("game"),
        ctx = canvas.getContext("2d"),

        ally = {},
        enemy = {},
        enemy_did_dmg = [],
        ally_did_dmg = [],
        ally_start = {x: 6, y: 1},
        enemy_start = {x: 1000, y: 40},
        ally_formation = {column: 100, row: 250},
        enemy_formation = {column: 100, row: 100},
        unit_width = 3,
        distance_x = 6,
        distance_y = 4,
        forward = 4;

    function Ally(x, y, stopped, hp) {
        this.x = x;
        this.y = y;
        this.team = 1;
        this.stopped = stopped;
        this.hp = hp;
        this.check_forward = function(is_at_front, column) {
            if(this.stopped) {
                if (_.has(enemy, this.y) && enemy[this.y].length > 0) {
                    if (is_at_front) {
                        var enemy_row = enemy[this.y][0]['x'];
                        if (enemy_row === this.x + forward) return true;
                    } else {
                        var ally_row = ally[this.y][column + 1]['x'];
                        if (ally_row === this.x + forward) return true;
                    }
                    return false;
                }
            }
            if(_.has(enemy, this.y) && enemy[this.y].length > 0) {
                return (
                (!is_at_front && ally[this.y][column+1]['x'] === this.x+forward) ||
                (enemy[this.y][0]['x'] === this.x+forward)
                );
            } else {
                return false;
            }
        }
    }

    function Enemy(x, y, stopped, hp) {
        this.x = x;
        this.y = y;
        this.team = -1;
        this.stopped = stopped;
        this.hp = hp;
        this.check_forward = function(is_at_front, column) {
            if(this.stopped) {
                if (_.has(ally, this.y) && ally[this.y].length > 0) {
                    var alength = ally[this.y].length;
                    if (is_at_front) {
                        var ally_row = ally[this.y][alength-1]['x'];
                        if (ally_row === this.x - forward) return true;
                    } else {
                        var enemy_row = enemy[this.y][column - 1]['x'];
                        if (enemy_row === this.x - forward) return true;
                    }
                    return false;
                }
            }
            if(_.has(ally, this.y) && ally[this.y].length > 0) {
                alength = ally[this.y].length;
                return (
                (!is_at_front && enemy[this.y][column-1]['x'] === this.x-forward) ||
                (ally[this.y][alength-1]['x'] === this.x-forward)
                );
            } else {
                return false;
            }
        }
    }

    function start_animation_loop() {
        initiate_units();
        $scope.promise = $interval(function() {
            if($scope.attacking == true) {
                animate();
                $scope.frame++;
            }
        }, 40 );
    }

    function initiate_units() {
        for(var y = ally_start['y']; y < ally_formation['row'] + ally_start['y']; y++) {
            var columns = [];
            for (var column=0; column < ally_formation['column']; column++) {
                var x = ally_start['x'] + column * distance_x;
                var unit = new Ally(x, y, false, 50);
                columns.push(unit);
            }
            ally[y] = columns;
            ally_did_dmg[y] = 0;
        }
        for( y = enemy_start['y']; y < enemy_formation['row'] + enemy_start['y']; y++) {
            columns = [];
            for (column= 0; column < enemy_formation['column']; column++) {
                x = enemy_start['x'] + column * distance_x;
                unit = new Enemy(x, y, false, 50);
                columns.push(unit);
            }
            enemy[y] = columns;
            enemy_did_dmg[y] = 0;
        }
    }

    function animate() {
        clear_canvas();
        calculate_ally();
        calculate_enemy();
        get_units();
    }

    function clear_canvas() {
        ctx.clearRect(0, 0, 1800, 900);
        $scope.countAlly = 0;
        $scope.countEnemy = 0;
    }

    function calculate_ally() {
        var new_positions = {};
        _.each(ally, function(value, key) {
            var last = value.length;
            var columns = [];
            for (var column = 0; column < last; column++) {
                var old_unit = ally[key][column];
                var team       = old_unit['team'];
                var x          = old_unit['x'];
                var hp         = old_unit['hp'];
                var stopped    = old_unit.check_forward(column == last-1, column);
                if(!stopped) x  = old_unit['x'] + team;
                if(stopped && column == last-1) {
                    ally_did_dmg[key] = Math.ceil(Math.random()*10);
                    hp = hp - enemy_did_dmg[key];
                }
                if(hp > 0) {
                    var unit = new Ally(x, key, stopped, hp);
                    draw(x, key, 'red');
                    columns.push(unit);
                }
            }
            new_positions[key] = columns;
        });
        ally = new_positions;
    }

    function calculate_enemy() {
        var new_positions = {};
        _.each(enemy, function(value, key) {
            var last = value.length;
            var columns = [];
            for (var column = last-1; column >=0; column--) {
                var old_unit = enemy[key][column];
                var team       = old_unit['team'];
                var x          = old_unit['x'];
                var hp         = old_unit['hp'];
                var stopped    = old_unit.check_forward(column == 0, column);
                if(!stopped) x  = old_unit['x']+team;
                if(stopped && column == 0) {
                    enemy_did_dmg[key] = Math.ceil(Math.random()*10);
                    hp = hp - ally_did_dmg[key];
                }
                if(hp > 0) {
                    var unit = new Enemy(x, key, stopped, hp);
                    draw(x, key, 'blue');
                    columns.unshift(unit);
                }
            }
            new_positions[key] = columns;
        });
        enemy = new_positions;
    }

    function get_units() {
        _.each(ally, function(value, key) {
            for(var b=0; b<ally[key].length; b++) {
                $scope.countAlly++;
            }
        });
        _.each(enemy, function(value, key) {
            for(var b=0; b<enemy[key].length; b++) {
                $scope.countEnemy++;
            }
        });
    }

    function draw(x, y, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        var yy = y  * distance_y;
        ctx.fillRect(x, yy, unit_width, unit_width);
    }

    $scope.log = function() {
        console.log(ally, enemy);
    };

    $scope.add_frame = function() {
        animate();
        $scope.frame++;
    };

    start_animation_loop();
});
