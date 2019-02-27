/********** Imports **********/
import React, { PureComponent } from 'react';
import * as THREE from 'three';

export class Test extends PureComponent {

  componentDidMount() {
    // init earth + pos.
    this.geometry = new THREE.SphereGeometry( 60, 24, 16 );
    this.material = new THREE.MeshPhongMaterial({ 
        color: 0xff0000,
     });
    this.loader = new THREE.TextureLoader();
    // this.texture = this.loader.load("color-map.jpg");

    // this.sphere = new THREE.Mesh( this.geometry, this.material, this.loader, this.texture );
    this.sphere = new THREE.Mesh( this.geometry, this.material, this.loader );
    this.props.scene.add( this.sphere );
  }

  componentDidUpdate() {
    // update satelite pos.
    const radius = this.props.data.r;
    const scale = radius * 3;
    this.sphere.scale.x = scale;
    this.sphere.scale.y = scale;
    this.sphere.scale.z = scale;
  }

  render() {
    return null;
  }
}
