/** ******** Imports ********* */
import React, { PureComponent } from 'react'
import * as THREE from 'three'

import satData from '../../../data/sat.json'

export class Satellites extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { open: true, isCardOpen: false, selectedSatData: {} }
    this.x = {}
    this.mouse = {}
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.mouseDown = this.mouseDown.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.eventMouseIntersect = this.eventMouseIntersect.bind(this)
  }

  componentDidMount() {
    // // Satellite Sphere
    // const {
    //   satId, x, y, z, r, scene, event
    // } = this.props
    // this.geometry = new THREE.SphereGeometry(r, 32, 32)
    // this.material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff })
    // this.sphere = new THREE.Mesh(this.geometry, this.material)
    // this.sphere.callback = () => {
    //   // affiche id
    //   this.showCard(satId)
    // }
    // this.sphere.position.set(x, y, z)
    // scene.add(this.sphere)

    if (event === true) {
      document.addEventListener('mousemove', this.mouseMove, false)
      document.addEventListener('mousedown', this.mouseDown, false)
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

  eventMouseIntersect(event) {
    const {
      scene: { children },
      camera
    } = this.props
    event.preventDefault()
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    // find intersections
    this.raycaster.setFromCamera(this.mouse, camera)
    this.intersects = this.raycaster.intersectObjects(children, true)
    return this.intersects
  }

  mouseDown(event) {
    const intersects = this.eventMouseIntersect(event)
    if (intersects.length > 0) {
      const clickedSphere = intersects[0].object
      if (clickedSphere.callback) clickedSphere.callback()
    }
  }

  mouseMove(event) {
    const intersects = this.eventMouseIntersect(event)
    if (intersects.length > 0) {
      const mouseSphere = intersects[0].object
      if (mouseSphere.callback) this.cursorPointer(true)
      else this.cursorPointer()
    }
  }

  showCard(selectedSatId) {
    // Recupère un  satellite dans le sat.json
    const selectedSatData = satData.filter(sat => sat.id === selectedSatId)[0]
    const { isCardOpen } = this.state
    // Met à jour la card
    if (!isCardOpen) {
      this.setState({ isCardOpen: true, selectedSatData })
    } else {
      this.setState({ isCardOpen: false, selectedSatData: {} })
    }
  }

  cursorPointer(toggle = false) {
    if (toggle) {
      document.getElementById('root').setAttribute('style', 'cursor:pointer')
    } else {
      document.getElementById('root').removeAttribute('style')
    }
  }

  render() {
    const { isCardOpen, selectedSatData } = this.state
    return (
      <div>
        {isCardOpen ? (
          <div className="card">
            <h2>{selectedSatData.satName.toUpperCase()}</h2>
            <div className="cardImg">
              <img src={selectedSatData.satImg} alt={selectedSatData.satAlt} />
            </div>
            <div>
              <p>
                {'Altitude :'}
                <span>{selectedSatData.alt}</span>
                {'km'}
              </p>
              <p>
                {'Longitude :'}
                <span>{selectedSatData.long}</span>
                {'° W'}
              </p>
              <p>
                {'Latitude :'}
                <span>{selectedSatData.lat}</span>
                {'° S'}
              </p>
            </div>
            <button type="button" onClick={() => this.showCard()}>
              Fermer
            </button>
          </div>
        ) : null}
      </div>
    )
  }
}
