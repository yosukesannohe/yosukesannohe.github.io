const gui = new dat.GUI()
const content = document.querySelector('.content')

const prop = {
  'speed' : 2
}

gui.add(prop, 'speed', 0, 2, 0.1)

function onResize() {
  const height = content.clientHeight
  document.body.style.height = `${height}px`
}

window.addEventListener('resize', onResize)

window.addEventListener('scroll', function() {
  TweenMax.to(content, prop.speed, {
    y: -window.pageYOffset,
    ease: Power2.easeOut
  })
})

onResize()

var ob = lozad('p', {
  rootMargin: '0% 0% -50%'
})
ob.observe()

new Rellax('img', {
  speed: -2,
  center: true
});