const items = document.querySelectorAll('.item')

let index = 0
let current = items[index]
let next = items[index + 1]

current.classList.add('current')

setInterval(() => {
  TweenMax.to(current, 0.12, {
    y: -50,
    ease: Quad.easeOut,
    onComplete() {
      current.classList.remove('current')
    }
  })
  TweenMax.fromTo(next, 1, {
    y: 20
  }, {
    y: 0,
    ease: Elastic.easeOut,
    delay: 0.2,
    onStart() {
      next.classList.add('current')
    },
    onComplete() {
      if(index >= items.length - 1) {
        index = 0
        current = items[index]
        next = items[index + 1]
      } else {
        index += 1
    
        if(index === 2) {
          current = items[index]
          next = items[0]
        } else {
          current = items[index]
          next = items[index + 1]
        }
      }
    
      console.log(index)
    }
  })
}, 5000)