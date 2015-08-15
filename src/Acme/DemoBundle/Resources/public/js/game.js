var app = angular.module('app', []);

app.controller('game', function($scope, $interval) {

    $scope.attacking = false;
    $scope.frame = 0;
    $scope.countAlly = 0;
    $scope.countEnemy = 0;

    var canvas  = document.getElementById("game"),
        ctx = canvas.getContext("2d"),

        ally = [],
        enemy = [],
        enemy_did_dmg = [],
        ally_did_dmg = [],
        ally_start = {x: 6, y: 6},
        enemy_start = {x: 1000, y: 6},
        ally_formation = {column: 60, row: 20},
        enemy_formation = {column: 30, row: 40},
        unit_width = 3,
        distance_x = 6,
        distance_y = 6,
        ally_length = [],
        enemy_length = [],
        forward = 4;

    function Unit(id, x, y, team, stopped, hp) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.team = team;
        this.stopped = stopped;
        this.hp = hp;
    }

    function start_animation_loop() {
        initiate_variables();
        initiate_units();
        $scope.promise = $interval(function() {
            if($scope.attacking == true) {
                animate();
                $scope.frame++;
            }
        }, 40 );
    }

    function initiate_variables() {
        if(isEven(enemy_start['x'])) {

        }
    }

    function initiate_units() {
        for(var row=0; row < ally_formation['row']; row++) {
            var columns = [];
            var id = 0;
            for (var column=0; column < ally_formation['column']; column++) {
                var x = ally_start['x'] + column * distance_x;
                var y = ally_start['y'] + row    * distance_y;
                var unit = new Unit(id, x, y, 1, false, 50);
                columns.push(unit);
                id++;
            }
            ally[row] = columns;
            ally_did_dmg[row] = 0;
            ally_length[row] = columns.length;
        }
        for(row=0; row < enemy_formation['row']; row++) {
            columns = [];
            id = 0;
            for (column= 0; column < enemy_formation['column']; column++) {
                x = enemy_start['x'] + column * distance_x;
                y = enemy_start['y'] + row    * distance_y;
                unit = new Unit(id, x, y, -1, false, 50);
                columns.push(unit);
                id++;
            }
            enemy[row] = columns;
            enemy_did_dmg[row] = 0;
            enemy_length[row] = columns.length;
        }
        check_for_same_rows();
    }

    function check_for_same_rows() {
        if(ally.length > enemy.length) {
            var difference = ally.length-enemy.length;
            for (var d=0; d<difference; d++) {
                enemy[enemy.length+d] = [];
                enemy_length[enemy.length+d] = 0;
            }
        }
        if(ally.length < enemy.length) {
            difference = enemy.length-ally.length;
            for (d=0; d<difference; d++) {
                ally[ally.length+d] = [];
                ally_length[ally.length+d] = 0;
            }
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
        var new_positions = [];
        for (var row = 0; row < ally.length; row++) {
            var last = ally_length[row];
            var columns = [];
            if(last > 0) {
                for (var column = 0; column < last; column++) {
                    var old_unit = ally[row][column];
                    var y          = old_unit['y'];
                    var team       = old_unit['team'];
                    var is_stopped = old_unit['stopped'];
                    var x          = old_unit['x'];
                    var hp         = old_unit['hp'];
                    var stopped    = check_forward(row, column, x, last, 'ally', is_stopped);
                    if(!stopped) x  = old_unit['x']+team;
                    if(stopped && column == last-1) {
                        ally_did_dmg[row] = Math.ceil(Math.random()*10);
                        hp = hp - enemy_did_dmg[row];
                    }
                    if(hp > 0) {
                        var unit = new Unit(column, parseInt(x), y, team, stopped, hp);
                        draw(x, y, 'red');
                        columns.push(unit);
                    }
                }
            }
            new_positions[row] = columns;
            ally_length[row] = columns.length;
        }
        ally = new_positions;
    }

    function calculate_enemy() {
        var new_positions = [];
        for (var row = 0; row < enemy.length; row++) {
            var last = enemy_length[row];
            var columns = [];
            if(last > 0) {
                for (var column = last-1; column >=0; column--) {
                    var old_unit = enemy[row][column];
                    var y          = old_unit['y'];
                    var team       = old_unit['team'];
                    var is_stopped = old_unit['stopped'];
                    var x          = old_unit['x'];
                    var hp         = old_unit['hp'];
                    var stopped    = check_forward(row, column, x, last, 'enemy', is_stopped);
                    if(!stopped) x  = old_unit['x']+team;
                    if(stopped && column == 0) {
                        enemy_did_dmg[row] = Math.ceil(Math.random()*10);
                        hp = hp - ally_did_dmg[row];
                    }
                    if(hp > 0) {
                        var unit = new Unit(column, parseInt(x), y, team, stopped, hp);
                        draw(x, y, 'blue');
                        columns.unshift(unit);
                    }
                }
            }
            new_positions[row] = columns;
            enemy_length[row] = columns.length;
        }
        enemy = new_positions;
    }

    function check_forward(row, column, x, last, team, is_stopped) {
        if(is_stopped) {
            if (team == 'ally') {
                if(enemy[row].length > 0) {
                    if( column == last-1) {
                        var enemy_row = enemy[row][0]['x'];
                        if (enemy_row === x + forward) return true;
                    } else {
                        var ally_row = ally[row][column+1]['x'];
                        if (ally_row === x + forward) return true;
                    }
                }
                return false;
            } else {
                var alength = ally[row].length;
                if (alength > 0) {
                    if( column == 0) {
                        ally_row = ally[row][alength-1]['x'];
                        if (ally_row === x - forward) return true;
                    } else {
                        enemy_row = enemy[row][column-1]['x'];
                        if (enemy_row === x - forward) return true;
                    }
                }
                return false;
            }
        }
        if (team == 'ally') {
            if(enemy[row].length > 0) {
                return ((column !== last-1 && ally[row][column+1]['x'] === x+forward) || (enemy[row][0]['x'] === x+forward));
            }else {
                return false;
            }
        } else {
            alength = ally[row].length;
            if(alength > 0) {
                return ((column !== 0 && enemy[row][column-1]['x'] === x-forward) || (ally[row][alength-1]['x'] === x-forward));
            } else {
                return false;
            }
        }
    }

    function get_units() {
        for(var a=0; a<ally.length; a++) {
            for(var b=0; b<ally[a].length; b++) {
                $scope.countAlly++;
            }
        }
        for(a=0; a<enemy.length; a++) {
            for(b=0; b<enemy[a].length; b++) {
                $scope.countEnemy++;
            }
        }
    }

    function draw(x, y, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(x, y, unit_width, unit_width);
    }

    function isEven(value) {
        return value % 2 == 0;
    }

    $scope.log = function() {
        $scope.log1();
        $scope.log2();
    };

    $scope.log1 = function() {
        var length = ally[0].length;
        var allys = [
            ally[0][length-1]['x'], ally[0][length-1]['stopped'],
            ally[0][length-2]['x'], ally[0][length-2]['stopped'],
            ally[0][length-3]['x'], ally[0][length-3]['stopped'],
            ally[0].length
        ];
        var enemys = [
            enemy[0][0]['x'], enemy[0][0]['stopped'],
            enemy[0][1]['x'], enemy[0][1]['stopped'],
            enemy[0][2]['x'], enemy[0][2]['stopped'],
            enemy[0].length
        ];
        console.log(allys, enemys);
    };

    $scope.log2 = function() {

        var allys = [ally[0].length];
        for(var a=0; a<ally[0].length; a++) {
            allys.push(ally[0][a]['x']);
        }
        var enemys = [enemy[0].length];
        for(a=0; a<enemy[0].length; a++) {
            enemys.push(enemy[0][a]['x']);
        }
        console.log(allys, enemys);
    };

    $scope.add_frame = function() {
        animate();
        $scope.frame++;
    };

    start_animation_loop();

});
