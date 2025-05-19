const lookAtCamera = (object, camera) => {
  // Define world positions
  const worldPosition = new THREE.Vector3()
  object.getWorldPosition(worldPosition)

  const cameraWorldPosition = new THREE.Vector3()
  camera.getWorldPosition(cameraWorldPosition)

  // Calculate the rotation using world positions
  object.rotation.y = Math.atan2(
    cameraWorldPosition.x - worldPosition.x,
    cameraWorldPosition.z - worldPosition.z
  )
}

export const smoothFollowComponent = {
  schema: {
    enabled: { type: 'boolean', default: false },
    speed: { type: 'number', default: 0.0025 },
    stopDistance: { type: 'number', default: 0.25 },
  },
  init() {
    console.log('⚙️', '[ init - smoothFollowComponent] ')

    this.cameraEl = document.getElementById('camera')

    console.log(this.el.sceneEl.camera)

    const { object3D } = this.el

    if (object3D) {
      console.log('✅', 'model ready!')
      this.data.enabled = true
    } else {
      this.el.addEventListener('model-loaded', () => {
        console.log('✅', 'model ready!')
        this.data.enabled = true
      })
    }
  },

  // This code will work for nested meshe(s) such as <a-entity> with GLB, Armature etc..
  tick() {
    if (!this.data.enabled) return

    // Use the parent entity's global position for movement calculations
    const cameraWorldPos = new THREE.Vector3()
    this.el.sceneEl.camera.getWorldPosition(cameraWorldPos)
    // this.cameraEl.object3D.getWorldPosition(cameraWorldPos)

    const entityWorldPos = new THREE.Vector3()
    this.el.object3D.getWorldPosition(entityWorldPos)

    // Calculate the step towards the camera in world space
    const stepSize = this.data.speed
    const direction = cameraWorldPos.sub(entityWorldPos).normalize()
    const step = direction.multiplyScalar(stepSize)

    // Update the parent entity's position
    const newPos = entityWorldPos.add(step)
    newPos.y -= cameraWorldPos.y

    // const distance = newPos.distanceTo(cameraWorldPos)
    // if (distance <= this.data.stopDistance) return
    // if (Math.abs(newPos.z) <= 0.1) return
    // console.log('distance = ', distance)

    this.el.object3D.position.copy(newPos)
    this.el.object3D.parent.worldToLocal(this.el.object3D.position) // Convert back to local position

    lookAtCamera(this.el.object3D, this.el.sceneEl.camera)
    // lookAtCamera(this.el.object3D, this.cameraEl.object3D)
  },
}
