var parent_unit = angular.module('parent_unit', []);
parent_unit.factory('parent_unit', function () {
    'use strict';

    function Unit() {}

    Unit.prototype.survived = function() {
        if(this.hp <= 0) return false;
        this.check_forward();
        return true;
    };

    Unit.prototype.setAllyEnemy = function(ally, enemy) {
        if(this.team == 1) {
            this.ally = ally;
            this.enemy = enemy;
        } else {
            this.ally = enemy;
            this.enemy = ally;
        }
    };

    Unit.prototype.check_forward = function() {
        if (this.stopped) {
            if (this.attacking == 0) {
                this.try_moving();
            } else {
                this.attacking['hp'] > 0 ? this.attacking['hp'] -= this.damage : this.attacking = 0;
            }
        } else {
            if (!this.find_opponent()) {
                this.try_moving();
            }
        }
    };

    Unit.prototype.try_moving = function() {
        this.stopped = false;
        this.attacking = 0;
        if (this.target && this.target['hp'] > 0) {
            if(this.move_y != 0 ) {
                if(this.move_y < this.distance_y) {
                    this.move_y += 0.5 ;
                } else {
                    this.move_y = 0;
                }
            } else if(this.target['y'] > this.y) {
                if (this.check_around(1)) {
                    this.y++;
                    this.move_y += 0.5;
                    this.direction_y = 1;
                }
            } else if(this.target['y'] < this.y) {
                if (this.check_around(-1)) {
                    this.y--;
                    this.move_y += 0.5;
                    this.direction_y = -1;
                }
            }
            if (this.move_y == 0) this.move_forward();
        }
    };

    Unit.prototype.find_opponent = function() {
        var y_array = [0, 1, -1];
        for(var yy = 0; yy < y_array.length; yy++) {
            var target_y = this.y + y_array[yy];
            var target_x = this.x + (this.team * this.distance_x);
            if (_.has(this.enemy[target_y], target_x)) {
                this.attacking = this.enemy[target_y][target_x];
                this.target = this.enemy[target_y][target_x];
                this.stopped = true;
                return true;
            } else if (_.has(this.enemy[target_y], this.x)) {
                this.attacking = this.enemy[target_y][this.x];
                this.target = this.enemy[target_y][this.x];
                this.stopped = true;
                return true;
            }
        }
        return false;
    };

    Unit.prototype.check_around = function(sort) {
        var target_y = this.y + sort;
        if(this.target['x'] > this.x) {
            for(var xx = -1; xx <= this.distance_x + 1; xx++) {
                if (_.has(this.ally[target_y], this.x+xx)) {
                    return false;
                }
            }
        } else if (this.target['x'] < this.x) {
            for(xx = -1; xx <= this.distance_x + 1; xx++) {
                if (_.has(this.ally[target_y], this.x-xx)) {
                    return false;
                }
            }
        } else {
            if (_.has(this.ally[target_y], this.x)) {
                return false;
            }
        }

        return true;
    };

    Unit.prototype.move_forward = function() {
        if(this.target['x'] > this.x) {
            var opponent = this.x + this.distance_x;
            var opponent1 = this.x + this.distance_x + 1;
            if (!_.has(this.ally[this.y], opponent) && !_.has(this.ally[this.y], opponent1)) {
                this.x += 1;
            }
        }
        else if(this.target['x'] < this.x)  {
            opponent = this.x - this.distance_x;
            opponent1 = this.x - this.distance_x - this.team;
            if (!_.has(this.ally[this.y], opponent) && !_.has(this.ally[this.y], opponent1)) {
                this.x -= 1;
            }
        } else {
            this.attacking = this.target;
            this.stopped = true;
        }
    };

    Unit.prototype.draw = function (ctx, unit_width) {
        if(this.x > 0 && this.x < 1800 && this.y * this.distance_y > 0 && this.y * this.distance_y < 900) {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            if(this.move_y == 0) {
                ctx.fillRect(this.x, this.y * this.distance_y, unit_width, unit_width);
            } else {
                var yy = (this.y - this.direction_y) * this.distance_y + (this.move_y * this.direction_y);
                ctx.fillRect(this.x, yy, unit_width, unit_width);
            }
        }
    };

    return Unit;
});
