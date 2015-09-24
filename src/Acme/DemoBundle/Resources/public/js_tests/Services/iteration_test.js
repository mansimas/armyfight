
describe('Iteration test', function() {
    beforeEach(module('app'));
    var Core;
    var Unit;
    var ally_formation =  [{color: 'red',  dmg: 1, hp: 100, column: 1, row: 1, x: 170, y: 1 }];
    var enemy_formation = [{color: 'blue', dmg: 1, hp: 100, column: 1, row: 1, x: 220, y: 1 }];
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

    it('tests iteration when there is no target', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        var mocked_unit = new Unit(850, 1, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        var result = { 1: { 850: mocked_unit } };
        core.initiate();
        expect(core.ally).toEqual(result, 'after initiate');

        core.calculate_units();
        mocked_unit.ally = undefined;
        mocked_unit.enemy = undefined;
        core.ally[1][850]['ally']= undefined;
        core.ally[1][850]['enemy'] = undefined;
        core.ally[1][850]['target'] = undefined;
        result = { 1: { 850: mocked_unit } };
        expect(core.ally).toEqual(result, 'after first frame');

        core.calculate_units();
        core.ally[1][850]['ally']= undefined;
        core.ally[1][850]['enemy'] = undefined;
        core.ally[1][850]['target'] = undefined;
        result = { 1: { 850: mocked_unit } };
        expect(core.ally).toEqual(result, 'after second frame');
    });

    it('tests iteration when there is target', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        var mocked_unit = new Unit(850, 1, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        var target_unit = new Unit(855, 1, enemy_formation[0]['hp'], enemy_formation[0]['color'], -1, distance_x, distance_y, enemy_formation[0]['dmg'], randomnr);
        var result = { 1: { 850: mocked_unit } };
        core.initiate();
        expect(core.ally).toEqual(result, 'after initiate');

        core.calculate_units();
        mocked_unit.ally = undefined;
        mocked_unit.enemy = undefined;
        mocked_unit.target = target_unit;
        core.ally[1][850]['ally']= undefined;
        core.ally[1][850]['enemy'] = undefined;
        core.ally[1][850]['target'] = target_unit;
        result = { 1: { 850: mocked_unit } };
        expect(core.ally).toEqual(result, 'after first frame');

        core.calculate_units();
        mocked_unit = new Unit(851, 1, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        mocked_unit.ally = undefined;
        mocked_unit.enemy = undefined;
        mocked_unit.target = target_unit;
        core.ally[1][851]['ally']= undefined;
        core.ally[1][851]['enemy'] = undefined;
        result = { 1: { 851: mocked_unit } };
        expect(core.ally).toEqual(result, 'after second frame');

        core.calculate_units();
        mocked_unit = new Unit(852, 1, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        mocked_unit.ally = undefined;
        mocked_unit.enemy = undefined;
        mocked_unit.target = target_unit;
        core.ally[1][852]['ally']= undefined;
        core.ally[1][852]['enemy'] = undefined;
        result = { 1: { 852: mocked_unit } };
        expect(core.ally).toEqual(result, 'after third frame');

        core.calculate_units();
        mocked_unit = new Unit(853, 1, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        mocked_unit.ally = undefined;
        mocked_unit.enemy = undefined;
        mocked_unit.target = target_unit;
        core.ally[1][853]['ally']= undefined;
        core.ally[1][853]['enemy'] = undefined;
        result = { 1: { 853: mocked_unit } };
        expect(core.ally).toEqual(result, 'after 4th frame');

        core.calculate_units();
        mocked_unit = new Unit(854, 1, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        mocked_unit.ally = undefined;
        mocked_unit.enemy = undefined;
        mocked_unit.target = target_unit;
        core.ally[1][854]['ally']= undefined;
        core.ally[1][854]['enemy'] = undefined;
        result = { 1: { 854: mocked_unit } };
        expect(core.ally).toEqual(result, 'after 5th frame');

        core.calculate_units();
        mocked_unit = new Unit(855, 1, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        mocked_unit.ally = undefined;
        mocked_unit.enemy = undefined;
        mocked_unit.target = target_unit;
        core.ally[1][855]['ally']= undefined;
        core.ally[1][855]['enemy'] = undefined;
        result = { 1: { 855: mocked_unit } };
        expect(core.ally).toEqual(result, 'after 6th frame');

        core.calculate_units();
        mocked_unit = new Unit(855, 1, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        mocked_unit.ally = undefined;
        mocked_unit.enemy = undefined;
        mocked_unit.target = target_unit;
        mocked_unit.stopped = true;
        mocked_unit.attacking = target_unit;
        core.ally[1][855]['ally']= undefined;
        core.ally[1][855]['enemy'] = undefined;
        result = { 1: { 855: mocked_unit } };
        expect(core.ally).toEqual(result, 'after 7th frame');

        core.calculate_units();
        core.ally[1][855]['ally']= undefined;
        core.ally[1][855]['enemy'] = undefined;
        result = { 1: { 855: mocked_unit } };
        expect(core.ally).toEqual(result, 'after 8th frame');

        core.calculate_units();
        core.ally[1][855]['ally']= undefined;
        core.ally[1][855]['enemy'] = undefined;
        result = { 1: { 855: mocked_unit } };
        expect(core.ally).toEqual(result, 'after 9th frame');
    });
});

