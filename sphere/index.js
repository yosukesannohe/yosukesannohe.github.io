let width = window.innerWidth
let height = window.innerHeight

const O = {}

async function initialize() {
  const texture = load('i.jpg')

  O.texture = await texture

  // O.texture = getTextCanvas('Canvas')
  // O.texture.needsUpdate = true

  console.log(O.texture)

  O.scene = new THREE.Scene()
  O.renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas')
  })
  O.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)

  O.cGeometry = new THREE.CylinderGeometry(1, 1, 1, 24, 1, true, -Math.PI / 2, Math.PI - (Math.PI / 2))
  O.cMaterial = new THREE.MeshBasicMaterial({
    // wireframe: true,
    map: O.texture,
    side: THREE.DoubleSide
  })
  O.cylinder = new THREE.Mesh(O.cGeometry, O.cMaterial)

  O.geometry = new THREE.PlaneBufferGeometry(1, 1, 16, 16)
  O.material = new THREE.ShaderMaterial({
    // wireframe: true,
    uniforms: {
      texture: {
        type: 't',
        value: getTextCanvas('Canvas')
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
      ns.push(i)
      // console.log(ns)
    }
  }

  O.geometry.addAttribute('n', new THREE.BufferAttribute(new Float32Array(ns), 1));
  
  
  O.mesh = new THREE.Mesh(O.geometry, O.material)
  O.mesh.material.uniforms.texture.needsUpdate = true;

  O.clock = new THREE.Clock()


  // renderer
  O.renderer.setSize(width, height)
  O.renderer.setPixelRatio(window.devicePixelRatio)

  // camera
  O.camera.position.set(0, 0, 2)

  // mesh
  O.mesh.rotation.y = Math.PI / 4
  // O.cylinder.position.set(0, 0, -1)
  // O.cylinder.rotation.x = Math.PI / 10

  // scene
  O.scene.add(O.mesh)
  O.scene.add(O.cylinder)

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

// 文字のテクスチャを返す
function getTextCanvas(text) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const fontSize = 48
  canvas.width = 512
  canvas.height = 512
  
  // ctx.scale(2, 2);

  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px Kosugi Maru`
  ctx.fillStyle = '#000'
  ctx.textAlign = 'center';
  ctx.textBaseline = "top";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 - (fontSize / 2))


  const texture = new THREE.CanvasTexture(canvas)
  // texture.needsUpdate = true
  texture.minFilter = THREE.NearestFilter

  return texture
}


// render
function render() {
  O.material.uniforms.t.value = O.clock.getElapsedTime()
  // O.material.uniforms.texture.value.needsUpdate = true;
  O.renderer.render(O.scene, O.camera)
  requestAnimationFrame(render)

  O.cylinder.rotation.y += 0.01
}

initialize()

// const c = getTextCanvas('こんにちは')
// document.body.appendChild(c)