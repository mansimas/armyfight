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
            for(var i=0; i<self.x_ally[y].length; i++) {
                if(self.x_ally[y][i] <= x) {
                    var found = self.x_ally[y][i];
                    selected = self.ally[y][found];
                    break;
                }
            }
            return selected;
        }
    };

    Helper.prototype.iterate_backwards_X = function(y, x, units) {
        y = String(y);
        if(units == 'ally')  return _.find(this.enemy[y], function (v, k) { return parseInt(k) <= x });
        if(units == 'enemy') return _.find(this.ally[y],  function (v, k) { return parseInt(k) >= x });
    };

    Helper.prototype.iterate_Y = function(y, units) {
        if(units == 'ally') {
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
        else if(units == 'enemy') {
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

    Helper.prototype.isInArray = function(value, array) {
        return array.indexOf(value) > -1;
    };

    return Helper;
});
