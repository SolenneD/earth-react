/********** Imports **********/
import React, {PureComponent} from 'react'
import * as THREE from 'three'

import satData from '../data/sat.json'

export class Satellites extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {open: true, isCardOpen: false, selectedSatData: {}}

    this.x = {}
    this.mouse = {}
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
  }

  eventMouseIntersect = event => {
    event.preventDefault()
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    // find intersections
    this.raycaster.setFromCamera(this.mouse, this.props.camera)
    this.intersects = this.raycaster.intersectObjects(
        this.props.scene.children,
        true
    )
    return this.intersects;
  }

  mouseMove = event => {
    let intersects = this.eventMouseIntersect(event);
    if (intersects.length > 0) {
        const mouseSphere = intersects[0].object
        if (mouseSphere.callback) this.cursorPointer(true);
        else this.cursorPointer();
    }
  }

  mouseDown = event => {
    let intersects = this.eventMouseIntersect(event);
    console.log(intersects);
    if (intersects.length > 0) {
        const clickedSphere = intersects[0].object;
        if (clickedSphere.callback) clickedSphere.callback();
        console.log(clickedSphere);
    }
  }

  componentDidMount() {
    // Satellite Sphere
    this.geometry = new THREE.SphereGeometry( this.props.r, 32, 32 );
    // this.geometry = new THREE.SphereGeometry(5, 32, 32)
    this.material = new THREE.MeshBasicMaterial({color: 0xaaaaaa})
    this.sphere = new THREE.Mesh(this.geometry, this.material)
    this.sphere.callback = () => {
        // affiche id 1 (iss)
        this.showCard(this.props.satId);
    }
    this.sphere.position.set(this.props.x, this.props.y, this.props.z)
    this.props.scene.add(this.sphere)

    if (this.props.event == true) {
      document.addEventListener('mousemove', this.mouseMove, false);
      document.addEventListener('mousedown', this.mouseDown, false);
    }
  }

  showCard(selectedSatId) {
    // Recupère un  satellite dans le sat.json où l'id est égale à celui passé en paramètre (voir plus haut)
    const selectedSatData = satData.filter(sat => sat.id === selectedSatId)[0]

    // Met à jour la card
    if (!this.state.isCardOpen) {
        this.setState({isCardOpen: true, selectedSatData})
    } else {
        this.setState({isCardOpen: false, selectedSatData: {}})
    }
  }

  cursorPointer(toggle = false) {
    if (toggle) {
        document.getElementById("root").setAttribute("style", "cursor:pointer");
    } else {
        document.getElementById("root").removeAttribute("style");
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
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mousedown', this.mouseDown)
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