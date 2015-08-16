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
        enemy_start = {x: 200, y: 1},
        ally_formation = {column: 10, row: 10},
        enemy_formation = {column: 10, row: 10},
        unit_width = 3,
        distance_x = 6,
        distance_y = 4,
        forward = 4;

    function Unit(id, x, team, stopped, hp) {
        this.id = id;
        this.x = x;
        this.team = team;
        this.stopped = stopped;
        this.hp = hp;
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
            var id = 0;
            for (var column=0; column < ally_formation['column']; column++) {
                var x = ally_start['x'] + column * distance_x;
                var unit = new Unit(id, x, 1, false, 50);
                columns.push(unit);
                id++;
            }
            ally[y] = columns;
            ally_did_dmg[y] = 0;
        }
        for( y = enemy_start['y']; y < enemy_formation['row'] + enemy_start['y']; y++) {
            columns = [];
            id = 0;
            for (column= 0; column < enemy_formation['column']; column++) {
                x = enemy_start['x'] + column * distance_x;
                unit = new Unit(id, x, -1, false, 50);
                columns.push(unit);
                id++;
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
                var is_stopped = old_unit['stopped'];
                var x          = old_unit['x'];
                var hp         = old_unit['hp'];
                var stopped    = check_forward(key, column, x, last, 'ally', is_stopped);
                if(!stopped) x  = old_unit['x'] + team;
                if(stopped && column == last-1) {
                    ally_did_dmg[key] = Math.ceil(Math.random()*10);
                    hp = hp - enemy_did_dmg[key];
                }
                if(hp > 0) {
                    var unit = new Unit(column, x, team, stopped, hp);
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
                var is_stopped = old_unit['stopped'];
                var x          = old_unit['x'];
                var hp         = old_unit['hp'];
                var stopped    = check_forward(key, column, x, last, 'enemy', is_stopped);
                if(!stopped) x  = old_unit['x']+team;
                if(stopped && column == 0) {
                    enemy_did_dmg[key] = Math.ceil(Math.random()*10);
                    hp = hp - ally_did_dmg[key];
                }
                if(hp > 0) {
                    var unit = new Unit(column, x, team, stopped, hp);
                    draw(x, key, 'blue');
                    columns.unshift(unit);
                }
            }
            new_positions[key] = columns;
        });
        enemy = new_positions;
    }

    function check_forward(y, column, x, last, team, is_stopped) {
        if(is_stopped) {
            if (team == 'ally') {
                if(_.has(enemy, y) && enemy[y].length > 0) {
                    if( column == last-1) {
                        var enemy_row = enemy[y][0]['x'];
                        if (enemy_row === x + forward) return true;
                    } else {
                        var ally_row = ally[y][column+1]['x'];
                        if (ally_row === x + forward) return true;
                    }
                }
                return false;
            } else {
                if (_.has(ally, y) && ally[y].length > 0) {
                    var alength = ally[y].length;
                    if( column == 0) {
                        ally_row = ally[y][alength-1]['x'];
                        if (ally_row === x - forward) return true;
                    } else {
                        enemy_row = enemy[y][column-1]['x'];
                        if (enemy_row === x - forward) return true;
                    }
                }
                return false;
            }
        }
        if (team == 'ally') {
            if(_.has(enemy, y) && enemy[y].length > 0) {
                return ((column !== last-1 && ally[y][column+1]['x'] === x+forward) || (enemy[y][0]['x'] === x+forward));
            }else {
                return false;
            }
        } else {
            if(_.has(ally, y) && ally[y].length > 0) {
                alength = ally[y].length;
                return ((column !== 0 && enemy[y][column-1]['x'] === x-forward) || (ally[y][alength-1]['x'] === x-forward));
            } else {
                return false;
            }
        }
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
