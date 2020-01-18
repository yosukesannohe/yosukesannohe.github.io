let width = window.innerWidth
let height = window.innerHeight

const O = {}

async function initialize() {
  const texture = load('j.jpg')
  // const texture2 = load('j.jpg')
  // const spectrum = load('block_white.png')
  // const spectrum = load('line.png')
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;

  O.texture = await texture
  // O.texture2 = await texture2
  // O.spectrum = await spectrum

  // O.texture = getTextCanvas('三戸')
  // O.spectrum = getTextCanvas('龍')
  // O.texture.needsUpdate = true

  console.log(O.texture)

  O.scene = new THREE.Scene()
  O.renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas')
  })
  O.camera = new THREE.PerspectiveCamera(45, width / height, 1, 100)
  // O.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

  

  O.geometry = new THREE.PlaneBufferGeometry(2, 2)
  O.material = new THREE.ShaderMaterial({
    // wireframe: true,
    uniforms: {
      texture: {
        type: 't',
        // value: getTextCanvas('Canvas')
        value: O.texture
      },
      // texture2: {
      //   type: 't',
      //   // value: getTextCanvas('Canvas')
      //   value: O.texture2
      // },
      time: {
        type: 'f',
        value: 0.0
      },
      y: {
        type: 'f',
        value: 0.0
      },
      // spectrum: {
      //   type: 't',
      //   value: O.spectrum
      // },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      },
      imageResolution: {
        value: new THREE.Vector2(1280, 800)
      },
      mouse: {
        value: new THREE.Vector2(0.5, 0.5)
      },
      transition: {
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
  // O.camera.position.set(0, 0, 1)

  // mesh
  // O.mesh.rotation.x = Math.PI / 4

  // scene
  O.scene.add(O.mesh)

  O.camera.updateProjectionMatrix();

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
// function getTextCanvas(text) {
//   const canvas = document.createElement('canvas')
//   const ctx = canvas.getContext('2d')
//   const fontSize = 256
//   canvas.width = 512
//   canvas.height = 512
  
//   // ctx.scale(2, 2);

//   ctx.fillStyle = 'rgb(255, 255, 255)';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   ctx.font = `${fontSize}px Kosugi Maru`
//   ctx.fillStyle = '#000'
//   ctx.textAlign = 'center';
//   ctx.textBaseline = "top";
//   ctx.fillText(text, canvas.width / 2, canvas.height / 2 - (fontSize / 2))


//   const texture = new THREE.CanvasTexture(canvas)
//   // texture.needsUpdate = true
//   texture.minFilter = THREE.NearestFilter

//   return texture
// }


// render
function render() {
  O.material.uniforms.time.value = O.clock.getElapsedTime()
  // O.material.uniforms.texture.value.needsUpdate = true;
  O.renderer.render(O.scene, O.camera)
  requestAnimationFrame(render)

}

document.addEventListener('mouseenter', () => {
  TweenMax.to(O.material.uniforms.transition, 3, {
    value: 1.0,
    ease: Expo.easeOut
  })
})

document.addEventListener('mouseleave', () => {
  TweenMax.to(O.material.uniforms.transition, 3, {
    value: 0.0,
    ease: Expo.easeOut
  })
})

document.addEventListener('mousemove', (e) => {
  const mouse = {
    x: 0,
    y: 0
  }
  const x = (e.pageX * 2 - window.innerWidth / 2) / window.innerWidth
  const y = (window.innerHeight - e.pageY) / window.innerHeight

  TweenMax.to(mouse, 10, {
    x: x,
    y: y,
    ease: Expo.easeOut,
    onUpdate() {
      O.material.uniforms.mouse.value = new THREE.Vector2(x, y)
    }
  })
  // O.material.uniforms.mouse.value = new THREE.Vector2(x, y)
})

initialize()