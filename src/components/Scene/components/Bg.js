/** ******** Imports ********* */
import { PureComponent } from 'react'
import * as THREE from 'three'

export class Bg extends PureComponent {
  componentDidMount() {
    const { scene } = this.props
    // Sphere
    this.geometry = new THREE.SphereGeometry(300, 60, 60)

    // Texture
    this.texture = new THREE.TextureLoader().load('/public/textures/stars.jpg', () => {
      this.earth = new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: this.texture })
      this.sphere = new THREE.Mesh(this.geometry, this.earth)
      scene.add(this.sphere)
    })
  }

  render() {
    return null
  }
}
