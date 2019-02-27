/********** Imports **********/
import React, { PureComponent } from 'react';
import * as THREE from 'three';

export class Test extends PureComponent {

  componentDidMount() {
    // init earth + pos.
    this.geometry = new THREE.SphereGeometry( 60, 24, 16 );
    this.material = new THREE.MeshPhongMaterial({ 
        color: 0xaaaaaa,
        flatShading: false
     });
    this.loader = new THREE.TextureLoader();
    this.texture = this.loader.load("color-map.jpg");

    this.sphere = new THREE.Mesh( this.geometry, this.material, this.loader, this.texture );
    this.props.scene.add( this.sphere );
  }

  render() {
    return null;
  }
}
