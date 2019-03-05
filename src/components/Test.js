/********** Imports **********/
import React, { PureComponent } from 'react';
import * as THREE from 'three';

export class Test extends PureComponent {

  componentDidMount() {
    // Sphere
    this.geometry = new THREE.SphereGeometry( 60, 60, 60 );
    this.material = new THREE.MeshPhongMaterial();

    // Texture
    this.texture = new THREE.TextureLoader().load
    ('textures/color-map.jpg')
    this.texture = () => {
      this.earth = new THREE.MeshBasicMaterial( { map: this.texture } );
      this.sphere = new THREE.MeshBasicMaterial( this.earth );
    };

    this.sphere = new THREE.MeshBasicMaterial( this.geometry, this.material );
    this.props.scene.add( this.sphere );
  }

  render() {
    return null;
  }
}
