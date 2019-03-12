/********** Imports **********/
import React, { PureComponent } from 'react';
import * as THREE from 'three';

import satData from '../data/sat.json';

export class Satellites extends PureComponent {

  constructor(props) {
    super(props)
    this.state = { open: true }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );   

  }
  
  onDocumentMouseDown = ( event ) => {
    event.preventDefault();
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // find intersections
    this.raycaster.setFromCamera( this.mouse, this.camera );
    this.intersects = this.raycaster.intersectObjects( this.scene.children );
    if ( this.intersects.length > 0 ) {
      if ( this.INTERSECTED != this.intersects[ 0 ].object ) {
        if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
        this.INTERSECTED = this.intersects[ 0 ].object;
        this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
        this.INTERSECTED.material.emissive.setHex( 0xff0000 );
         console.log(this.intersects.length);
      }
    } else {
      if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
      this.INTERSECTED = null;
    }
  }


  openModal (){
    this.setState({ open: false })
  }
  
  closeModal () {
    this.setState({ open: true })
  }

  componentDidMount() {
    // Satellite Sphere
    // this.geometry = new THREE.SphereGeometry( this.props.data.r, 32, 32 );
    this.geometry = new THREE.SphereGeometry(10, 32, 32);
    this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.sphere.position.set(50, 50, 50);
    this.props.scene.add(this.sphere);
  }

   componentDidUpdate() {
     // update satelite pos.
     const radius = 10;
     const scale = radius * 1;
     this.sphere.scale.x = scale;
     this.sphere.scale.y = scale;
     this.sphere.scale.z = scale;
   }

  render() {
    return (
      <div>
        {satData.map((satDetail, index) => {
          return <div key={index} className="card">
            <h2>{satDetail.satName.toUpperCase()}</h2>
            <div className="cardImg" >
              <img src={satDetail.satImg} alt={satDetail.satAlt} />
            </div>
            <div>
              <p>Altitude : <span>{satDetail.alt}</span> km</p>
              <p>Longitude : <span>{satDetail.long}</span> °</p>
              <p>Latitude : <span>{satDetail.lat}</span> °</p>
            </div>
            <button onClick={this.closeModal}>Fermer</button>
          </div>
        })}
      </div>
    )
  }
}