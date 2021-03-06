var iteration = angular.module('iteration', ['helper']);
iteration.factory('iteration', ['helper', function (Helper) {
    'use strict';

    function Iteration() {}

    Iteration.prototype = new Helper();

    Iteration.prototype.calculate_units = function() {

        var new_positions = { ally: {},        enemy: {}         };
        var numbers =       { ally: 0,         enemy: 0          };
        var group =         { ally: this.ally, enemy: this.enemy };
        var x_array =       { ally: [],        enemy: []         };
        var self = this;

        _.each(['ally', 'enemy'], function(type) {
            _.each(group[type], function (val, y) {
                y = parseInt(y);
                var closest_y = self.iterate_Y(y, type);
                _.each(val, function (unit, x) {
                    x = parseInt(x);
                    unit.setAllyEnemy(self.ally, self.enemy);
                    if (unit.survived()) {
                        numbers[type]++;
                        if (unit['target'] == undefined) {
                            var target = self.iterate_X(closest_y, x, type);
                            if (target == undefined) target = self.iterate_backwards_X(closest_y, x, type);
                            unit['target'] = target;
                        } else if (unit['target']['hp'] < 1) {
                            target = self.iterate_X(closest_y, x, type);
                            if (target == undefined) target = self.iterate_backwards_X(closest_y, x, type);
                            unit['target'] = target;
                        }
                        unit.draw(self.ctx, self.unit_width);
                        if (!_.has(new_positions[type], unit['y'])) {
                            x_array[type][unit['y']] = [];
                            x_array[type][unit['y']].unshift([unit['x']]);
                            new_positions[type][unit['y']] = {};
                            new_positions[type][unit['y']][unit['x']] = unit;
                        } else {
                            x_array[type][unit['y']].unshift([unit['x']]);
                            new_positions[type][unit['y']][unit['x']] = unit;
                        }
                    }
                });
            });
        });

        this.ally       = new_positions['ally'];
        this.enemy      = new_positions['enemy'];
        this.x_ally     = x_array['ally'];
        this.x_enemy    = x_array['enemy'];
        this.countAlly  = numbers['ally'];
        this.countEnemy = numbers['enemy'];
    };

    return Iteration;
}]);
