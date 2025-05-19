import SmokeMaterial from '../materials/SmokeMaterial'
// import smokeSrc from '../assets/images/textures/smoke.png'
// import DebugPane from '../utils/debug'

export const smokeSpreadComponent = {
  schema: {
    total: { default: 100 },
    speed: { default: 0.01 },
    scaleSpeed: { default: 0.01 },
    smokeSpreadFactor: { default: 0.005 },
  },
  init() {
    this.hasStarted = false
    this.center = new THREE.Vector3(0, 0, 0)
    this.fadeDuration = 4000 // smoke fading duration in milliseconds
    this.fadeStartTime = null // smoke fading to record the start time of fading

    const geometry = new THREE.PlaneGeometry(1, 1)

    const textureLoader = new THREE.TextureLoader()
    textureLoader.load('images/smoke.png', (texture) => {
      const material = new SmokeMaterial(texture)
      this.material = material

      for (let i = 0; i < this.data.total; i++) {
        const plane = new THREE.Mesh(geometry, material)

        const randScale = THREE.MathUtils.randFloat(0.1, 3.5)
        plane.scale.set(randScale, randScale, randScale)

        plane.rotation.set(0, 0, 0)

        const x = THREE.MathUtils.randFloat(-0.25, 0.25)
        const y = THREE.MathUtils.randFloat(-0.1, 0.25)
        const z = THREE.MathUtils.randFloat(-0.5, 0.5)

        plane.position.set(x, y, z)

        this.el.object3D.add(plane)
      }
    })

    // TODO: on catch smoke event
    this.el.sceneEl.addEventListener('should-spread-smoke', () => {
      console.log('should spread smoke catch!')
      this.spread()
    })
  },
  spread() {
    console.log('TODO: spread smoke in circle!')
    this.shouldFadeIn = true
    this.hasStarted = true

    setTimeout(() => {
      this.shouldFade = true
    }, 8000)
  },

  evolveSmoke() {
    if (!this.hasStarted) return

    const {
      data: { scaleSpeed },
    } = this
    let {
      data: { smokeSpreadFactor },
    } = this

    this.el.object3D.children.forEach((mesh, index) => {
      const { position, scale } = mesh
      position.x += smokeSpreadFactor * Math.cos(index)
      position.y += smokeSpreadFactor * Math.sin(index)
      mesh.position.copy(position)

      if (scale.x < 1) {
        scale.x += scaleSpeed
        scale.y += scaleSpeed
        scale.z += scaleSpeed
        mesh.scale.copy(scale)
      }

      if (this.center.distanceTo(position) >= 7) {
        smokeSpreadFactor = 0
      }
    })
  },

  fadeinSmoke() {
    if (!this.shouldFadeIn) return

    // Smoothly fade in opacity to 1
    if (
      this.material &&
      this.material.uniforms &&
      this.material.uniforms.uOpacity
    ) {
      this.material.uniforms.uOpacity.value += 0.02
      if (this.material.uniforms.uOpacity.value >= 1) {
        this.material.uniforms.uOpacity.value = 1
        this.shouldFadeIn = false
      }
    }
  },

  fadeAwaySmoke() {
    if (!this.shouldFade) return
    if (this.fadeStartTime === null) this.fadeStartTime = Date.now()

    const elapsedTime = Date.now() - this.fadeStartTime
    const fraction = elapsedTime / this.fadeDuration
    this.material.uniforms.uOpacity.value = Math.max(1 - fraction, 0)

    if (fraction >= 1) {
      this.shouldFade = false
      this.fadeStartTime = null
      this.el.remove()
    }
  },

  tick(time) {
    this.el.object3D.children.forEach((mesh, index) => {
      mesh.material.uniforms.uTime.value =
        (time * index * this.data.speed) / 1000
      mesh.rotation.z += this.data.speed
    })

    this.evolveSmoke()
    this.fadeAwaySmoke()
    this.fadeinSmoke()
  },
}
