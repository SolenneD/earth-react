/********** Imports **********/
import React, { PureComponent } from 'react';
import * as THREE from 'three';

import { Satellites } from './Satellites';
import { Earth } from './Earth';
import { Bg } from './Bg';

export class Scene extends PureComponent {

  state = {
    data: [
      { r: 0.5, x: 0, y: 0, z: 0 }
    ]
  };

  initRef = (ref) => {
    this.ref = ref;
  };

  constructor(props) {
    super(props);
    // custom camera...etc.
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.scene.background = new THREE.Color( 0xaaaaaa );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.z = 300;

    // Light
    // this.light = new THREE.PointLight( 0xffffff, 2, 150, 5 );
    // this.light.position.set( 50, 50, 50 );
    // this.props.scene.add( this.light );
  }

  animate = () => {
    requestAnimationFrame( this.animate );
    this.scene.rotation.y += 0.02;
    this.renderer.render( this.scene, this.camera );
  } 

  componentDidMount() {
    this.ref.appendChild( this.renderer.domElement );
    // setInterval(this.fetchData, 1000);
    this.renderer.render( this.scene, this.camera );
    this.animate();
  }

  componentDidUpdate() {
    this.renderer.render( this.scene, this.camera );
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animation);
  }

  fetchData = () => {
    // fetch satelite data.
    const data = [
      { r: Math.random(), x: 0, y: 0, z: 0 }
    ];
    this.setState({ data });
  };

  render() {
    // add satelites + earth.
    return (
      <div id="scene" ref={this.initRef}>
        {/* {this.state.data.map((data, index) => (<Satellites key={index} scene={this.scene} data={data} />))} */}
        <Bg scene={this.scene} />
        <Earth scene={this.scene} />
      </div>
    );
  }
}