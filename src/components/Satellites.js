import React, { PureComponent } from 'react';
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
OBJLoader('THREE');

export class Satellites extends PureComponent {

  componentDidMount() {
    // Satellite Sphere
    this.geometry = new THREE.SphereGeometry( 10, 32, 32 );
    // Texture
    this.THREE = THREE;
    this.objLoader = new this.THREE.OBJLoader();
    this.objLoader.load
    ('textures/Satellite.obj',
      texture => {
        this.sat = new THREE.MeshBasicMaterial( { map: this.objLoader } );
        this.sphere = new THREE.Mesh( this.geometry, this.sat );
        this.props.scene.add( this.sphere );
      }
    )
  }

  render() {
    return null;
  }
}