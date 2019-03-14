/********** Imports **********/
import React, {
  PureComponent
} from 'react';
import * as THREE from 'three';

import satData from '../data/sat.json';

export class Satellites extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      open: true
    }
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    this.x = {};
    this.mouse = {};
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.cardShown = false;
    this.clickedObj = {};
    this.renderer = new THREE.WebGLRenderer();


  }


  showCard = (userText) => {
    this.divElement = document.getElementsByName(".card");

    if (this.divElement) {
      if (!this.cardShown) {
        this.divElement.css({
          display: "none",
        });
      }

      this.divElement.text("Object color: " + userText);

      if (!this.cardShown) {
        setTimeout(function () {
          this.divElement.css({
            display: "block",
          });
        }, 25);
      }

      this.cardShown = true;
    }
  }

  hideCard = () => {
    this.divElement = document.getElementsByName(".card");
    if (this.divElement) {
      this.divElement.css({
        display: "block",
      });
      this.cardShown = false;
    }
  }

  updateMouseCoords = (event, coordsObj) => {
    coordsObj.x = ((event.clientX - this.renderer.domElement.offsetLeft + 0.5) / window.innerWidth) * 2 - 1;
    coordsObj.y = -((event.clientY - this.renderer.domElement.offsetTop + 0.5) / window.innerHeight) * 2 + 1;
  }

  onMouseUp = (event) => {
    this.updateMouseCoords(event, this.mouse);

    this.latestMouseProjection = undefined;
    this.clickedObj = undefined;

    this.raycaster.setFromCamera(this.mouse, this.camera); {
      this.intersects = this.raycaster.intersectObjects(this.clickableObjects);

      if (this.intersects.length > 0) {
        this.latestMouseProjection = this.intersects[0].point;
        this.clickedObj = this.intersects[0].object;
        this.showCard(this.clickedObj.userData.userText);
      } else {
        this.clickedObj = undefined;
        this.hideCard();
      }
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
    this.geometry = new THREE.SphereGeometry(10, 32, 32)
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffff00
    })
    this.sphere = new THREE.Mesh(this.geometry, this.material)
    this.sphere.callback = function () {
      console.log('Toto!')
    }
    this.sphere.position.set(50, 50, 50)
    this.props.scene.add(this.sphere)
    window.addEventListener('mouseup', this.onMouseUp, false);
  }

  // componentDidUpdate() {
  //   // update satelite pos.
  //   const radius = 10;
  //   const scale = radius * 1;
  //   this.sphere.scale.x = scale;
  //   this.sphere.scale.y = scale;
  //   this.sphere.scale.z = scale;
  // }


  render() {
    return (
      <div>
        {satData.map((satDetail, index) => {
          return (
            <div key={index} className='card'>
              <h2>{satDetail.satName.toUpperCase()}</h2>
              <div className='cardImg'>
                <img src={satDetail.satImg} alt={satDetail.satAlt} />
              </div>
              <div>
                <p>
                  Altitude : <span>{satDetail.alt}</span> km
                </p>
                <p>
                  Longitude : <span>{satDetail.long}</span> °
                </p>
                <p>
                  Latitude : <span>{satDetail.lat}</span> °
                </p>
              </div>
              <button onClick={this.closeModal}>Fermer</button>
            </div>
          )
        })}
        {/* {this.state.isCardOpen ? (
          <div style={cardStyle}>
            <p>{this.state.currentCardData.name}</p>
          </div>
        ) : null} */}
      </div>
    )
  }
}