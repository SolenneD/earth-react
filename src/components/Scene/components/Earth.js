/** ******** Imports ********* */
import { PureComponent } from 'react'
import * as THREE from 'three'

export class Earth extends PureComponent {
  constructor(props) {
    super(props)

    const { scene } = this.props

    this.scene = scene
  }

  componentDidMount() {
    // Sphere
    this.geometry = new THREE.SphereGeometry(30, 60, 60)

    // Texture
    this.texture = new THREE.TextureLoader().load('/public/textures/earth.jpg', () => {
      this.textureEarth = new THREE.MeshBasicMaterial({ map: this.texture })
      this.earth = new THREE.Mesh(this.geometry, this.textureEarth)
      this.scene.add(this.earth)
    })
  }

  render() {
    return null
  }
}
