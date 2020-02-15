const O = {}
let width = window.innerWidth
let height = window.innerHeight
let thumbnails = []

async function initialize() {
  O.scene = new THREE.Scene()
  O.renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas')
  })
  O.camera = new THREE.OrthographicCamera(
    width / -2, width / 2, height / 2, height / -2, 0.1, 1000
  )

  O.renderer.setSize(width, height)
  O.renderer.setPixelRatio(window.devicePixelRatio)
  O.clock = new THREE.Clock()
  O.container = new THREE.Object3D()

  const values = []

  const doms = document.querySelectorAll('.sample')

  thumbnails = await Promise.all(Array.prototype.map.call(doms, async (dom, i) => {
    const position = dom.getBoundingClientRect()
    const thumbnail = new Thumbnail()
    await thumbnail.load(`j${i}.jpg`)
    thumbnail.initialize()
    
    thumbnail.setPosition({
      x: position.left,
      y: position.top + window.pageYOffset
    })
    values.push({
      y: position.top
    })
    O.container.add(thumbnail)
    console.log(thumbnail)
    return thumbnail
  }))

  O.scene.add(O.container)
  
  O.camera.updateProjectionMatrix();

  O.camera.position.set(0, 0, 1)
  // O.camera.lookAt(0, 0, 0)

  

  window.addEventListener('scroll', () => {
    TweenMax.to(O.container.position, 1, {
      y: window.pageYOffset,
      ease: Expo.easeNone
    })
  })

  const uniforms = {
    deltaY: 0,
    x: 0
  }

  document.body.addEventListener('click', () => {
    TweenMax.to(uniforms, 2, {
      x: uniforms.x ? 0 : 1,
      ease: Expo.easeOut,
      onUpdate() {
        console.log(`uniforms.x: ${uniforms.x}`)
        thumbnails.forEach((thumbnail) => {
          thumbnail.mesh.material.uniforms.x.value = uniforms.x
        })
        
        render()
      }  
    })
  })

  document.addEventListener('wheel', (e) => {
    console.log(`e.deltaY: ${e.deltaY}`)

    const deltaY = e.deltaY
    
    TweenMax.to(uniforms, 1, {
      deltaY: deltaY,
      ease: Linear.easeNone,
      onUpdate() {
        console.log(uniforms.deltaY)
        thumbnails.forEach((thumbnail) => {
          // if(Math.abs(uniforms.deltaY) - 1 <= 0) {
          //   uniforms.deltaY = 0
          // }
          thumbnail.mesh.material.uniforms.deltaY.value = uniforms.deltaY
        })
        
        render()
      }  
    })
    // thumbnails.forEach((thumbnail) => {
    //   TweenMax.to(thumbnail.mesh.material.uniforms.deltaY, 1, {
    //     value: e.deltaY,
    //     ease: Linear.easeNone,
    //     onUpdate: render
    //   })
    // })
  })

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
  // thumbnails.forEach(thumbnail => {
  //   thumbnail.mesh.material.uniforms.time.value = O.clock.getElapsedTime()
  // })
  O.renderer.render(O.scene, O.camera)
  // requestAnimationFrame(render)
}




initialize()