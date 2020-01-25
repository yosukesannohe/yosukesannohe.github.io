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

  const values = []

  const doms = document.querySelectorAll('.sample')

  thumbnails = await Promise.all(Array.prototype.map.call(doms, async (dom, i) => {
    const position = dom.getBoundingClientRect()
    const thumbnail = new Thumbnail()
    await thumbnail.load(`j${i}.jpg`)
    thumbnail.initialize()
    thumbnail.x = position.left
    thumbnail.y = position.top
    
    thumbnail.setPosition({
      x: position.left,
      y: position.top
    })
    values.push({
      y: position.top
    })
    O.scene.add(thumbnail)
    console.log(thumbnail)
    return thumbnail
  }))
  
  O.camera.updateProjectionMatrix();

  O.camera.position.set(0, 0, 1)
  // O.camera.lookAt(0, 0, 0)

  

  window.addEventListener('scroll', () => {
    doms.forEach((dom, i) => {
      const position = dom.getBoundingClientRect()
      const y = position.top

      console.log(y)

      TweenMax.to(values[i], 0.6, {
        y,
        ease: Expo.easeNone,
        onUpdate() {
          thumbnails[i].update({
            y: values[i].y
          })
        }
      })
    })
  })

  document.addEventListener('wheel', (e) => {
    console.log(`e.deltaY: ${e.deltaY}`)
    thumbnails.forEach((thumbnail) => {
      TweenMax.to(thumbnail.mesh.material.uniforms.deltaY, 1, {
        value: e.deltaY,
        ease: Linear.easeNone
      })
    })
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
  requestAnimationFrame(render)
}




initialize()