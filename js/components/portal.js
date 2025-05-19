export const hiderMaterialComponent = {
  init() {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x00ff00),
      colorWrite: false,
    })

    const apply = (obj) => {
      obj.traverse((n) => {
        if (n.isMesh) {
          n.material = mat
          n.material.needsUpdate = true
          n.renderOrder = 0
        }
      })
    }

    apply(this.el.object3D)
    this.el.addEventListener('model-loaded', () => apply(this.el.object3D))
  },
}

export const doorComponent = {
  init() {
    console.log([doorComponent])
    this.isReady = false
    this.el.addEventListener('loaded', () => {
      console.log('door has been loaded!')
      this.isReady = true
    })

    const handleDoorOpen = () => {
      console.log('click door!')
      if (!this.isReady) return

      console.log('Door opening...')

      // TODO: smoke event
      // Dispatch custom event for smoke
      const event = new CustomEvent('should-spread-smoke', { bubbles: true })
      this.el.dispatchEvent(event)

      setTimeout(() => {
        this.el.setAttribute(
          'animation-mixer',
          'clip:Default_Open; loop:once; timeScale: 0.5; clampWhenFinished: true'
        )
        this.el.removeEventListener('click', handleDoorOpen)

        setTimeout(() => {
          const astroModel = document.getElementById('astronautModel')
          astroModel.setAttribute('smooth-follow', '')
        }, 1000)
      }, 8000)
    }

    this.el.addEventListener('click', handleDoorOpen)
  },
}

export const sphereSkyboxComponent = {
  schema: { src: { type: 'selector' } },

  init() {
    // 50-unit radius, 32×16 segments, vertical half left-or-right
    const geometry = new THREE.SphereGeometry(
      25,
      32,
      16,
      Math.PI,
      Math.PI,
      0,
      Math.PI
    )

    const texture = new THREE.TextureLoader().load(
      this.data.src.getAttribute('src')
    )
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    })
    this.mesh = new THREE.Mesh(geometry, material)
    this.el.setObject3D('mesh', this.mesh)
  },
}
