
describe('Core test', function() {
    beforeEach(module('app'));
    var Core;
    var Unit;
    var ally_formation =  [{color: 'red',  dmg: 10, hp: 100, column: 1, row: 1, x: 170, y: 1 }];
    var enemy_formation = [{color: 'blue', dmg: 10, hp: 100, column: 1, row: 1, x: 220, y: 1 }];
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

    it('tests initiate function to return correct ally', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        expect(core.ally).toEqual( {} );
        var mocked_unit = new Unit(850, 1, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        core.initiate();
        expect(core.ally).toEqual({ 1: { 850: mocked_unit } } );
    });

    it('tests initiate function to return correct enemy', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        expect(core.enemy).toEqual( {} );
        var mocked_unit = new Unit(1100, 1, enemy_formation[0]['hp'], enemy_formation[0]['color'], -1, distance_x, distance_y, enemy_formation[0]['dmg'], randomnr);
        core.initiate();
        expect(core.enemy).toEqual({ 1: { 1100: mocked_unit } } );
    });

    it('tests initiate function to return correct enemy', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        expect(core.enemy).toEqual( {} );
        var mocked_unit = new Unit(1100, 1, enemy_formation[0]['hp'], enemy_formation[0]['color'], -1, distance_x, distance_y, enemy_formation[0]['dmg'], randomnr);
        core.initiate();
        expect(core.enemy).toEqual({ 1: { 1100: mocked_unit } } );
    });

    it('tests initiate function to return correct frame', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        expect(core.frame).toEqual(0);
    });

    it('tests initiate function to return correct countAlly', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        expect(core.countAlly).toEqual(0);
    });

    it('tests initiate function to return correct countAlly', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        expect(core.countEnemy).toEqual(0);
    });

    it('tests initiate function to return correct randomnr', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        expect(core.randomnr).toBeFalsy();
    });

    it('tests getCountAlly function', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        core.countAlly++;
        expect(core.getCountAlly()).toEqual(1);
    });

    it('tests getCountEnemy function', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        core.countEnemy++;
        expect(core.getCountEnemy()).toEqual(1);
    });

    it('tests resetCounts function', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();
        expect(core.getCountEnemy()).toEqual(0);
        core.countEnemy++;
        expect(core.getCountEnemy()).toEqual(1);
        core.resetCounts();
        expect(core.getCountEnemy()).toEqual(0);
    });

    it('tests initiate function to return correct ally with more units', function () {
        var ally_formation =  [{color: 'red',  dmg: 10, hp: 100, column: 2, row: 2, x: 170, y: 1 }];
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        expect(core.ally).toEqual( {} );
        var mocked_unit  = new Unit(845, 1, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        var mocked_unit1 = new Unit(850, 1, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        var mocked_unit2 = new Unit(845, 2, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        var mocked_unit3 = new Unit(850, 2, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        core.initiate();
        expect(core.ally).toEqual(
            { 1: { 845: mocked_unit,  850: mocked_unit1 },
              2: { 845: mocked_unit2, 850: mocked_unit3 }}
        );
    });

    it('tests initiate function to return correct enemy with more units', function () {
        var enemy_formation =  [{color: 'blue',  dmg: 10, hp: 100, column: 2, row: 2, x: 220, y: 1 }];
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        expect(core.enemy).toEqual( {} );
        var mocked_unit  = new Unit(1100, 1, enemy_formation[0]['hp'], enemy_formation[0]['color'], -1, distance_x, distance_y, enemy_formation[0]['dmg'], randomnr);
        var mocked_unit1 = new Unit(1105, 1, enemy_formation[0]['hp'], enemy_formation[0]['color'], -1, distance_x, distance_y, enemy_formation[0]['dmg'], randomnr);
        var mocked_unit2 = new Unit(1100, 2, enemy_formation[0]['hp'], enemy_formation[0]['color'], -1, distance_x, distance_y, enemy_formation[0]['dmg'], randomnr);
        var mocked_unit3 = new Unit(1105, 2, enemy_formation[0]['hp'], enemy_formation[0]['color'], -1, distance_x, distance_y, enemy_formation[0]['dmg'], randomnr);
        core.initiate();
        expect(core.enemy).toEqual(
            { 1: { 1100: mocked_unit,  1105: mocked_unit1 },
              2: { 1100: mocked_unit2, 1105: mocked_unit3 }}
        );
    });
});

