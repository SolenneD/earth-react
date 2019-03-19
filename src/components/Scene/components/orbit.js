/** ******** Imports ********* */
import React, { PureComponent } from 'react'
import * as THREE from 'three'

import satData from '../../../data/sat.json'

export class Orbit extends PureComponent {
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

    const { scene, camera, renderer } = this.props
    const {
      x, y, z, r, event
    } = this.props
    console.log(this.props)
    this.event = event
    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    // orbit
    // this.orbit = new THREE.TorusGeometry(200, 1.1, 6.3, 24)
    this.torusGeom = new THREE.TorusGeometry(x, 0.1, 7, 40)
    this.torusMat = new THREE.MeshBasicMaterial()
    this.orbit = new THREE.Mesh(this.torusGeom, this.torusMat)

    // satellite
    this.geometry = new THREE.SphereGeometry(r, 32, 32)
    this.material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff })
    this.sphere = new THREE.Mesh(this.geometry, this.material)
    this.sphere.position.set(x, y, z)
    this.renderScene = this.renderScene.bind(this)

    this.state = {
      speedX: Math.random() / 100,
      speedY: Math.random() / 100,
      speedZ: Math.random() / 100
    }
  }

  componentWillMount() {
    this.group = new THREE.Group()
    this.group.add(this.orbit)
    this.group.add(this.sphere)

    // Rotation
    this.group.rotation.z = 3

    // Inclinaison
    this.group.rotation.x = 300
    this.group.rotation.y = 300

    this.scene.add(this.group)
  }

  componentDidMount() {
    if (this.event === true) {
      document.addEventListener('mousemove', this.mouseMove, false)
      document.addEventListener('mousedown', this.mouseDown, false)
    }
    this.renderScene()
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

    if (intersects.length === 2) {
      console.log('test')
    }

    this.cursorPointer()
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

  renderScene() {
    const { speedX, speedY, speedZ } = this.state
    requestAnimationFrame(this.renderScene)
    this.group.rotation.x += speedX
    this.group.rotation.y += speedY
    this.group.rotation.z += speedZ
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
