ARMY FIGHT
========================

  * This is experimental project.
  * Goal - reach smooth army fight of ~40.000 vs 40.000 units.
  * Each unit should have minimal AI to find propel enemy, move towards it, attack it.
  * Each army should act as a regular medieval army: holding the formation, surrounding enemy army.

What's inside?
--------------

The army fight so far includes:

  * Best works with Chrome. Firefox is bad on this even with 1000 units at each side when almost no load.

  * Ability to smoothly load 30.000 units for each side.

  * Attack forward enemy, 1 at left side or 1 at right side, which closer.

  * Find closest forward enemy.

  * Move towards enemy at x and y axis.

  * Fight enemy by 9 directions.

  * Partially surround enemy army.

  * Ability to fight several units vs 1 unit.

  * Ability to move forwards x or backwards x or at y axis.

  * Ability to attack enemy at any side: forward x, backward x, y direction.

  * Do random damage or specific damage.

  * Units have health, damage, team (ally or enemy), color, size, distance between units.

The code so far includes:

  * Unit tests ( so far 50% ).

  * Maximally neat code style and names.

  * Very good structure for unit testing and code separation.

  * Angular, Underscore, Jquery, HTML5 canvas.

  * As much as possible less loading and calculations for each unit.

  * Very good iteration structure and data holding structure.

What are the goals:

  * Armies should be able to perfectly surround enemy armies - hardest part.

  * Units should be cubes at far-away view and should be rendered pictures at resizing field to smaller view.

  * Fights should be saved as generated random key, which will be used for random damage.

  * Units should have more advanced enemy searching formula.

  * Units should fight not only at x direction, but same at y direction.

What is the purpose:

  * Use this tool as army simulator for such games like TribalWars, Travian, etc...

  * Just didn't find anywhere i could see very huge army fights at all, i was dreaming about it.

  * This was inspired by old-school games like Troy, Chariots of war, Spartan, Legion..
  (Rome total war didn't like so much because i had bad computer and the fights didn't like for many reasons).
