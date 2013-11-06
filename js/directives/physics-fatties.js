define(['./module', 'physicsjs'], function(directives, Physics) {
  'use strict';

  directives.directive('physicsFatties', function() {
    return {
      restrict: 'A',
      link: function($scope, $elem, attrs) {
        Physics({
          /* set the timestep */
          timestep: 1000.0 / 160,

          /* max number of iterations per step */
          maxIPF: 16,

          /* set the integrator (may also be set with world.add()) */
          integrator: 'verlet'
          
        }, function(world) {
          Physics.util.ticker.subscribe(function(time, dt) {
            world.step(time);
          });

          var renderer = Physics.renderer('canvas', {
            el: $elem,
            width: '100%',
            height: '100%',
            meta: false
          });

          world.add(renderer);
        });
      }
    };
  });
});

