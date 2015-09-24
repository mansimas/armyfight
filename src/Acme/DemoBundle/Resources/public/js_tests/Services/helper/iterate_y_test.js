describe('iterate_Y function test', function() {
    beforeEach(module('app'));
    var Core;
    var Unit;
    var unit_width = 4;
    var distance_x = 5;
    var distance_y = 5;
    var randomnr = false;
    var ctx;
    var ally_formation = [{color: 'red', dmg: 10, hp: 100, column: 10, row: 10, x: 170, y: 1}];
    var enemy_formation = [{color: 'blue', dmg: 10, hp: 100, column: 10, row: 10, x: 220, y: 1}];

    beforeEach(inject(function () {
        var $injector = angular.injector(['core', 'units']);
        Core = $injector.get('core');
        Unit = $injector.get('units');
        var canvas_creator = document.createElement("canvas");
        canvas_creator.id = "game";
        document.body.appendChild(canvas_creator);
        var canvas = document.getElementById("game");
        ctx = canvas.getContext("2d");
    }));


    it('tests iterate_y when ally looks for enemy at simplest example', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(1, 'ally');
        expect(found_y).toEqual(1);
    });

    it('tests iterate_y when ally looks for enemy when ally is at left side', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(-1, 'ally');
        expect(found_y).toEqual(1);
    });

    it('tests iterate_y when ally looks for enemy when ally is at far away left side', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(-98, 'ally');
        expect(found_y).toEqual(1);
    });

    it('tests iterate_y when ally looks for enemy when ally is at right side', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(11, 'ally');
        expect(found_y).toEqual(10);
    });

    it('tests iterate_y when ally looks for enemy when ally is at far away right side', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(98, 'ally');
        expect(found_y).toEqual(10);
    });

    it('tests iterate_y when ally looks for enemy when ally is too far away left', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(-350, 'ally');
        expect(found_y).toEqual(-350);
    });

    it('tests iterate_y when ally looks for enemy when ally is too far away right', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(350, 'ally');
        expect(found_y).toEqual(350);
    });

    it('tests iterate_y when enemy looks for ally at simplest example', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(1, 'enemy');
        expect(found_y).toEqual(1);
    });

    it('tests iterate_y when enemy looks for ally when enemy is at right side', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(-1, 'enemy');
        expect(found_y).toEqual(1);
    });

    it('tests iterate_y when enemy looks for ally when enemy is at far away right side', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(-98, 'enemy');
        expect(found_y).toEqual(1);
    });

    it('tests iterate_y when enemy looks for ally when enemy is at left side', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(11, 'enemy');
        expect(found_y).toEqual(10);
    });

    it('tests iterate_y when enemy looks for ally when enemy is at far away left side', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(98, 'enemy');
        expect(found_y).toEqual(10);
    });

    it('tests iterate_y when enemy looks for ally when enemy is too far away right', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(-350, 'enemy');
        expect(found_y).toEqual(-350);
    });

    it('tests iterate_y when enemy looks for ally when enemy is too far away left', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        var found_y = core.iterate_Y(350, 'enemy');
        expect(found_y).toEqual(350);
    });
});
