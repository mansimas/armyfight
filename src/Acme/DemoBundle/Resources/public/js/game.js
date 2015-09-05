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
            {color: 'red',  dmg: 10, hp: 100, column: 300, row: 170, x: 150, y: 1 }
        ],
        enemy_formation = [
            {color: 'blue', dmg: 10, hp: 100, column: 300, row: 170, x: 170, y: 1 }
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
        this.target = undefined;
        this.team = 1;
        this.stopped = false;
        this.hp = hp;
        this.color = color;
        this.attacking = 0;
        this.damage = Math.ceil(2+Math.random()*10);
        this.survived = function() {
            if(this.hp <= 0) return false;
            this.check_forward();
            return true;
        };
        this.find_enemy = function() {
            var y_array = [0, 1, -1];
            if(this.move_y != 0 ) return false;
            for(var yy = 0; yy < y_array.length; yy++) {
                var target_y = this.y+y_array[yy];
                var target_x = this.x+(this.team * distance_x);
                if (_.has(enemy[target_y], target_x)) {
                    this.attacking = enemy[target_y][target_x];
                    this.stopped = true;
                    return true;
                } else if (_.has(enemy[target_y], this.x)) {
                    this.attacking = enemy[target_y][this.x];
                    this.stopped = true;
                    return true;
                }
            }
            return false;
        };

        this.check_forward = function() {
            if (this.stopped) {
                if (this.attacking == 0) {
                    this.move_forward();
                } else {
                    if(this.attacking['hp'] > 0) {
                        this.attacking['hp'] -= this.damage;
                        if(this.move_y != 0 && this.move_y < distance_y) this.move_y += 0.5;
                    } else {
                        this.attacking = 0;
                        if(this.move_y != 0 && this.move_y < distance_y) this.move_y += 0.5;
                    }
                }
            } else {
                if (!this.find_enemy()) {
                    if (_.has(ally[this.y], this.x+(this.team * distance_x)) || _.has(ally[this.y], this.x+this.team+(this.team * distance_x))) {
                        this.stopped = true;
                        this.attacking = 0;
                        if(this.move_y != 0 && this.move_y < distance_y) this.move_y += 0.5;
                    } else {
                        this.move_forward();
                    }
                }
            }
        };

        this.check_around = function(sort) {
            if(sort == 'plus') var y_array = [ 1 ];
            else if(sort == 'minus') y_array = [ -1 ];
            var success_count = true;
            for(var yy = 0; yy<y_array.length; yy++) {
                var target_y = this.y+y_array[yy];
                for(var xx = ( -distance_x); xx < ( distance_x); xx++) {
                    var target_x = this.x+xx;
                    if (_.has(ally[target_y], target_x)) {
                        success_count = false;
                    }
                }
            }
            return success_count;
        };

        this.move_forward = function() {
            this.stopped = false;
            this.attacking = 0;
            if (this.target && this.target['hp'] > 0) {
                if(this.target['x'] > this.x) {
                    var opponent = this.x+(this.team * distance_x);
                    var opponent1 = this.x+(this.team * distance_x)+this.team;
                    if (!_.has(ally[this.y], opponent) && !_.has(ally[this.y], opponent1)) {
                        this.x += this.team;
                    }
                }
                else if(this.target['x'] < this.x)  {
                    opponent = this.x-(this.team * distance_x);
                    opponent1 = this.x+(this.team * distance_x)+this.team;
                    if (!_.has(ally[this.y], opponent) && !_.has(ally[this.y], opponent1)) {
                        this.x -= this.team;
                    }
                } else if(this.target['x'] == this.x) {
                    if(this.target['y'] > this.y) {
                        if (!_.has(ally[this.y+1], this.x)) {
                            if( !this.find_enemy ) {
                            }
                        }
                    } else if(this.target['y'] < this.y) {
                        if (!_.has(ally[this.y-1], this.x)) {
                            if( !this.find_enemy ) {
                            }
                        }
                    } else {
                        this.attacking = this.target;
                    }
                }
                if(this.move_y != 0 ) {
                    if(this.move_y < distance_y) {
                        this.move_y += 0.5 ;
                    } else {
                        this.move_y = 0;
                    }
                } else if(this.target['y'] > this.y) {
                    if (this.check_around('plus')) {
                        this.y++;
                        this.move_y += 0.5;
                        this.direction_y = 1;
                    }
                } else if(this.target['y'] < this.y) {
                    if (this.check_around('minus')) {
                        this.y--;
                        this.move_y += 0.5;
                        this.direction_y = -1;
                    }
                } else if(this.target['y'] == this.y && this.target['x'] == this.x) {
                    this.attacking = this.target;
                    this.stopped = true;
                }
            }
        };

        this.draw = function () {
            if(this.x > 0 && this.x<1800 && this.y*distance_y>0 && this.y*distance_y<900) {
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
    }

    function Enemy(x, y, hp, color) {
        this.x = x;
        this.y = y;
        this.team = -1;
        this.move_y = 0;
        this.direction_y = 0;
        this.stopped = false;
        this.attacking = 0;
        this.hp = hp;
        this.color = color;
        this.target = undefined;
        this.damage = Math.ceil(2+Math.random()*10);
        this.survived = function() {
            if(this.hp <= 0) return false;
            this.check_forward();
            return true;
        };
        this.find_ally = function() {
            var y_array = [0, 1, -1];
            for(var yy = 0; yy<y_array.length; yy++) {
                var target_y = this.y+y_array[yy];
                var target_x = this.x+(this.team * distance_x);
                if (_.has(ally[target_y], target_x)) {
                    this.attacking = ally[target_y][target_x];
                    this.stopped = true;
                    return true;
                }  else if (_.has(ally[target_y], this.x)) {
                    this.attacking = ally[target_y][this.x];
                    this.stopped = true;
                    return true;
                }
            }
            return false;
        };

        this.check_forward = function() {
            if (this.stopped) {
                if (this.attacking == 0) {
                    this.move_forward();
                } else {
                    if (this.attacking['hp'] > 0) {
                        this.attacking['hp'] -= this.damage;
                    } else {
                        this.attacking = 0;
                    }
                }
            } else {
                if (!this.find_ally()) {
                    if (_.has(enemy[this.y], this.x+(this.team * distance_x)) || _.has(enemy[this.y], this.x+this.team+(this.team * distance_x)) ) {
                        this.stopped = true;
                        this.attacking = 0;
                    } else {
                        this.move_forward();
                    }
                }
            }
        };

        this.check_around = function(sort) {
            if(sort == 'plus') var y_array = [ 1 ];
            else if(sort == 'minus') y_array = [ -1 ];
            var success_count = true;
            for(var yy = 0; yy<y_array.length; yy++) {
                var target_y = this.y+y_array[yy];
                for(var xx = -distance_x; xx < distance_x; xx++) {
                    var target_x = this.x+xx;
                    if (_.has(ally[target_y], target_x)) {
                        success_count = false;
                    }
                }
            }
            return success_count;
        };

        this.move_forward = function() {
            this.stopped = false;
            this.attacking = 0;
            if (this.target && this.target['hp']>0) {
                if(this.target['x'] < this.x) {
                    var opponent = this.x+(this.team * distance_x);
                    var opponent1 = this.x+(this.team * distance_x)+this.team;
                    if (!_.has(enemy[this.y], opponent) && !_.has(enemy[this.y], opponent1)) {
                        this.x += this.team;
                    }
                }
                else if(this.target['x'] > this.x)  {
                    opponent = this.x-(this.team * distance_x);
                    opponent1 = this.x+(this.team * distance_x)+this.team;
                    if (!_.has(enemy[this.y], opponent) && !_.has(enemy[this.y], opponent1)) {
                        this.x -= this.team;
                        var xx = this.x;
                        if(_.find(ally[this.target['y']], function (v, x) { return parseInt(x) <= parseInt(xx) })) {
                            this.target = iterate_X(this.target['y'], xx, 'ally');
                        }
                    }
                } else if(this.target['x'] == this.x) {
                    if (this.target['y'] > this.y) {
                        if (!_.has(enemy[this.y + 1], this.x)) {
                            if (!this.find_ally) {
                            }
                        }
                    } else if (this.target['y'] < this.y) {
                        if (!_.has(enemy[this.y - 1], this.x)) {
                            if (!this.find_ally) {
                            }
                        }
                    } else {
                        this.attacking = this.target;
                    }
                }
                if(this.move_y != 0 ) {
                    if(this.move_y < distance_y) {
                        this.move_y += 0.5 ;
                    } else {
                        this.move_y = 0;
                    }
                } else if(this.target['y'] > this.y) {
                    if (this.check_around('plus')) {
                        this.y++;
                        this.move_y += 0.5;
                        this.direction_y = 1;
                    }
                } else if(this.target['y'] < this.y) {
                    if (this.check_around('minus')) {
                        this.y--;
                        this.move_y += 0.5;
                        this.direction_y = -1;
                    }
                } else if(this.target['y'] == this.y && this.target['x'] == this.x) {
                    this.attacking = this.target;
                    this.stopped = true;
                }
            }
        };

        this.draw = function () {
            if(this.x > 0 && this.x<1800 && this.y*distance_y>0 && this.y*distance_y<900) {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                if (this.move_y == 0) {
                    ctx.fillRect(this.x, this.y * distance_y, unit_width, unit_width);
                } else {
                    var yy = (this.y - this.direction_y) * distance_y + (this.move_y * this.direction_y);
                    ctx.fillRect(this.x, yy, unit_width, unit_width);
                }
            }
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
                    $scope.countAlly++;
                    if(unit['target'] == undefined) {
                        var target = iterate_X(closest_y, x, 'enemy');
                        if(target == undefined) target = iterate_backwards_X(closest_y, x, 'enemy');
                        unit['target'] = target;
                    } else if( unit['target']['hp'] < 1 ) {
                        target = iterate_X(closest_y, x, 'enemy');
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
                    $scope.countEnemy++;
                    if(unit['target'] == undefined || (_.has(unit, 'target') && unit['target']['hp'] < 1) ) {
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

    function check_advanced(unitX, unitY, targetX, targetY, unitType) {
        if(unitType == 'ally') {
            var diffX = Math.abs(targetX - unitX);
            var diffY = Math.abs(targetY - unitY);
            var overall_diff = diffX + diffY;
            var points_collection = {y: targetY, x: targetX};

            for(var t = diffY; t < diffY+10; t++) {
                t = parseInt(t);
                if( isInArray(unitY+t, y_enemy) ) {
                    var nearest_enemy = _.find(enemy[unitY+t], function (v, k) { return parseInt(k) >= targetX });
                    if(nearest_enemy == undefined) nearest_enemy = _.find(enemy[unitY+t], function (v, k) { return parseInt(k) < targetX });
                    if(nearest_enemy != undefined) {
                        var found_overall_diff = Math.abs(nearest_enemy['x'] - unitX) + t;
                        if(found_overall_diff < overall_diff) {
                            overall_diff = found_overall_diff;
                            points_collection = {y: unitY+t, x: nearest_enemy['x']};
                        }
                    }
                }
                if( isInArray(unitY-t, y_enemy) ) {
                    nearest_enemy = _.find(enemy[unitY-t], function (v, k) { return parseInt(k) >= targetX });
                    if(nearest_enemy == undefined) nearest_enemy = _.find(enemy[unitY-t], function (v, k) { return parseInt(k) < targetX });
                    if(nearest_enemy != undefined) {
                        found_overall_diff = Math.abs(nearest_enemy['x'] - unitX) + t;
                        if(found_overall_diff < overall_diff) {
                            overall_diff = found_overall_diff;
                            points_collection = {y: unitY-t, x: nearest_enemy['x']};
                        }
                    }
                }

                if(points_collection.x == unitX) break;
            }
            return points_collection;
        }
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

    $scope.log = function() {
        console.log(ally, enemy);
    };

    $scope.add_frame = function() {
        animate();
        $scope.frame++;
    };

    start_animation_loop();
});
