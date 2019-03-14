/********** Imports **********/
import React, { PureComponent } from 'react'
import * as THREE from 'three'
 
import satData from '../data/sat.json'
 
const cardStyle = {
  zIndex: 999,
  width: '100%',
  background: 'white',
  position: "absolute",
  opacity: .5
}
 
export class Satellites extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { open: true, isCardOpen: false, selectedSatData: {} }
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    this.x = {}
    this.mouse = {}
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
  }
 
  onDocumentMouseDown = event => {
    event.preventDefault()
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    // find intersections
    this.raycaster.setFromCamera(this.mouse, this.props.camera)
    this.intersects = this.raycaster.intersectObjects(
      this.props.scene.children,
      true
    )
    if (this.intersects.length > 0) {
      const clickedSphere = this.intersects[0].object
      if (clickedSphere.callback) clickedSphere.callback()
 
      this.intersects[0].object.material.color.setHex(Math.random() * 0xffffff)
 
      this.particle = new THREE.Sprite(this.particleMaterial)
      this.particle.position.copy(this.intersects[0].point)
 
      this.particle.scale.x = this.particle.scale.y = 16
      this.props.scene.add(this.particle)
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
    this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    this.sphere = new THREE.Mesh(this.geometry, this.material)
    this.sphere.callback = () => {
      // affiche id 1 (iss)
      this.showCard(1)
    }
    this.sphere.position.set(50, 50, 50)
    this.props.scene.add(this.sphere)
    document.addEventListener('mousedown', this.onDocumentMouseDown, false)
  }
 
  showCard(selectedSatId) {
    // Recupère un  satellite dans le sat.json où l'id est égale à celui passé en paramètre (voir plus haut)
    const selectedSatData = satData.filter(sat => sat.id === selectedSatId)[0]
 
    // Met à jour la card
    if (!this.state.isCardOpen) {
      this.setState({ isCardOpen: true, selectedSatData })
    } else {
      this.setState({ isCardOpen: false, selectedSatData: {} })
    }
  }
 
  componentDidUpdate() {
    // update satelite pos.
    const radius = 1
    const scale = radius * 1
    this.sphere.scale.x = scale
    this.sphere.scale.y = scale
    this.sphere.scale.z = scale
  }
 
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onDocumentMouseDown)
  }
 
  render() {
    return (
      <div>
        {this.state.isCardOpen ? (
          <div className='card'>
            <h2>{this.state.selectedSatData.satName.toUpperCase()}</h2>
            <div className='cardImg'>
              <img
                src={this.state.selectedSatData.satImg}
                alt={this.state.selectedSatData.satAlt}
              />
            </div>
            <div>
              <p>
                Altitude : <span>{this.state.selectedSatData.alt}</span> km
              </p>
              <p>
                Longitude : <span>{this.state.selectedSatData.long}</span> °
              </p>
              <p>
                Latitude : <span>{this.state.selectedSatData.lat}</span> °
              </p>
            </div>
            <button onClick={() => this.showCard()}>Fermer</button>
          </div>
        ) : null}
      </div>
    )
  }
}