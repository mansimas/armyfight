
describe('Army Fight', function() {
    beforeEach(module('app'));
    var TheController,
        scope,
        ally_formation,
        enemy_formation,
        y_ally,
        y_enemy,
        ally,
        enemy,
        unit_width,
        distance_x,
        distance_y;

    beforeEach(inject(function ($rootScope, $controller) {
        var mycanvas = document.createElement("canvas");
        mycanvas.id = "game";
        document.body.appendChild(mycanvas);
        ally_formation = [
            {color: 'red',  dmg: 10, hp: 100, column: 1, row: 1, x: 148, y: 1 }
        ];
        enemy_formation = [
            {color: 'blue', dmg: 10, hp: 100, column: 1, row: 1, x: 150, y: 1 }
        ];
        y_ally = [];
        y_enemy = [];
        ally = {};
        enemy = {};
        unit_width = 4;
        distance_x = 5;
        distance_y = 5;

        scope = $rootScope.$new();
        TheController = function() {
            return $controller('game', {
                '$scope': scope
            });
        };
    }));

    it('tests single unit attack single unit same row', function () {

        var controller = TheController();
        expect(controller.alfa()).toEqual(1);
    });




    //it('tests filesource itself', function () {
    //    expect(filesource[0]['coords'][0][0]).toEqual(11.319);
    //});
    //
    //it('tests round()', function () {
    //    scope.round(1);
    //    expect(scope.marked_player).toEqual(1);
    //});
    //
    //it('tests clear_round()', function () {
    //    scope.marked_player = 1;
    //    scope.clear_round(1);
    //    expect(scope.marked_player).toEqual(null);
    //});
    //
    //it('tests or lined player is added', function () {
    //    scope.players_with_line = [0, 1];
    //    scope.add_lined_player(2);
    //    expect(scope.players_with_line).toEqual([0, 1, 2]);
    //});
    //
    //it('tests or lined player is removed', function () {
    //    scope.players_with_line = [0, 1];
    //    scope.add_lined_player(1);
    //    expect(scope.players_with_line).toEqual([0]);
    //});
    //
    //it('tests or returned button class is btn-default if player is unselected', function () {
    //    scope.players_with_line[0] = null;
    //    var returned_class = scope.return_button_class(0);
    //    expect(returned_class).toEqual('btn-default');
    //});
    //
    //it('tests or returned button class is btn-success if player is selected', function () {
    //    scope.players_with_line[0] = 0;
    //    var returned_class = scope.return_button_class(0);
    //    expect(returned_class).toEqual('btn-success');
    //});
    //
    //it('tests or returned button value is off if player is unselected', function () {
    //    scope.players_with_line[0] = null;
    //    var returned_value = scope.return_button_value(0);
    //    expect(returned_value).toEqual(' -> off');
    //});
    //
    //it('tests or returned button value is on if player is selected', function () {
    //    scope.players_with_line[0] = 0;
    //    var returned_value = scope.return_button_value(0);
    //    expect(returned_value).toEqual(' -> on');
    //});
    //
    //it('tests or followed player is added if it was not added before', function () {
    //    scope.solo_followed_player = null;
    //    scope.add_followed_player(0);
    //    expect(scope.solo_followed_player).toEqual(0);
    //});
    //
    //it('tests when followed player is added, that it becomes current followed player', function () {
    //    scope.solo_followed_player = 5;
    //    scope.add_followed_player(0);
    //    expect(scope.solo_followed_player).toEqual(0);
    //});
    //
    //it('tests when followed player is added and it was the current one, that it removes itself', function () {
    //    scope.solo_followed_player = 0;
    //    scope.add_followed_player(0);
    //    expect(scope.solo_followed_player).toEqual(null);
    //});
    //
    //it('tests or returned followed player class is btn-success if player is selected', function () {
    //    scope.solo_followed_player = 0;
    //    var returned_class = scope.return_followed_player_class(0);
    //    expect(returned_class).toEqual('btn-success');
    //});
    //
    //it('tests or returned followed player class is btn-default if player is not selected', function () {
    //    scope.solo_followed_player = 1;
    //    var returned_class = scope.return_followed_player_class(0);
    //    expect(returned_class).toEqual('btn-default');
    //});
    //
    //it('tests or returned followed player value is on if player is selected', function () {
    //    scope.solo_followed_player = 0;
    //    var returned_class = scope.return_followed_player_value(0);
    //    expect(returned_class).toEqual(' -> on');
    //});
    //
    //it('tests or returned followed player value is off if player is not selected', function () {
    //    scope.solo_followed_player = 1;
    //    var returned_class = scope.return_followed_player_value(0);
    //    expect(returned_class).toEqual(' -> off');
    //});

});

