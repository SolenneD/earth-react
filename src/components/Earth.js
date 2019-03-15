/********** Imports **********/
import { PureComponent } from 'react';
import * as THREE from 'three';

export class Earth extends PureComponent {

  componentDidMount() {
    // Sphere
    this.geometry = new THREE.SphereGeometry( 30, 60, 60 );

    // Texture
    this.texture = new THREE.TextureLoader().load('textures/earth.jpg',
      texture => {
        this.earth = new THREE.MeshBasicMaterial( { map: this.texture } );
        this.sphere = new THREE.Mesh( this.geometry, this.earth );
        this.props.scene.add( this.sphere );
      }
    )
  }

  render() {
    return null;
  }
}
