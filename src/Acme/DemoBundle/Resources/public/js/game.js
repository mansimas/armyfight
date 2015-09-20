//
//var unit_groups = angular.module('unit_groups', []);
//unit_groups.factory('Group', function() {
//    'use strict';
//
//    function Group() {}
//
//    Group.prototype.set = function (new_units) {
//        this.units = new_units;
//    };
//    Group.prototype.get = function() {
//        return this.units;
//    };
//    Group.prototype.has_x = function(y, x) {
//        return(_.has(this.units[y], x))
//    };
//    Group.prototype.has_y = function(y) {
//        return(_.has(this.units, y))
//    };
//
//    return Group;
//});
//
//unit_groups.factory('ally_units', function(Group) {
//    'use strict';
//    return new Group();
//});
//
//unit_groups.factory('enemy_units', function(Group) {
//    'use strict';
//    return new Group();
//});
//
//
//
//
//var unit = angular.module('unit', ['unit_groups']);
//unit.factory('parent_unit', ['ally_units', 'enemy_units', function (ally, enemy) {
//    'use strict';
//
//    function Unit(x, y, hp, color) {
//        this.x = x;
//        this.y = y;
//        this.move_y = 0;
//        this.direction_y = 0;
//        this.target = undefined;
//        this.team = 1;
//        this.stopped = false;
//        this.hp = hp;
//        this.color = color;
//        this.attacking = 0;
//        this.damage = Math.ceil(2+Math.random()*10);
//    }
//
//    Unit.prototype.survived = function() {
//        if(this.hp <= 0) return false;
//        this.check_forward();
//        return true;
//    };
//    Unit.prototype.find_opponent = function() {
//        var y_array = [0, 1, -1];
//        for(var yy = 0; yy < y_array.length; yy++) {
//            var target_y = this.y+y_array[yy];
//            var target_x = this.x+(this.team * distance_x);
//            if (enemy.has_X(target_y, target_x)) {
//                this.attacking = enemy[target_y][target_x];
//                this.target = enemy[target_y][target_x];
//                this.stopped = true;
//                return true;
//            } else if (_.has(enemy[target_y], this.x)) {
//                this.attacking = enemy[target_y][this.x];
//                this.target = enemy[target_y][this.x];
//                this.stopped = true;
//                return true;
//            }
//        }
//        return false;
//    };
//
//    Unit.prototype.check_forward = function() {
//        if (this.stopped) {
//            if (this.attacking == 0) {
//                this.try_moving();
//            } else {
//                this.attacking['hp'] > 0 ? this.attacking['hp'] -= this.damage : this.attacking = 0;
//            }
//        } else {
//            if (!this.find_opponent()) {
//                this.try_moving();
//            }
//        }
//    };
//
//    Unit.prototype.check_around = function(sort) {
//        var target_y = this.y + sort;
//        if(this.target['x'] > this.x) {
//            for(var xx = -1; xx <= distance_x+1; xx++) {
//                if (_.has(ally[target_y], this.x+xx)) {
//                    return false;
//                }
//            }
//        } else if (this.target['x'] < this.x) {
//            for(xx = -1; xx <= distance_x+1; xx++) {
//                if (_.has(ally[target_y], this.x-xx)) {
//                    return false;
//                }
//            }
//        } else {
//            if (_.has(ally[target_y], this.x)) {
//                return false;
//            }
//        }
//
//        return true;
//    };
//
//    Unit.prototype.move_forward = function() {
//        if(this.target['x'] > this.x) {
//            var opponent = this.x+(this.team * distance_x);
//            var opponent1 = this.x+(this.team * distance_x)+this.team;
//            if (!_.has(ally[this.y], opponent) && !_.has(ally[this.y], opponent1)) {
//                this.x += this.team;
//            }
//        }
//        else if(this.target['x'] < this.x)  {
//            opponent = this.x-(this.team * distance_x);
//            opponent1 = this.x-(this.team * distance_x)-this.team;
//            if (!_.has(ally[this.y], opponent) && !_.has(ally[this.y], opponent1)) {
//                this.x -= this.team;
//            }
//        } else {
//            this.attacking = this.target;
//            this.stopped = true;
//        }
//    };
//
//    Unit.prototype.try_moving = function() {
//        this.stopped = false;
//        this.attacking = 0;
//        if (this.target && this.target['hp'] > 0) {
//            if(this.move_y != 0 ) {
//                if(this.move_y < distance_y) {
//                    this.move_y += 0.5 ;
//                } else {
//                    this.move_y = 0;
//                }
//            } else if(this.target['y'] > this.y) {
//                if (this.check_around(1)) {
//                    this.y++;
//                    this.move_y += 0.5;
//                    this.direction_y = 1;
//                }
//            } else if(this.target['y'] < this.y) {
//                if (this.check_around(-1)) {
//                    this.y--;
//                    this.move_y += 0.5;
//                    this.direction_y = -1;
//                }
//            }
//            if (this.move_y == 0) this.move_forward();
//        }
//    };
//
//    Unit.prototype.draw = function () {
//        if(this.x > 0 && this.x<1800 && this.y*distance_y>0 && this.y*distance_y<900) {
//            ctx.beginPath();
//            ctx.fillStyle = this.color;
//            if(this.move_y == 0) {
//                ctx.fillRect(this.x, this.y*distance_y, unit_width, unit_width);
//            } else {
//                var yy = (this.y-this.direction_y)*distance_y + (this.move_y * this.direction_y);
//                ctx.fillRect(this.x, yy, unit_width, unit_width);
//            }
//        }
//    };
//
//    return Unit;
//}]);
//
//unit.factory('Ally', function (parent_unit) {
//    'use strict';
//    function Ally() {
//        this.x = parent_unit(x);
//        this.y = parent_unit(y);
//        this.move_y = 0;
//        this.direction_y = 0;
//        this.target = undefined;
//        this.team = 1;
//        this.stopped = false;
//        this.hp = parent_unit(hp);
//        this.color = parent_unit(color);
//        this.attacking = 0;
//        this.damage = Math.ceil(2+Math.random()*10);
//    }
//
//    Ally.prototype = new parent_unit();
//
//
//    return Ally;
//});
//
//var controllers = angular.module('controllers', ['unit_groups', 'unit']);
//
//controllers.controller('game', ['$scope', '$interval', 'ally_units', 'enemy_units', 'Ally',
//    function($scope, $interval, ally_units, enemy_units, Allys) {
//    "use strict";
//    $scope.attacking = false;
//    $scope.frame = 0;
//    $scope.countAlly = 0;
//    $scope.countEnemy = 0;
//    var canvas  = document.getElementById("game"),
//        ctx = canvas.getContext("2d"),
//
//        y_ally = [],
//        y_enemy = [],
//        ally = {},
//        enemy = {},
//        ally_formation = [
//            {color: 'red',  dmg: 10, hp: 100, column: 30, row: 20, x: 80, y: 1 },
//            {color: 'red',  dmg: 10, hp: 100, column: 60, row: 40, x: 80, y: 70 },
//            {color: 'red',  dmg: 10, hp: 100, column: 30, row: 20, x: 250, y: 140 }
//        ],
//        enemy_formation = [
//            {color: 'blue', dmg: 10, hp: 100, column: 60, row: 40, x: 140, y: 1 },
//            {color: 'blue', dmg: 10, hp: 100, column: 30, row: 20, x: 140, y: 70 },
//            {color: 'blue', dmg: 10, hp: 100, column: 60, row: 40, x: 80, y: 140 }
//        ],
//        unit_width = 4,
//        distance_x = 5,
//        distance_y = 5;
//
//    function start_animation_loop() {
//        initiate_units();
//        $scope.promise = $interval(function() {
//            if($scope.attacking == true) {
//                animate();
//                $scope.frame++;
//            }
//        }, 40 );
//    }
//
//    function Ally(x, y, hp, color) {
//        this.x = x;
//        this.y = y;
//        this.move_y = 0;
//        this.direction_y = 0;
//        this.target = undefined;
//        this.team = 1;
//        this.stopped = false;
//        this.hp = hp;
//        this.color = color;
//        this.attacking = 0;
//        this.damage = Math.ceil(2+Math.random()*10);
//        this.survived = function() {
//            if(this.hp <= 0) return false;
//            this.check_forward();
//            return true;
//        };
//        this.find_opponent = function() {
//            var y_array = [0, 1, -1];
//            for(var yy = 0; yy < y_array.length; yy++) {
//                var target_y = this.y+y_array[yy];
//                var target_x = this.x+(this.team * distance_x);
//                if (_.has(enemy[target_y], target_x)) {
//                    this.attacking = enemy[target_y][target_x];
//                    this.target = enemy[target_y][target_x];
//                    this.stopped = true;
//                    return true;
//                } else if (_.has(enemy[target_y], this.x)) {
//                    this.attacking = enemy[target_y][this.x];
//                    this.target = enemy[target_y][this.x];
//                    this.stopped = true;
//                    return true;
//                }
//            }
//            return false;
//        };
//
//        this.check_forward = function() {
//            if (this.stopped) {
//                if (this.attacking == 0) {
//                    this.try_moving();
//                } else {
//                    this.attacking['hp'] > 0 ? this.attacking['hp'] -= this.damage : this.attacking = 0;
//                }
//            } else {
//                if (!this.find_opponent()) {
//                    this.try_moving();
//                }
//            }
//        };
//
//        this.check_around = function(sort) {
//            var target_y = this.y + sort;
//            if(this.target['x'] > this.x) {
//                for(var xx = -1; xx <= distance_x+1; xx++) {
//                    if (_.has(ally[target_y], this.x+xx)) {
//                        return false;
//                    }
//                }
//            } else if (this.target['x'] < this.x) {
//                for(xx = -1; xx <= distance_x+1; xx++) {
//                    if (_.has(ally[target_y], this.x-xx)) {
//                        return false;
//                    }
//                }
//            } else {
//                if (_.has(ally[target_y], this.x)) {
//                    return false;
//                }
//            }
//
//            return true;
//        };
//
//        this.move_forward = function() {
//            if(this.target['x'] > this.x) {
//                var opponent = this.x+(this.team * distance_x);
//                var opponent1 = this.x+(this.team * distance_x)+this.team;
//                if (!_.has(ally[this.y], opponent) && !_.has(ally[this.y], opponent1)) {
//                    this.x += this.team;
//                }
//            }
//            else if(this.target['x'] < this.x)  {
//                opponent = this.x-(this.team * distance_x);
//                opponent1 = this.x-(this.team * distance_x)-this.team;
//                if (!_.has(ally[this.y], opponent) && !_.has(ally[this.y], opponent1)) {
//                    this.x -= this.team;
//                }
//            } else {
//                this.attacking = this.target;
//                this.stopped = true;
//            }
//        };
//
//        this.try_moving = function() {
//            this.stopped = false;
//            this.attacking = 0;
//            if (this.target && this.target['hp'] > 0) {
//                if(this.move_y != 0 ) {
//                    if(this.move_y < distance_y) {
//                        this.move_y += 0.5 ;
//                    } else {
//                        this.move_y = 0;
//                    }
//                } else if(this.target['y'] > this.y) {
//                    if (this.check_around(1)) {
//                        this.y++;
//                        this.move_y += 0.5;
//                        this.direction_y = 1;
//                    }
//                } else if(this.target['y'] < this.y) {
//                    if (this.check_around(-1)) {
//                        this.y--;
//                        this.move_y += 0.5;
//                        this.direction_y = -1;
//                    }
//                }
//                if (this.move_y == 0) this.move_forward();
//            }
//        };
//
//        this.draw = function () {
//            if(this.x > 0 && this.x<1800 && this.y*distance_y>0 && this.y*distance_y<900) {
//                ctx.beginPath();
//                ctx.fillStyle = this.color;
//                if(this.move_y == 0) {
//                    ctx.fillRect(this.x, this.y*distance_y, unit_width, unit_width);
//                } else {
//                    var yy = (this.y-this.direction_y)*distance_y + (this.move_y * this.direction_y);
//                    ctx.fillRect(this.x, yy, unit_width, unit_width);
//                }
//            }
//        }
//    }
//
//    function Enemy(x, y, hp, color) {
//        this.x = x;
//        this.y = y;
//        this.team = -1;
//        this.move_y = 0;
//        this.direction_y = 0;
//        this.stopped = false;
//        this.attacking = 0;
//        this.hp = hp;
//        this.color = color;
//        this.target = undefined;
//        this.damage = Math.ceil(2+Math.random()*10);
//        this.survived = function() {
//            if(this.hp <= 0) return false;
//            this.check_forward();
//            return true;
//        };
//
//        this.find_opponent = function() {
//            var y_array = [0, 1, -1];
//            for(var yy = 0; yy < y_array.length; yy++) {
//                var target_y = this.y+y_array[yy];
//                var target_x = this.x+(this.team * distance_x);
//                if (_.has(ally[target_y], target_x)) {
//                    this.attacking = ally[target_y][target_x];
//                    this.target = ally[target_y][target_x];
//                    this.stopped = true;
//                    return true;
//                }  else if (_.has(ally[target_y], this.x)) {
//                    this.attacking = ally[target_y][this.x];
//                    this.target = ally[target_y][this.x];
//                    this.stopped = true;
//                    return true;
//                }
//            }
//            return false;
//        };
//
//        this.check_forward = function() {
//            if (this.stopped) {
//                if (this.attacking == 0) {
//                    this.try_moving();
//                } else {
//                    this.attacking['hp'] > 0 ? this.attacking['hp'] -= this.damage : this.attacking = 0;
//                }
//            } else {
//                if (!this.find_opponent()) {
//                    this.try_moving();
//                }
//            }
//        };
//
//        this.check_around = function(sort) {
//            var target_y = this.y + sort;
//            if(this.target['x'] > this.x) {
//                for(var xx = -1; xx <= distance_x+1; xx++) {
//                    if (_.has(enemy[target_y], this.x+xx)) {
//                        return false;
//                    }
//                }
//            } else if (this.target['x'] < this.x) {
//                for(xx = -1; xx <= distance_x+1; xx++) {
//                    if (_.has(enemy[target_y], this.x-xx)) {
//                        return false;
//                    }
//                }
//            } else {
//                if (_.has(enemy[target_y], this.x)) {
//                    return false;
//                }
//            }
//            return true;
//        };
//
//        this.move_forward = function() {
//            if(this.target['x'] < this.x) {
//                var opponent = this.x+(this.team * distance_x);
//                var opponent1 = this.x+(this.team * distance_x)+this.team;
//                if (!_.has(enemy[this.y], opponent) && !_.has(enemy[this.y], opponent1)) {
//                    this.x += this.team;
//                }
//            }
//            else if(this.target['x'] > this.x)  {
//                opponent = this.x-(this.team * distance_x);
//                opponent1 = this.x-(this.team * distance_x)-this.team;
//                if (!_.has(enemy[this.y], opponent) && !_.has(enemy[this.y], opponent1)) {
//                    this.x -= this.team;
//                }
//            } else {
//                this.attacking = this.target;
//                this.stopped = true;
//            }
//        };
//
//        this.try_moving = function() {
//            this.stopped = false;
//            this.attacking = 0;
//            if (this.target && this.target['hp']>0) {
//                if(this.move_y != 0 ) {
//                    if(this.move_y < distance_y) {
//                        this.move_y += 0.5 ;
//                    } else {
//                        this.move_y = 0;
//                    }
//                } else if(this.target['y'] > this.y) {
//                    if (this.check_around(1)) {
//                        this.y++;
//                        this.move_y += 0.5;
//                        this.direction_y = 1;
//                    }
//                } else if(this.target['y'] < this.y) {
//                    if (this.check_around(-1)) {
//                        this.y--;
//                        this.move_y += 0.5;
//                        this.direction_y = -1;
//                    }
//                }
//                if (this.move_y == 0) this.move_forward();
//            }
//        };
//
//        this.draw = function () {
//            if(this.x > 0 && this.x<1800 && this.y*distance_y>0 && this.y*distance_y<900) {
//                ctx.beginPath();
//                ctx.fillStyle = this.color;
//                if (this.move_y == 0) {
//                    ctx.fillRect(this.x, this.y * distance_y, unit_width, unit_width);
//                } else {
//                    var yy = (this.y - this.direction_y) * distance_y + (this.move_y * this.direction_y);
//                    ctx.fillRect(this.x, yy, unit_width, unit_width);
//                }
//            }
//        }
//    }
//
//    function initiate_units() {
//
//        for(var row = 0; row < ally_formation.length; row++) {
//            for(var y = ally_formation[row]['y']; y < ally_formation[row]['row'] + ally_formation[row]['y']; y++) {
//                y_ally.push(y);
//                var columns = {};
//                for (var x = ally_formation[row]['x']; x > -ally_formation[row]['column'] + ally_formation[row]['x']; x--) {
//                    columns[x*distance_x] = new Ally(x*distance_x, y, ally_formation[row]['hp'], ally_formation[row]['color']);
//                }
//                ally[y] = columns;
//            }
//        }
//        for(row = 0; row < enemy_formation.length; row++) {
//            for( y = enemy_formation[row]['y']; y < (enemy_formation[row]['row'] + enemy_formation[row]['y']); y++) {
//                y_enemy.push(y);
//                columns = {};
//                for (x = enemy_formation[row]['x']; x < enemy_formation[row]['column'] + enemy_formation[row]['x']; x++) {
//                    columns[x*distance_x] = new Enemy(x*distance_x, y, enemy_formation[row]['hp'], enemy_formation[row]['color']);
//                }
//                enemy[y] = columns;
//            }
//        }
//    }
//
//    function animate() {
//        clear_canvas();
//        calculate_ally();
//        calculate_enemy();
//    }
//
//    function clear_canvas() {
//        ctx.clearRect(0, 0, 1800, 900);
//        $scope.countAlly = 0;
//        $scope.countEnemy = 0;
//    }
//
//    function calculate_ally() {
//        var new_positions = {};
//        var y_array_ally = [];
//        _.each(ally, function(val, y) {
//            y = parseInt(y);
//            y_array_ally.push(y);
//            var closest_y = iterate_Y(parseInt(y), 'enemy');
//            _.each(val, function(unit, x) {
//                x = parseInt(x);
//                if (unit.survived()) {
//                    $scope.countAlly++;
//                    if(unit['target'] == undefined) {
//                        var target = iterate_X(closest_y, x, 'enemy');
//                        if(target == undefined) target = iterate_backwards_X(closest_y, x, 'enemy');
//                        unit['target'] = target;
//                    } else if( unit['target']['hp'] < 1 ) {
//                        target = iterate_X(closest_y, x, 'enemy');
//                        if(target == undefined) target = iterate_backwards_X(closest_y, x, 'enemy');
//                        unit['target'] = target;
//                    }
//                    unit.draw();
//                    if (!_.has(new_positions, unit['y'])) {
//                        new_positions[unit['y']] = {};
//                        new_positions[unit['y']][unit['x']] = unit;
//                    } else {
//                        new_positions[unit['y']][unit['x']] = unit;
//                    }
//                }
//            });
//        });
//        ally = new_positions;
//        enemy_units.set(new_positions);
//        y_ally = y_array_ally;
//    }
//
//    function calculate_enemy() {
//        var new_positions = {};
//        var y_array_enemy = [];
//        _.each(enemy, function(val, y) {
//            y = parseInt(y);
//            y_array_enemy.push(y);
//            var closest_y = iterate_Y(y, 'ally');
//            _.each(val, function(unit, x) {
//                x = parseInt(x);
//                if (unit.survived()) {
//                    $scope.countEnemy++;
//                    if(unit['target'] == undefined || (_.has(unit, 'target') && unit['target']['hp'] < 1) ) {
//                        var target = iterate_X(closest_y, x, 'ally');
//                        if(target == undefined) target = iterate_backwards_X(closest_y, x, 'ally');
//                        unit['target'] = target;
//                    }
//                    unit.draw();
//                    if (!_.has(new_positions, unit['y'])) {
//                        new_positions[unit['y']] = {};
//                        new_positions[unit['y']][unit['x']] = unit;
//                    } else {
//                        new_positions[unit['y']][unit['x']] = unit;
//                    }
//                }
//            });
//        });
//        enemy = new_positions;
//        ally_units.set(new_positions);
//        y_enemy = y_array_enemy;
//    }
//
//    function check_advanced(unitX, unitY, targetX, targetY, unitType) {
//        if(unitType == 'ally') {
//            var diffX = Math.abs(targetX - unitX);
//            var diffY = Math.abs(targetY - unitY);
//            var overall_diff = diffX + diffY;
//            var points_collection = {y: targetY, x: targetX};
//
//            for(var t = diffY; t < diffY+10; t++) {
//                t = parseInt(t);
//                if( isInArray(unitY+t, y_enemy) ) {
//                    var nearest_enemy = _.find(enemy[unitY+t], function (v, k) { return parseInt(k) >= targetX });
//                    if(nearest_enemy == undefined) nearest_enemy = _.find(enemy[unitY+t], function (v, k) { return parseInt(k) < targetX });
//                    if(nearest_enemy != undefined) {
//                        var found_overall_diff = Math.abs(nearest_enemy['x'] - unitX) + t;
//                        if(found_overall_diff < overall_diff) {
//                            overall_diff = found_overall_diff;
//                            points_collection = {y: unitY+t, x: nearest_enemy['x']};
//                        }
//                    }
//                }
//                if( isInArray(unitY-t, y_enemy) ) {
//                    nearest_enemy = _.find(enemy[unitY-t], function (v, k) { return parseInt(k) >= targetX });
//                    if(nearest_enemy == undefined) nearest_enemy = _.find(enemy[unitY-t], function (v, k) { return parseInt(k) < targetX });
//                    if(nearest_enemy != undefined) {
//                        found_overall_diff = Math.abs(nearest_enemy['x'] - unitX) + t;
//                        if(found_overall_diff < overall_diff) {
//                            overall_diff = found_overall_diff;
//                            points_collection = {y: unitY-t, x: nearest_enemy['x']};
//                        }
//                    }
//                }
//
//                if(points_collection.x == unitX) break;
//            }
//            return points_collection;
//        }
//    }
//
//    function iterate_X(y, x, units) {
//        y = String(y);
//        if(units == 'enemy') return _.find(enemy[y], function (v, k) { return parseInt(k) >= x });
//        if(units == 'ally')  return _.find(ally[y],  function (v, k) { return parseInt(k) <= x });
//    }
//
//    function iterate_backwards_X(y, x, units) {
//        y = String(y);
//        if(units == 'enemy') return _.find(enemy[y], function (v, k) { return parseInt(k) <= x });
//        if(units == 'ally')  return _.find(ally[y],  function (v, k) { return parseInt(k) >= x });
//    }
//
//    function iterate_Y(y, units) {
//        if(units == 'enemy') {
//            if(isInArray(y, y_enemy)) {
//                return y;
//            }
//            for(var i = 1; i<1000; i++) {
//                i = parseInt(i);
//                if( isInArray(y+i, y_enemy) ) return y+i;
//                if( isInArray(y-i, y_enemy) ) return y-i;
//            }
//            return y;
//        }
//        else if(units == 'ally') {
//            if(isInArray(y, y_ally)) {
//                return y;
//            }
//            for(i = 1; i<100; i++) {
//                i = parseInt(i);
//                if( isInArray(y+i, y_ally) ) return y+i;
//                if( isInArray(y-i, y_ally) ) return y-i;
//            }
//            return y;
//        }
//    }
//
//    function isInArray(value, array) {
//        return array.indexOf(value) > -1;
//    }
//
//    $scope.log = function() {
//        var alfa = Allys(5, 5, 5, 'red');
//        console.log(alfa);
//        console.log(enemy_units.get());
//    };
//
//    $scope.add_frame = function() {
//        animate();
//        $scope.frame++;
//    };
//
//    start_animation_loop();
//}]);
//
//
//
//var app = angular.module('app', ['controllers', 'unit_groups', 'unit']);
