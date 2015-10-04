describe('Core test', function() {
    beforeEach(module('app'));
    var Core;
    var Unit;
    var ally_formation = [{color: 'red', dmg: 10, hp: 100, column: 1, row: 1, x: 170, y: 1}];
    var enemy_formation = [{color: 'blue', dmg: 10, hp: 100, column: 1, row: 1, x: 220, y: 1}];
    var unit_width = 4;
    var distance_x = 5;
    var distance_y = 5;
    var randomnr = false;
    var ctx;

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

    it('tests initiate function to return correct ally', function () {
        var core = new Core(ally_formation, enemy_formation, unit_width, distance_x, distance_y, ctx, randomnr);
        core.initiate();

        var ally_unit = new Unit(850, 1, ally_formation[0]['hp'], ally_formation[0]['color'], 1, distance_x, distance_y, ally_formation[0]['dmg'], randomnr);
        var enemy_unit = new Unit(860, 1, enemy_formation[0]['hp'], enemy_formation[0]['color'], -1, distance_x, distance_y, enemy_formation[0]['dmg'], randomnr);
        ally_unit.ally = core.ally;
        ally_unit.enemy = core.enemy;
        ally_unit.target = enemy_unit;
    });

});
