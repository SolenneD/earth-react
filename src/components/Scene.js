/********** Imports **********/
import React, {
  PureComponent
} from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';

import {Satellites} from './Satellites';
import {Earth} from './Earth';
import {Bg} from './Bg';


export class Scene extends PureComponent {

  initRef = (ref) => {
    this.ref = ref;
  };

  constructor(props) {
    super(props);
    // custom camera...etc.
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.scene.background = new THREE.Color(0xaaaaaa);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 300;

    this.state = {
      data: [{
          satId: 1,
          r: 5,
          x: -50,
          y: 50,
          z: 70,
          event: true
        },
        {
          satId: 2,
          r: 5,
          x: 70,
          y: 50,
          z: 110,
          event: false
        },
        {
          satId: 3,
          r: 5,
          x: -70,
          y: 50,
          z: -160,
          event: false
        }
      ]
    };

    // this.OrbitControls = require('three-orbit-controls')(THREE)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.maxDistance = 300;
    this.controls.minDistance = 10;
    // responsive de la scene
    window.addEventListener( 'resize', this.onWindowResize, false );
  }

  // fonction responsive de la scene
  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    // this.scene.rotation.y += .0005;
    this.scene.rotation.y += .0035;
    // this.scene.rotation.x += .005;
    this.renderer.render(this.scene, this.camera);
  }

  componentDidMount() {
    this.ref.appendChild(this.renderer.domElement);
    setInterval(this.fetchData, 1000);
    this.renderer.render(this.scene, this.camera);

    this.animate();
  }

  componentDidUpdate() {
    this.renderer.render(this.scene, this.camera);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animation);
  }

  render() {
    // satelites + earth.
    return (
      <div id="scene" ref={this.initRef}>
        {this.state.data.map((data, index) => 
          (<Satellites id="card" key={this.index} scene={this.scene} event={data.event} satId={data.satId} r={data.r} x={data.x} y={data.y} z={data.z} camera={this.camera} />)
        )}
        {/* <Satellites id="card" scene={this.scene} camera={this.camera} /> */}
        {/* <CardSat /> */}
        <Bg scene={this.scene} />
        <Earth scene={this.scene} />
      </div>
    );
  }
}