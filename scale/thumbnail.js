class Thumbnail extends THREE.Object3D {
  constructor({ 
    width = 320, 
    height = 200
  } = {}) {
    super()

    this.width = width
    this.height = height
    this.origin = {
      x: window.innerWidth / -2,
      y: window.innerHeight / 2
    }
    this.texture = null
    this.geometry = null
    this.materila = null
    this.mesh = null

    // this.initialize()
  }
  initialize() {
    // this.texture = await this.load(image)
    // console.log(this.texture)
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 16, 16)
    this.material = new THREE.ShaderMaterial({
      // wireframe: true,
      uniforms: {
        texture: {
          type: 't',
          value: this.texture
        },
        deltaY: {
          type: 'f',
          value: 0.0
        },
        x: {
          type: 'f',
          value: 0.0
        }
      },
      vertexShader: document.getElementById('vs').textContent,
      fragmentShader: document.getElementById('fs').textContent,
      blending: THREE.AdditiveBlending,
      depthWrite: true,
      transparent: true
    })
    this.mesh = new THREE.Mesh(
      this.geometry, 
      this.material
    )
    this.mesh.scale.set(this.width, this.height, 1)
    this.mesh.position.set(
      this.width / 2, 
      this.height / -2, 
      0
    )
    this.add(this.mesh)
    // this.setPosition({})
    const ns = []
    for(let i = 0; i <= this.geometry.parameters.widthSegments; i++) {
      for(let j = 0; j <= this.geometry.parameters.heightSegments; j++) {
        ns.push(j)
        // console.log(ns)
      }
    }

    this.geometry.addAttribute('n', new THREE.BufferAttribute(new Float32Array(ns), 1));
    console.log('thumbnail初期化完了')
  }
  load(img) {
    return new Promise((resolve) => {
      new THREE.TextureLoader().load(img, (texture) => {
        this.texture = texture
        this.texture.magFilter = THREE.NearestFilter;
        this.texture.minFilter = THREE.NearestFilter;
        resolve(texture)
      })
    })
  }
  setPosition({ x = 0, y = 0, z = 0 }) {
    this.position.set(
      this.origin.x + x, 
      this.origin.y - y, 
      z
    )
  }
  // update({ y }) {
  //   this.position.y = this.origin.y - y
  // }
  // set x(value) {
  //   this.position.x = this.origin.x + value
  // }
  // set y(value) {
  //   this.position.y = this.origin.y - value
  // }
  // get y() {
  //   return this.position.y
  // }
}