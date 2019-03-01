/********** Imports **********/
import React, { PureComponent } from 'react';
import * as THREE from 'three';

export class Test extends PureComponent {

  componentDidMount() {
    // creer une sphere
    this.geometry = new THREE.SphereGeometry( 60, 60, 60 );
    this.material = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
    });

    // PAS ENCORE LA TEXTURE
    this.textureLoader = new THREE.TextureLoader();
    this.texture = this.textureLoader.load( './textures/color-map.jpg' )

    this.sphere = new THREE.Mesh( this.geometry, this.material, this.textureLoader, this.texture );
    this.props.scene.add( this.sphere );

    // Light
    this.light = new THREE.PointLight( 0xffffff, 2, 150, 5 );
    this.light.position.set( 50, 50, 50 );
    this.props.scene.add( this.light );

    // Animation cameara keyframe PAS ENCORE FAIT
    this.animate = () => {
      requestAnimationFrame( this.animate );
      this.scene.rotation.x += 0.01;
      this.scene.rotation.y += 0.02;
      this.renderer.render( this.scene, this.camera );
    }
  }

  render() {
    return null;
  }
}
