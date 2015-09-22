var unit = angular.module('units', ['parent_unit']);
unit.factory('units', ['parent_unit', function (parent_unit) {
    'use strict';
    function Unit(x, y, hp, color, team, distance_x, distance_y) {
        this.x = x;
        this.y = y;
        this.move_y = 0;
        this.direction_y = 0;
        this.target = undefined;
        this.team = team;
        this.stopped = false;
        this.hp = hp;
        this.color = color;
        this.attacking = 0;
        this.damage = Math.ceil(2+Math.random()*10);
        this.distance_x = distance_x;
        this.distance_y = distance_y;
    }
    Unit.prototype = new parent_unit();

    return Unit;
}]);
