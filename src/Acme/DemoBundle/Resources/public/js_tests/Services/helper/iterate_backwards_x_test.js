
describe('iterate_backwards_X function test', function() {
    beforeEach(module('app'));
    var Core;
    var Unit;
    var unit_width = 4;
    var distance_x = 5;
    var distance_y = 5;
    var randomnr = false;
    var ctx;

    beforeEach(inject(function() {
        var $injector = angular.injector(['core', 'units']);
        Core = $injector.get('core');
        Unit = $injector.get('units');
        var canvas_creator = document.createElement("canvas");
        canvas_creator.id = "game";
        document.body.appendChild(canvas_creator);
        var canvas  = document.getElementById("game");
        ctx = canvas.getContext("2d");
    }));

    it('tests after initiate() for ally when searching enemy on ally.y = enemy.y = (1) and ally.x = 170', function () {
        var ally_formation =  [{color: 'red',  dmg: 10, hp: 100, column: 10, row: 10, x: 200, y: 1 }];
        var enemy_formation = [{color: 'blue', dmg: 10, hp: 100, column: 10, row: 10, x: 100, y: 1 }];
        var first_mocked_unit  = new Unit(100*5+9*5, 1, 100, 'blue', -1, 5, 5, 10, false);
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();

        var x_ally_position_which_closest_to_enemy = 200*5-9*5;
        var found_unit = core.iterate_backwards_X(1, x_ally_position_which_closest_to_enemy, 'ally');
        expect(found_unit).toEqual(first_mocked_unit, 'at normal');

        found_unit = core.iterate_backwards_X(1, x_ally_position_which_closest_to_enemy + 500, 'ally');
        expect(found_unit).toEqual(first_mocked_unit, 'at smaller x');

        found_unit = core.iterate_backwards_X(1, x_ally_position_which_closest_to_enemy - 10, 'ally');
        expect(found_unit).toEqual(first_mocked_unit, 'at little bigger x');

        var first_enemy_x_position = 100*5+9*5;
        found_unit = core.iterate_backwards_X(1, first_enemy_x_position, 'ally');
        expect(found_unit).toEqual(first_mocked_unit, 'at first enemy position');

        var second_mocked_unit  = new Unit(100*5+8*5, 1, 100, 'blue', -1, 5, 5, 10, false);
        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-1, 'ally');
        expect(found_unit).toEqual(second_mocked_unit, 'at second enemy position');

        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-5, 'ally');
        expect(found_unit).toEqual(second_mocked_unit, 'between first and second enemy position');

        var third_mocked_unit  = new Unit(100*5+7*5, 1, 100, 'blue', -1, 5, 5, 10, false);
        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-6, 'ally');
        expect(found_unit).toEqual(third_mocked_unit, 'at third enemy position');

        var ninth_mocked_unit  = new Unit(100*5+5, 1, 100, 'blue', -1, 5, 5, 10, false);
        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-5*8, 'ally');
        expect(found_unit).toEqual(ninth_mocked_unit, 'at ninth enemy position');

        var last_mocked_unit  = new Unit(100*5, 1, 100, 'blue', -1, 5, 5, 10, false);
        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-5*8-1, 'ally');
        expect(found_unit).toEqual(last_mocked_unit, '1pixel after ninth enemy position');

        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-5*9+1, 'ally');
        expect(found_unit).toEqual(last_mocked_unit, '1pixel before last enemy position');

        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-5*9, 'ally');
        expect(found_unit).toEqual(last_mocked_unit, 'exact at last enemy position');

        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-5*9-1, 'ally');
        expect(found_unit).toEqual(undefined, '1 pixel after last enemy position');
    });

    it('tests after initiate() for ally when searching enemy on ally.y = enemy.y = (1) and ally.x = 170', function () {
        var ally_formation =  [{color: 'red',  dmg: 10, hp: 100, column: 10, row: 10, x: 200, y: 1 }];
        var enemy_formation = [{color: 'blue', dmg: 10, hp: 100, column: 10, row: 10, x: 100, y: 1 }];
        var first_mocked_unit  = new Unit(100*5+9*5, 1, 100, 'blue', -1, 5, 5, 10, false);
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();

        var x_ally_position_which_closest_to_enemy = 200*5-9*5;
        var found_unit = core.iterate_backwards_X(1, x_ally_position_which_closest_to_enemy, 'ally');
        expect(found_unit).toEqual(first_mocked_unit, 'at normal');

        found_unit = core.iterate_backwards_X(1, x_ally_position_which_closest_to_enemy + 500, 'ally');
        expect(found_unit).toEqual(first_mocked_unit, 'at smaller x');

        found_unit = core.iterate_backwards_X(1, x_ally_position_which_closest_to_enemy - 10, 'ally');
        expect(found_unit).toEqual(first_mocked_unit, 'at little bigger x');

        var first_enemy_x_position = 100*5+9*5;
        found_unit = core.iterate_backwards_X(1, first_enemy_x_position, 'ally');
        expect(found_unit).toEqual(first_mocked_unit, 'at first enemy position');

        var second_mocked_unit  = new Unit(100*5+8*5, 1, 100, 'blue', -1, 5, 5, 10, false);
        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-1, 'ally');
        expect(found_unit).toEqual(second_mocked_unit, 'at second enemy position');

        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-5, 'ally');
        expect(found_unit).toEqual(second_mocked_unit, 'between first and second enemy position');

        var third_mocked_unit  = new Unit(100*5+7*5, 1, 100, 'blue', -1, 5, 5, 10, false);
        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-6, 'ally');
        expect(found_unit).toEqual(third_mocked_unit, 'at third enemy position');

        var ninth_mocked_unit  = new Unit(100*5+5, 1, 100, 'blue', -1, 5, 5, 10, false);
        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-5*8, 'ally');
        expect(found_unit).toEqual(ninth_mocked_unit, 'at ninth enemy position');

        var last_mocked_unit  = new Unit(100*5, 1, 100, 'blue', -1, 5, 5, 10, false);
        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-5*8-1, 'ally');
        expect(found_unit).toEqual(last_mocked_unit, '1pixel after ninth enemy position');

        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-5*9+1, 'ally');
        expect(found_unit).toEqual(last_mocked_unit, '1pixel before last enemy position');

        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-5*9, 'ally');
        expect(found_unit).toEqual(last_mocked_unit, 'exact at last enemy position');

        found_unit = core.iterate_backwards_X(1, first_enemy_x_position-5*9-1, 'ally');
        expect(found_unit).toEqual(undefined, '1 pixel after last enemy position');
    });

    it('tests enemy after calculate_units() when searching ally on enemy.y = ally.y = (1) and enemy.x = 170', function () {
        var ally_formation =  [{color: 'red',  dmg: 10, hp: 100, column: 10, row: 10, x: 200, y: 1 }];
        var enemy_formation = [{color: 'blue', dmg: 10, hp: 100, column: 10, row: 10, x: 100, y: 1 }];
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        core.calculate_units();

        var first_mocked_unit  = new Unit(200*5-9*5, 1, 100, 'red', 1, 5, 5, 10, false);
        first_mocked_unit.ally=undefined;
        first_mocked_unit.enemy=undefined;
        var x_enemy_position_which_closest_to_ally = 100*5+9*5;
        var found_unit = core.iterate_backwards_X(1, x_enemy_position_which_closest_to_ally, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(first_mocked_unit, 'at normal');

        found_unit = core.iterate_backwards_X(1, x_enemy_position_which_closest_to_ally - 500, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(first_mocked_unit, 'at bigger x');

        found_unit = core.iterate_backwards_X(1, x_enemy_position_which_closest_to_ally + 10, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(first_mocked_unit, 'at little smaller x');

        var closest_ally_x_position = 200*5-9*5;
        found_unit = core.iterate_backwards_X(1, closest_ally_x_position, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(first_mocked_unit, 'at first ally position');

        var second_mocked_unit  = new Unit(200*5-8*5, 1, 100, 'red', 1, 5, 5, 10, false);
        second_mocked_unit.ally=undefined;
        second_mocked_unit.enemy=undefined;
        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+1, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(second_mocked_unit, 'at second ally position');

        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+5, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(second_mocked_unit, 'between first and second ally position');

        var third_mocked_unit  = new Unit(200*5-7*5, 1, 100, 'red', 1, 5, 5, 10, false);
        third_mocked_unit.ally=undefined;
        third_mocked_unit.enemy=undefined;
        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+6, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(third_mocked_unit, 'at third ally position');

        var ninth_mocked_unit  = new Unit(200*5-5, 1, 100, 'red', 1, 5, 5, 10, false);
        ninth_mocked_unit.ally=undefined;
        ninth_mocked_unit.enemy=undefined;
        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+5*8, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(ninth_mocked_unit, 'at ninth ally position');

        var last_mocked_unit  = new Unit(200*5, 1, 100, 'red', 1, 5, 5, 10, false);
        last_mocked_unit.ally=undefined;
        last_mocked_unit.enemy=undefined;
        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+5*8+1, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(last_mocked_unit, '1pixel after ninth ally position');

        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+5*9-1, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(last_mocked_unit, '1pixel before last ally position');

        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+5*9, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(last_mocked_unit, 'exact at last ally position');

        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+5*9+1, 'enemy');
        expect(found_unit).toEqual(undefined, '1 pixel after last ally position');
    });

    it('tests enemy after calculate_units()  when searching ally on enemy.y = ally.y = (1) and enemy.x = 170', function () {
        var ally_formation =  [{color: 'red',  dmg: 10, hp: 100, column: 10, row: 10, x: 200, y: 1 }];
        var enemy_formation = [{color: 'blue', dmg: 10, hp: 100, column: 10, row: 10, x: 100, y: 1 }];
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        core.calculate_units();

        var first_mocked_unit  = new Unit(200*5-9*5, 1, 100, 'red', 1, 5, 5, 10, false);
        first_mocked_unit.ally=undefined;
        first_mocked_unit.enemy=undefined;
        var x_enemy_position_which_closest_to_ally = 100*5+9*5;
        var found_unit = core.iterate_backwards_X(1, x_enemy_position_which_closest_to_ally, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(first_mocked_unit, 'at normal');

        found_unit = core.iterate_backwards_X(1, x_enemy_position_which_closest_to_ally - 500, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(first_mocked_unit, 'at bigger x');

        found_unit = core.iterate_backwards_X(1, x_enemy_position_which_closest_to_ally + 10, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(first_mocked_unit, 'at little smaller x');

        var closest_ally_x_position = 200*5-9*5;
        found_unit = core.iterate_backwards_X(1, closest_ally_x_position, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(first_mocked_unit, 'at first ally position');

        var second_mocked_unit  = new Unit(200*5-8*5, 1, 100, 'red', 1, 5, 5, 10, false);
        second_mocked_unit.ally=undefined;
        second_mocked_unit.enemy=undefined;
        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+1, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(second_mocked_unit, 'at second ally position');

        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+5, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(second_mocked_unit, 'between first and second ally position');

        var third_mocked_unit  = new Unit(200*5-7*5, 1, 100, 'red', 1, 5, 5, 10, false);
        third_mocked_unit.ally=undefined;
        third_mocked_unit.enemy=undefined;
        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+6, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(third_mocked_unit, 'at third ally position');

        var ninth_mocked_unit  = new Unit(200*5-5, 1, 100, 'red', 1, 5, 5, 10, false);
        ninth_mocked_unit.ally=undefined;
        ninth_mocked_unit.enemy=undefined;
        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+5*8, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(ninth_mocked_unit, 'at ninth ally position');

        var last_mocked_unit  = new Unit(200*5, 1, 100, 'red', 1, 5, 5, 10, false);
        last_mocked_unit.ally=undefined;
        last_mocked_unit.enemy=undefined;
        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+5*8+1, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(last_mocked_unit, '1pixel after ninth ally position');

        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+5*9-1, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(last_mocked_unit, '1pixel before last ally position');

        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+5*9, 'enemy');
        found_unit.target=undefined;
        found_unit.ally=undefined;
        found_unit.enemy=undefined;
        expect(found_unit).toEqual(last_mocked_unit, 'exact at last ally position');

        found_unit = core.iterate_backwards_X(1, closest_ally_x_position+5*9+1, 'enemy');
        expect(found_unit).toEqual(undefined, '1 pixel after last ally position');
    });
});

