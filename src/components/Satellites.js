/********** Imports **********/
import React, { PureComponent } from 'react';
import * as THREE from 'three';

export class Satellites extends PureComponent {

  componentDidMount() {
    // init satelite + pos.
    this.geometry = new THREE.SphereGeometry( this.props.data.r, 32, 32 );
    this.material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    this.sphere = new THREE.Mesh( this.geometry, this.material );
    this.props.scene.add( this.sphere );
  }

  componentDidUpdate() {
    // update satelite pos.
    const radius = this.props.data.r;
    const scale = radius * 1;
    this.sphere.scale.x = scale;
    this.sphere.scale.y = scale;
    this.sphere.scale.z = scale;
  }

  render() {
    return null;
  }
}
