var core = angular.module('core', ['units', 'iteration']);
core.factory('core', ['units', 'iteration', function (Unit, Iteration) {
    'use strict';

    function Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr) {
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
        this.randomnr = randomnr;
    }

    Core.prototype = new Iteration();

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
                        this.distance_y,
                        this.ally_formation[row]['dmg'],
                        this.randomnr
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
                        this.distance_y,
                        this.enemy_formation[row]['dmg'],
                        this.randomnr
                    );
                }
                this.enemy[y] = columns;
            }
        }
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
