var helper = angular.module('helper', []);
helper.factory('helper', function () {
    'use strict';

    function Helper() {}

    Helper.prototype.iterate_X = function(y, x, units) {
        y = String(y);
        var self = this;
        if(units == 'ally')  return _.find(self.enemy[y], function (v, k) { return parseInt(k) >= x });
        if(units == 'enemy') {
            var selected;
            try {
                if(_.has(this.ally, y)) {
                    for(var i=0; i<self.x_ally[y].length; i++) {
                        if(self.x_ally[y][i] <= x) {
                            var found = self.x_ally[y][i];
                            selected = self.ally[y][found];
                            break;
                        }
                    }
                }
            } catch(err) {
                console.log('iterate_X', err, y, x, self.ally, self.x_ally);
            }
            return selected;
        }
    };

    Helper.prototype.iterate_backwards_X = function(y, x, units) {
        y = String(y);
        var self = this;
        if(units == 'enemy') return _.find(this.ally[y],  function (v, k) { return parseInt(k) >= x });
        if(units == 'ally') {
            var selected;
            try {
                if(_.has(this.enemy, y)) {
                    for (var i = 0; i < self.x_enemy[y].length; i++) {
                        if (self.x_enemy[y][i] <= x) {
                            var found = self.x_enemy[y][i];
                            selected = self.enemy[y][found];
                            break;
                        }
                    }
                }
            } catch(err) {
                console.log('iterate_backwards_X', err, y, x, self.enemy, self.x_enemy);
            }
            return selected;
        }
    };

    Helper.prototype.iterate_Y = function(y, units) {
        try {
            if (units == 'ally') {
                if (_.has(this.enemy, y)) {
                    return y;
                }
                for (var i = 1; i < 300; i++) {
                    i = parseInt(i);
                    if (_.has(this.enemy, parseInt(y) + i)) return y + i;
                    if (_.has(this.enemy, parseInt(y) - i)) return y - i;
                }
                return y;
            }
            else if (units == 'enemy') {
                if (_.has(this.ally, y)) {
                    return y;
                }
                for (i = 1; i < 300; i++) {
                    i = parseInt(i);
                    if (_.has(this.ally, parseInt(y) + i)) return y + i;
                    if (_.has(this.ally, parseInt(y) - i)) return y - i;
                }
                return y;
            }
        } catch(err) {
            console.log('iterate_Y', err, y, units);
        }
    };

    return Helper;
});
