/********** Imports **********/
import React, { PureComponent } from 'react';
import * as THREE from 'three';

import { Satellites } from './Satellites';
import { Earth } from './Earth';
import { Test } from './Test';

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
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.z = 5;
  }

  componentDidMount() {
    this.ref.appendChild( this.renderer.domElement );
    setInterval(this.fetchData, 1000);
    this.renderer.render( this.scene, this.camera );
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
        {this.state.data.map((data, index) => (<Satellites key={index} scene={this.scene} data={data} />))}
        <Earth />
        <Test />
      </div>
    );
  }

}