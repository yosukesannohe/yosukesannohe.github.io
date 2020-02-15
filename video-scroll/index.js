const content = document.querySelector('.content')

function onResize() {
  const height = content.clientHeight
  document.body.style.height = `${height}px`
}

window.addEventListener('resize', onResize)

window.addEventListener('scroll', function() {
  TweenMax.to(content, 2, {
    y: -window.pageYOffset,
    ease: Power2.easeOut
  })
})

onResize()
