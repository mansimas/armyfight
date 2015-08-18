var app = angular.module('app', []);

app.controller('game', function($scope, $interval) {

    $scope.attacking = false;
    $scope.frame = 0;
    $scope.countAlly = 0;
    $scope.countEnemy = 0;

    var canvas  = document.getElementById("game"),
        ctx = canvas.getContext("2d"),

        ally = {},
        enemy = {},
        ally_formation = [
            {color: 'red', column: 300, row: 10, hp: 50, x: 170, y: 30},
            {color: 'red', column: 300, row: 10, hp: 50, x: 170, y: 40},
            {color: 'red', column: 300, row: 10, hp: 50, x: 170, y: 70},
            {color: 'red', column: 300, row: 10, hp: 50, x: 170, y: 120}
        ],
        enemy_formation = [
            {color: 'blue', column: 300, row: 10, hp: 50, x: 200, y: 1},
            {color: 'blue', column: 300, row: 10, hp: 50, x: 200, y: 50},
            {color: 'blue', column: 300, row: 10, hp: 50, x: 200, y: 90},
            {color: 'blue', column: 300, row: 10, hp: 50, x: 200, y: 158}
        ],
        unit_width = 4,
        distance_x = 5,
        distance_y = 5;

    function Ally(x, y, hp, color) {
        this.x = x;
        this.y = y;
        this.target = 0;
        this.team = 1;
        this.stopped = false;
        this.hp = hp;
        this.color = color;
        this.attacking = '';
        this.damage = Math.ceil(Math.random()*10);
        this.survived = function() {
            if(this.hp <= 0) return false;
            this.check_forward();
            return true;
        };
        this.check_forward = function() {
            var opponent = this.x+(this.team * distance_x);
            if (this.stopped) {

                if (_.has(enemy[this.y], opponent)) {
                    enemy[this.y][opponent]['hp'] -= this.damage;
                    this.attacking = 1;
                }

                else if (_.has(enemy[this.y], opponent+this.team)) {
                    enemy[this.y][opponent+this.team]['hp'] -= this.damage;
                    this.attacking = 2;
                }

                else if (_.has(enemy[this.y+this.team], opponent)) {
                    enemy[this.y+this.team][opponent]['hp'] -= this.damage;
                    this.attacking = 3;
                }

                else if (_.has(enemy[this.y+this.team], opponent+this.team)) {
                    enemy[this.y+this.team][opponent+this.team]['hp'] -= this.damage;
                    this.attacking = 4;
                }

                else if (_.has(enemy[this.y-this.team], opponent)) {
                    enemy[this.y-this.team][opponent]['hp'] -= this.damage;
                    this.attacking = 5;
                }

                else if (_.has(enemy[this.y-this.team], opponent+this.team)) {
                    enemy[this.y-this.team][opponent+this.team]['hp'] -= this.damage;
                    this.attacking = 6;
                }

                else if (!_.has(ally[this.y], opponent)) {
                    this.x += this.team;
                    this.stopped = false;
                    this.attacking = 0;
                }

            } else {
                if (_.has(ally[this.y], opponent)) {
                    this.stopped = true;
                    this.attacking = 0;
                }

                else if (_.has(enemy[this.y], opponent)) {
                    this.stopped = true;
                    this.attacking = 1;
                }

                else if (_.has(enemy[this.y], opponent + this.team)) {
                    this.stopped = true;
                    this.attacking = 2;
                }

                else if (_.has(enemy[this.y+this.team], opponent)) {
                    this.stopped = true;
                    this.attacking = 3;
                }

                else if (_.has(enemy[this.y+this.team], opponent + this.team)) {
                    this.stopped = true;
                    this.attacking = 4;
                }

                else if (_.has(enemy[this.y-this.team], opponent)) {
                    this.stopped = true;
                    this.attacking = 5;
                }

                else if (_.has(enemy[this.y-this.team], opponent + this.team)) {
                    this.stopped = true;
                    this.attacking = 6;
                }

                else {
                    this.x += this.team;
                    this.attacking = 0;
                }
            }
        };
        this.draw = function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y*distance_y, unit_width, unit_width);
        }
    }

    function Enemy(x, y, hp, color) {
        this.x = x;
        this.y = y;
        this.team = -1;
        this.stopped = false;
        this.attacking = '';
        this.hp = hp;
        this.color = color;
        this.target = 0;
        this.damage = Math.ceil(Math.random()*10);
        this.survived = function() {
            if(this.hp <= 0) return false;
            this.check_forward();
            return true;
        };
        this.check_forward = function() {
            var opponent = this.x+(this.team * distance_x);
            if(this.stopped) {
                if (_.has(ally[this.y], opponent)) {
                    ally[this.y][opponent]['hp'] -= this.damage;
                    this.attacking = 1;
                }

                else if (_.has(ally[this.y], opponent+this.team)) {
                    ally[this.y][opponent+this.team]['hp'] -= this.damage;
                    this.attacking = 2;
                }

                else if (_.has(ally[this.y + this.team], opponent)) {
                    ally[this.y + this.team][opponent]['hp'] -= this.damage;
                    this.attacking = 3;
                }

                else if (_.has(ally[this.y+ this.team], opponent+this.team)) {
                    ally[this.y+ this.team][opponent+this.team]['hp'] -= this.damage;
                    this.attacking = 4;
                }

                else if (_.has(ally[this.y - this.team], opponent)) {
                    ally[this.y - this.team][opponent]['hp'] -= this.damage;
                    this.attacking = 5;
                }

                else if (_.has(ally[this.y - this.team], opponent+this.team)) {
                    ally[this.y - this.team][opponent+this.team]['hp'] -= this.damage;
                    this.attacking = 6;
                }

                else if (!_.has(enemy[this.y], opponent)) {
                    this.x += this.team;
                    this.stopped = false;
                    this.attacking = 0;
                }

            } else {
                if (_.has(enemy[this.y], opponent)) {
                    this.stopped = true;
                    this.attacking = 0;
                }

                else if (_.has(ally[this.y], opponent)) {
                    this.stopped = true;
                    this.attacking = 1;
                }

                else if (_.has(ally[this.y], opponent + this.team)) {
                    this.stopped = true;
                    this.attacking = 2;
                }

                else if (_.has(ally[this.y+this.team], opponent)) {
                    this.stopped = true;
                    this.attacking = 3;
                }

                else if (_.has(ally[this.y+this.team], opponent + this.team)) {
                    this.stopped = true;
                    this.attacking = 4;
                }

                else if (_.has(ally[this.y-this.team], opponent)) {
                    this.stopped = true;
                    this.attacking = 5;
                }

                else if (_.has(ally[this.y-this.team], opponent + this.team)) {
                    this.stopped = true;
                    this.attacking = 6;
                }

                else {
                    this.x += this.team;
                    this.attacking = 0;
                }
            }
        };
        this.draw = function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y*distance_y, unit_width, unit_width);
        }
    }

    function start_animation_loop() {
        initiate_units();
        $scope.promise = $interval(function() {
            if($scope.attacking == true) {
                animate();
                $scope.frame++;
            }
        }, 40 );
    }

    function initiate_units() {
        for(var row = 0; row < ally_formation.length; row++) {
            for(var y = ally_formation[row]['y']; y < ally_formation[row]['row'] + ally_formation[row]['y']; y++) {
                var columns = {};
                for (var x = ally_formation[row]['x']; x > -ally_formation[row]['column'] + ally_formation[row]['x']; x--) {
                    columns[x*distance_x] = new Ally(x*distance_x, y, ally_formation[row]['hp'], ally_formation[row]['color']);
                }
                ally[y] = columns;
            }
        }

        for(row = 0; row < enemy_formation.length; row++) {
            for( y = enemy_formation[row]['y']; y < enemy_formation[row]['row'] + enemy_formation[row]['y']; y++) {
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
        _.each(ally, function(val, y) {
            var closest_y = iterate_Y(y, enemy);
            _.each(val, function(unit, x) {
                if (unit.survived()) {
                    if(unit['target'] == 0) {
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
    }

    function calculate_enemy() {
        var new_positions = {};
        _.each(enemy, function(val, y) {
            var closest_y = iterate_Y(y, ally);
            _.each(val, function(unit, x) {
                if (unit.survived()) {
                    if(unit['target'] == 0) {
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
        enemy = new_positions;
    }

    function iterate_X(y, x, unit) {
        if(unit == 'enemy') return _.find(enemy[y], function (val, key) { return key >= x });
        if(unit == 'ally')  return _.find(ally[y],  function (val, key) { return key <= x });
    }

    function iterate_backwards_X(y, x, unit) {
        if(unit == 'enemy') return _.find(enemy[y], function (val, key) { return key <= x });
        if(unit == 'ally')  return _.find(ally[y],  function (val, key) { return key >= x });
    }

    function iterate_Y(y, unit) {
        if(_.has(unit, y)) {
            return y;
        } else {
            return iterate_recursively(y, unit);
        }
    }

    function iterate_recursively(y, unit) {
        for(var i = 1; i<1000; i++) {
            if( _.has(unit, y+i) ) return y+i;
            if( _.has(unit, y-i) ) return y-i;
        }
        return y;
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
