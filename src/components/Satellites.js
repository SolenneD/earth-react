/********** Imports **********/
import React, { PureComponent } from 'react';
import * as THREE from 'three';

import satData from '../data/sat.json';

export class Satellites extends PureComponent {

  constructor(props) {
    super(props)
    this.state = { open: true }
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    this.x = {};
    this.mouse = {};
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

  }

  onDocumentMouseDown = (event) => {
    event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    // find intersections
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObjects(this.objects, true);
    if (this.intersects.length > 0) {

      this.intersects[0].object.material.color.setHex(Math.random() * 0xffffff);

      this.particle = new THREE.Sprite(this.particleMaterial);
      this.particle.position.copy(this.intersects[0].point);
      
      this.particle.scale.x = this.particle.scale.y = 16;
      this.scene.add(this.particle);
    }
  }


  // openModal (){
  //   this.setState({ open: false })
  // }

  // closeModal () {
  //   this.setState({ open: true })
  // }

  componentDidMount() {
    // Satellite Sphere
    // this.geometry = new THREE.SphereGeometry( this.props.data.r, 32, 32 );
    this.geometry = new THREE.SphereGeometry(10, 32, 32);
    this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.sphere.position.set(50, 50, 50);
    this.props.scene.add(this.sphere);
    document.addEventListener('mousedown', this.onDocumentMouseDown, false);

  }

  componentDidUpdate() {
    // update satelite pos.
    const radius = 10;
    const scale = radius * 1;
    this.sphere.scale.x = scale;
    this.sphere.scale.y = scale;
    this.sphere.scale.z = scale;
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onDocumentMouseDown);
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