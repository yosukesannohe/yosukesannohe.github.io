let width = window.innerWidth
let height = window.innerHeight

const O = {}

async function initialize() {
  const texture = load('i.jpg')

  O.texture = await texture

  console.log(O.texture)

  O.scene = new THREE.Scene()
  O.renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas')
  })
  O.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)

  O.geometry = new THREE.PlaneBufferGeometry(1, 1, 10, 10)
  O.material = new THREE.ShaderMaterial({
    // wireframe: true,
    uniforms: {
      texture: {
        type: 't',
        value: O.texture
      },
      t: {
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
  
  // O.geometry.addAttribute('ratio', new THREE.BufferAttribute(ratio, 1));
  
  console.log(O.geometry)

  // let n = 0
  const ns = []
  for(let i = 0; i <= O.geometry.parameters.widthSegments; i++) {
    for(let j = 0; j <= O.geometry.parameters.heightSegments; j++) {
      // n = i * j
      ns.push(i)
      console.log(ns)
    }
  }

  O.geometry.addAttribute('n', new THREE.BufferAttribute(new Float32Array(ns), 1));
  
  
  O.mesh = new THREE.Mesh(O.geometry, O.material)

  O.clock = new THREE.Clock()


  // renderer
  O.renderer.setSize(width, height)
  O.renderer.setPixelRatio(window.devicePixelRatio)

  // camera
  O.camera.position.set(0, 0, 2)

  // mesh
  O.mesh.rotation.y = Math.PI / 4

  // scene
  O.scene.add(O.mesh)

  render()
}

// load
function load(img) {
  return new Promise((resolve) => {
    new THREE.TextureLoader().load(img, (texture) => {
      resolve(texture)
    })
  })
}

// render
function render() {
  O.material.uniforms.t.value = O.clock.getElapsedTime()
  O.renderer.render(O.scene, O.camera)
  requestAnimationFrame(render)
}


initialize()