define([
  './module',
  'physicsjs',
  'physicsjs/renderers/canvas',
  'physicsjs/bodies/circle',
  'physicsjs/behaviors/constant-acceleration',
  'physicsjs/behaviors/edge-collision-detection',
  'physicsjs/behaviors/body-collision-detection',
  'physicsjs/behaviors/body-impulse-response',
  'physicsjs/behaviors/rigid-constraint-manager',
  'physicsjs/bodies/convex-polygon',
  'physicsjs/behaviors/sweep-prune'
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

          /* make a wheel */
          Physics.body('wheel', 'circle', function(parent) {
            return {
              spin: function(speed) {
                this.state.speed.angular.vel = speed;
              }
            };
          });

          var wheel1 = Physics.body('wheel', {
            x: 25,
            y: window.innerHeight,
            vx: 0,
            vy: 0,
            radius: 5,
            mass: 1,
            restitution: 0.5,
            cof: 0.8
          });
          var wheel2 = Physics.body('wheel', {
            x: 0,
            y: window.innerHeight,
            vx: 0,
            vy: 0,
            radius: 5,
            mass: 1,
            restitution: 0.5,
            cof: 0.8
          });
          world.add(wheel1);
          world.add(wheel2);

          var rcm = Physics.behavior('rigid-constraint-manager');
          world.add(rcm);

          /* create the bike thing */
          var constraint = rcm.constrain(wheel1, wheel2, 20);

          var slope = Physics.body('convex-polygon', {
            x: window.innerWidth,
            y: window.innerHeight,
            fixed: true,
            vertices: [
              {
                x: -1500,
                y: window.innerHeight
              },
              {
                x: window.innerWidth,
                y: (window.innerHeight / 4)
              },
              {
                x: window.innerWidth,
                y: window.innerHeight
              }
            ]
          });
          world.add(slope);

          var gravity = Physics.behavior('constant-acceleration', {
            acc: { x: 0, y: 0.0008 }
          });
          world.add(gravity);

          var bounds = Physics.aabb(0, 0, window.innerWidth, window.innerHeight);
          var collisions = Physics.behavior('edge-collision-detection', {
            aabb: bounds
          });
          world.add(collisions);

          var bodyImpulse = Physics.behavior('body-impulse-response');
          world.add(bodyImpulse);

          var bodyCollisions = Physics.behavior('body-collision-detection');
          world.add(bodyCollisions);

          var sweepPrune = Physics.behavior('sweep-prune');
          world.add(sweepPrune);

          var renderer = Physics.renderer('canvas', {
            el: 'physics-container',
            width: window.innerWidth,
            height: window.innerHeight,
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

