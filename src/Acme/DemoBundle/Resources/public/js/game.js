var app = angular.module('app', []);

app.controller('game', function($scope, $interval) {

    $scope.attacking = false;
    $scope.frame = 0;
    $scope.countAlly = 0;
    $scope.countEnemy = 0;

    var canvas  = document.getElementById("game"),
        ctx = canvas.getContext("2d"),

        y_ally = [],
        y_enemy = [],
        ally = {},
        enemy = {},
        ally_formation = [
            {color: 'red', column: 3, row: 3, hp: 50, x: 150, y: 10}
        ],
        enemy_formation = [
            {color: 'blue', column: 3, row: 3, hp: 50, x: 200, y: 10}
        ],
        unit_width = 4,
        distance_x = 5,
        distance_y = 5;

    function start_animation_loop() {
        initiate_units();
        $scope.promise = $interval(function() {
            if($scope.attacking == true) {
                animate();
                $scope.frame++;
            }
        }, 40 );
    }

    function Ally(x, y, hp, color) {
        this.x = x;
        this.y = y;
        this.move_y = 0;
        this.direction_y = 0;
        this.target = 0;
        this.team = 1;
        this.stopped = false;
        this.hp = hp;
        this.color = color;
        this.attacking = 0;
        this.damage = Math.ceil(2+Math.random()*3);
        this.survived = function() {
            if(this.hp <= 0) return false;
            this.check_forward();
            return true;
        };
        this.find_enemy = function() {
            var y_array = [0, 1, -1, 2, -2];
            var x_array = [0, 1, -1, 2, -2];
            for(var yy = 0; yy<y_array.length; yy++) {
                var target_y = this.y+y_array[yy];
                for(var xx = 0; xx<x_array.length; xx++) {
                    var target_x = this.x+(this.team * distance_x)+x_array[xx];
                    if (_.has(enemy[target_y], target_x)) {
                        this.attacking = enemy[target_y][target_x];
                        this.stopped = true;
                        return true;
                    }
                }
            }
            return false;
        };
        this.check_forward = function() {
            var opponent = this.x+(this.team * distance_x);

            if (this.stopped) {
                if (this.attacking == 0) {
                    if (!_.has(ally[this.y], opponent)) {
                        this.move_forward();
                    }
                } else {
                    if(this.attacking['hp'] > 0) {
                        this.attacking['hp'] -= this.damage;
                    } else {
                        this.attacking = 0;
                    }
                }
            } else {
                if (!this.find_enemy()) {
                    if (_.has(ally[this.y], opponent)) {
                        this.stopped = true;
                        this.attacking = 0;
                    } else {
                        this.move_forward();
                    }
                }
            }
        };

        this.move_forward = function() {
            this.x += this.team;
            this.stopped = false;
            this.attacking = 0;
            //if (this.target != 0 && this.target != undefined) {
            //    console.log(this.target);
            //    if(this.move_y != 0 ) {
            //        if(this.move_y < distance_y) {
            //            this.move_y ++;
            //        } else {
            //            this.move_y = 0;
            //        }
            //    } else if(this.target['y'] > this.y) {
            //        if(
            //            !_.has(ally[this.y+1][this.x]) ||
            //            !_.has(ally[this.y+1][this.x-1]) ||
            //            !_.has(ally[this.y+1][this.x-2]) ||
            //            !_.has(ally[this.y+1][this.x-1]) ||
            //            !_.has(ally[this.y+1][this.x+2]) ||
            //            !_.has(enemy[this.y+1][this.x]) ||
            //            !_.has(enemy[this.y+1][this.x-1]) ||
            //            !_.has(enemy[this.y+1][this.x-2]) ||
            //            !_.has(enemy[this.y+1][this.x-1]) ||
            //            !_.has(enemy[this.y+1][this.x+2]) ||
            //            !_.has(enemy[this.y+2][this.x]) ||
            //            !_.has(ally[this.y+2][this.x])
            //        ) {
            //            this.y++;
            //            this.move_y ++;
            //            this.direction_y = 1;
            //        }
            //    } else if(this.target['y'] < this.y) {
            //        if(
            //            !_.has(ally[this.y-1][this.x]) ||
            //            !_.has(ally[this.y-1][this.x-1]) ||
            //            !_.has(ally[this.y-1][this.x-2]) ||
            //            !_.has(ally[this.y-1][this.x-1]) ||
            //            !_.has(ally[this.y-1][this.x+2]) ||
            //            !_.has(enemy[this.y-1][this.x]) ||
            //            !_.has(enemy[this.y-1][this.x-1]) ||
            //            !_.has(enemy[this.y-1][this.x-2]) ||
            //            !_.has(enemy[this.y-1][this.x-1]) ||
            //            !_.has(enemy[this.y-1][this.x+2]) ||
            //            !_.has(enemy[this.y-2][this.x]) ||
            //            !_.has(ally[this.y-2][this.x])
            //        ) {
            //            this.y--;
            //            this.move_y ++;
            //            this.direction_y = -1;
            //        }
            //    }
            //}
        };

        this.draw = function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            if(this.move_y == 0) {
                ctx.fillRect(this.x, this.y*distance_y, unit_width, unit_width);
            } else {
                var yy = (this.y-this.direction_y)*distance_y + (this.move_y * this.direction_y);
                ctx.fillRect(this.x, yy, unit_width, unit_width);
            }
        }
    }

    function Enemy(x, y, hp, color) {
        this.x = x;
        this.y = y;
        this.team = -1;
        this.stopped = false;
        this.attacking = 0;
        this.hp = hp;
        this.color = color;
        this.target = 0;
        this.damage = Math.ceil(2+Math.random()*3);
        this.survived = function() {
            if(this.hp <= 0) return false;
            this.check_forward();
            return true;
        };
        this.find_enemy = function() {
            var y_array = [0, 1, -1, 2, -2];
            var x_array = [0, 1, -1, 2, -2];
            for(var yy = 0; yy<y_array.length; yy++) {
                var target_y = this.y+y_array[yy];
                for(var xx = 0; xx<x_array.length; xx++) {
                    var target_x = this.x+(this.team * distance_x)+x_array[xx];
                    if (_.has(ally[target_y], target_x)) {
                        this.attacking = ally[target_y][target_x];
                        this.stopped = true;
                        return true;
                    }
                }
            }
            return false;
        };
        this.check_forward = function() {
            var opponent = this.x + (this.team * distance_x);

            if (this.stopped) {
                if (this.attacking == 0) {
                    if (!_.has(enemy[this.y], opponent)) {
                        this.move_forward();
                    }
                } else {
                    if (this.attacking['hp'] > 0) {
                        this.attacking['hp'] -= this.damage;
                    } else {
                        this.attacking = 0;
                    }
                }
            } else {
                if (!this.find_enemy()) {
                    if (_.has(enemy[this.y], opponent)) {
                        this.stopped = true;
                        this.attacking = 0;
                    } else {
                        this.move_forward();
                    }
                }
            }
        };

        this.move_forward = function() {
            this.x += this.team;
            this.stopped = false;
            this.attacking = 0;
        };

        this.draw = function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y*distance_y, unit_width, unit_width);
        }
    }

    function initiate_units() {
        for(var row = 0; row < ally_formation.length; row++) {
            for(var y = ally_formation[row]['y']; y < ally_formation[row]['row'] + ally_formation[row]['y']; y++) {
                y_ally.push(y);
                var columns = {};
                for (var x = ally_formation[row]['x']; x > -ally_formation[row]['column'] + ally_formation[row]['x']; x--) {
                    columns[x*distance_x] = new Ally(x*distance_x, y, ally_formation[row]['hp'], ally_formation[row]['color']);
                }
                ally[y] = columns;
            }
        }
        for(row = 0; row < enemy_formation.length; row++) {
            for( y = enemy_formation[row]['y']; y < (enemy_formation[row]['row'] + enemy_formation[row]['y']); y++) {
                y_enemy.push(y);
                columns = {};
                for (x = enemy_formation[row]['x']; x < enemy_formation[row]['column'] + enemy_formation[row]['x']; x++) {
                    columns[x*distance_x] = new Enemy(x*distance_x, y, enemy_formation[row]['hp'], enemy_formation[row]['color']);
                }
                enemy[y] = columns;
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
        var new_positions = {};
        var y_array_ally = [];
        _.each(ally, function(val, y) {
            y = parseInt(y);
            y_array_ally.push(y);
            var closest_y = iterate_Y(parseInt(y), 'enemy');
            _.each(val, function(unit, x) {
                x = parseInt(x);
                if (unit.survived()) {
                    if(unit['target'] == 0 || unit['target'] == undefined) {
                        var target = iterate_X(closest_y, x, 'enemy');
                        if(target == undefined) target = iterate_backwards_X(closest_y, x, 'enemy');
                        unit['target'] = target;
                    }
                    unit.draw();
                    if (!_.has(new_positions, unit['y'])) {
                        new_positions[unit['y']] = {};
                        new_positions[unit['y']][unit['x']] = unit;
                    } else {
                        new_positions[unit['y']][unit['x']] = unit;
                    }
                }
            });
        });
        ally = new_positions;
        y_ally = y_array_ally;
    }

    function calculate_enemy() {
        var new_positions = {};
        var y_array_enemy = [];
        _.each(enemy, function(val, y) {
            y = parseInt(y);
            y_array_enemy.push(y);
            var closest_y = iterate_Y(y, 'ally');
            _.each(val, function(unit, x) {
                x = parseInt(x);
                if (unit.survived()) {
                    if(unit['target'] == 0 || unit['target'] == undefined) {
                        var target = iterate_X(closest_y, x, 'ally');
                        if(target == undefined) target = iterate_backwards_X(closest_y, x, 'ally');
                        unit['target'] = target;
                    }
                    unit.draw();
                    if (!_.has(new_positions, unit['y'])) {
                        new_positions[unit['y']] = {};
                        new_positions[unit['y']][unit['x']] = unit;
                    } else {
                        new_positions[unit['y']][unit['x']] = unit;
                    }
                }
            });
        });
        enemy = new_positions;
        y_enemy = y_array_enemy;
    }

    function iterate_X(y, x, units) {
        y = String(y);
        if(units == 'enemy') return _.find(enemy[y], function (v, k) { return parseInt(k) >= x });
        if(units == 'ally')  return _.find(ally[y],  function (v, k) { return parseInt(k) <= x });
    }

    function iterate_backwards_X(y, x, units) {
        y = String(y);
        if(units == 'enemy') return _.find(enemy[y], function (v, k) { return parseInt(k) <= x });
        if(units == 'ally')  return _.find(ally[y],  function (v, k) { return parseInt(k) >= x });
    }

    function iterate_Y(y, units) {
        if(units == 'enemy') {
            if(isInArray(y, y_enemy)) {
                return y;
            }
            for(var i = 1; i<1000; i++) {
                i = parseInt(i);
                if( isInArray(y+i, y_enemy) ) return y+i;
                if( isInArray(y-i, y_enemy) ) return y-i;
            }
            return y;
        }
        else if(units == 'ally') {
            if(isInArray(y, y_ally)) {
                return y;
            }
            for(i = 1; i<100; i++) {
                i = parseInt(i);
                if( isInArray(y+i, y_ally) ) return y+i;
                if( isInArray(y-i, y_ally) ) return y-i;
            }
            return y;
        }
    }

    function isInArray(value, array) {
        return array.indexOf(value) > -1;
    }

    function get_units() {
        _.each(ally, function(val) {
            _.each(val, function() {
                $scope.countAlly++;
            });
        });
        _.each(enemy, function(val) {
            _.each(val, function() {
                $scope.countEnemy++;
            });
        });
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
