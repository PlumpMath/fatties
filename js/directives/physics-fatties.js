define([
  './module',
  'physicsjs',
  'physicsjs/renderers/canvas',
  'physicsjs/bodies/circle',
  'physicsjs/behaviors/constant-acceleration'
], function(
  directives,
  Physics
) {
  'use strict';

  directives.directive('physicsFatties', function() {
    return {
      restrict: 'A',
      link: function($scope, $elem, attrs) {
        new Physics({
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
          Physics.util.ticker.start();

          var ball = Physics.body('circle', {
            x: 50,
            y: 30,
            vx: 0.2,
            vy: 0.01,
            radius: 20
          });
          world.add(ball);

          var gravity = Physics.behavior('constant-acceleration', {
            acc: { x: 0, y: 0.0004 }
          });
          world.add(gravity);

          var renderer = Physics.renderer('canvas', {
            el: 'physics-container',
            width: '500',
            height: '500',
            meta: false
          });

          world.add(renderer);

          world.subscribe('step', function() {
            world.render();
          });
        });
      }
    };
  });
});

