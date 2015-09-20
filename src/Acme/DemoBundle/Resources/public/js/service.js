var services = angular.module('service', ['units']);
services.factory('core', ['units', function (Unit) {
    'use strict';

    function Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx) {
        this.y_ally = [];
        this.y_enemy = [];
        this.ally = {};
        this.enemy = {};
        this.ally_formation = ally_formation;
        this.enemy_formation = enemy_formation;
        this.unit_width = unit_width;
        this.distance_x = distance_x;
        this.distance_y = distance_y;
        this.attacking = false;
        this.frame = 0;
        this.countAlly = 0;
        this.countEnemy = 0;
        this.ctx = ctx;
    }

    Core.prototype.initiate = function() {
        for(var row = 0; row < this.ally_formation.length; row++) {
            for(var y = this.ally_formation[row]['y']; y < this.ally_formation[row]['row'] + this.ally_formation[row]['y']; y++) {
                this.y_ally.push(y);
                var columns = {};
                for (var x = this.ally_formation[row]['x']; x > -this.ally_formation[row]['column'] + this.ally_formation[row]['x']; x--) {
                    columns[x * this.distance_x] = new Unit(
                        x * this.distance_x,
                        y,
                        this.ally_formation[row]['hp'],
                        this.ally_formation[row]['color'],
                        1,
                        this.distance_x,
                        this.distance_y
                    );
                }
                this.ally[y] = columns;
            }
        }
        for(row = 0; row < this.enemy_formation.length; row++) {
            for( y = this.enemy_formation[row]['y']; y < (this.enemy_formation[row]['row'] + this.enemy_formation[row]['y']); y++) {
                this.y_enemy.push(y);
                columns = {};
                for (x = this.enemy_formation[row]['x']; x < this.enemy_formation[row]['column'] + this.enemy_formation[row]['x']; x++) {
                    columns[x * this.distance_x] = new Unit(
                        x * this.distance_x,
                        y,
                        this.enemy_formation[row]['hp'],
                        this.enemy_formation[row]['color'],
                        -1,
                        this.distance_x,
                        this.distance_y
                    );
                }
                this.enemy[y] = columns;
            }
        }
    };

    Core.prototype.calculate_ally = function() {
        var self = this;
        var new_positions = {};
        var y_array_ally = [];
        _.each(this.ally, function(val, y) {
            y = parseInt(y);
            y_array_ally.push(y);
            var closest_y = self.iterate_Y(parseInt(y), 'enemy');
            _.each(val, function(unit, x) {
                x = parseInt(x);
                unit.setAlly(self.ally);
                unit.setEnemy(self.enemy);
                if (unit.survived()) {
                    self.countAlly++;
                    if(unit['target'] == undefined) {
                        var target = self.iterate_X(closest_y, x, 'enemy');
                        if(target == undefined) target = self.iterate_backwards_X(closest_y, x, 'enemy');
                        unit['target'] = target;
                    } else if( unit['target']['hp'] < 1 ) {
                        target = self.iterate_X(closest_y, x, 'enemy');
                        if(target == undefined) target = self.iterate_backwards_X(closest_y, x, 'enemy');
                        unit['target'] = target;
                    }
                    unit.draw(self.ctx, self.unit_width);
                    if (!_.has(new_positions, unit['y'])) {
                        new_positions[unit['y']] = {};
                        new_positions[unit['y']][unit['x']] = unit;
                    } else {
                        new_positions[unit['y']][unit['x']] = unit;
                    }
                }
            });
        });
        this.ally = new_positions;
        this.y_ally = y_array_ally;
    };

    Core.prototype.calculate_enemy = function() {
        var self = this;
        var new_positions = {};
        var y_array_enemy = [];
        _.each(this.enemy, function(val, y) {
            y = parseInt(y);
            y_array_enemy.push(y);
            var closest_y = self.iterate_Y(y, 'ally');
            _.each(val, function(unit, x) {
                x = parseInt(x);
                unit.setAlly(self.ally);
                unit.setEnemy(self.enemy);
                if (unit.survived()) {
                    self.countEnemy++;
                    if(unit['target'] == undefined || (_.has(unit, 'target') && unit['target']['hp'] < 1) ) {
                        var target = self.iterate_X(closest_y, x, 'ally');
                        if(target == undefined) target = self.iterate_backwards_X(closest_y, x, 'ally');
                        unit['target'] = target;
                    }
                    unit.draw(self.ctx, self.unit_width);
                    if (!_.has(new_positions, unit['y'])) {
                        new_positions[unit['y']] = {};
                        new_positions[unit['y']][unit['x']] = unit;
                    } else {
                        new_positions[unit['y']][unit['x']] = unit;
                    }
                }
            });
        });
        this.enemy = new_positions;
        this.y_enemy = y_array_enemy;
    };

    Core.prototype.iterate_X = function(y, x, units) {
        y = String(y);
        if(units == 'enemy') return _.find(this.enemy[y], function (v, k) { return parseInt(k) >= x });
        if(units == 'ally')  return _.find(this.ally[y],  function (v, k) { return parseInt(k) <= x });
    };

    Core.prototype.iterate_backwards_X = function(y, x, units) {
        y = String(y);
        if(units == 'enemy') return _.find(this.enemy[y], function (v, k) { return parseInt(k) <= x });
        if(units == 'ally')  return _.find(this.ally[y],  function (v, k) { return parseInt(k) >= x });
    };

    Core.prototype.iterate_Y = function(y, units) {
        if(units == 'enemy') {
            if(this.isInArray(y, this.y_enemy)) {
                return y;
            }
            for(var i = 1; i<1000; i++) {
                i = parseInt(i);
                if( this.isInArray(y+i, this.y_enemy) ) return y+i;
                if( this.isInArray(y-i, this.y_enemy) ) return y-i;
            }
            return y;
        }
        else if(units == 'ally') {
            if(this.isInArray(y, this.y_ally)) {
                return y;
            }
            for(i = 1; i<100; i++) {
                i = parseInt(i);
                if( this.isInArray(y+i, this.y_ally) ) return y+i;
                if( this.isInArray(y-i, this.y_ally) ) return y-i;
            }
            return y;
        }
    };

    Core.prototype.isInArray = function(value, array) {
        return array.indexOf(value) > -1;
    };

    Core.prototype.getCountAlly = function() {
        return this.countAlly;
    };
    Core.prototype.getCountEnemy = function() {
        return this.countEnemy;
    };

    Core.prototype.resetCounts = function() {
        this.countAlly = 0;
        this.countEnemy = 0;
    };

    Core.prototype.log = function() {
        console.log(this.ally, this.enemy);
    };

    return Core;
}]);
