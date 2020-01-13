const app = new PIXI.Application({ backgroundColor: 0x1099bb });


let isDragging = false
let data = null

const block = PIXI.Sprite.from('AW836RtCQAANp_q.jpg')
block.width = 400
block.height = 200

const bunny = PIXI.Sprite.from('M044a.jpg')
bunny.width = 30
bunny.height = 30
// bunny.anchor.set(0.5)

const bar = PIXI.Sprite.from('M044a.jpg')
bar.width = 300
bar.height = 10
bar.anchor.set(0.5)
bar.x = app.screen.width / 2
bar.y = 500
bar.interactive = true

bar
  .on('pointerdown', onDragStart)
  .on('pointerup', onDragEnd)
  .on('pointerupoutside', onDragEnd)
  .on('pointermove', onDragMove);

let originX = 0
function onDragStart(e) {
  console.log(e)
  isDragging = true
  data = e.data
  if(!originX) {
    console.log(data.getLocalPosition(this.parent))
    const pos = data.getLocalPosition(this.parent)
    console.log(bar.x, pos.x)
    originX = pos.x - bar.x
  }
}

function onDragEnd(e) {
  // console.log(e)
  isDragging = false
  originX = 0
}

function onDragMove(e) {
  if(isDragging) {
    const pos = data.getLocalPosition(this.parent)
    // const x = bar.width / 2 - pos.x
    // console.log(x)
    const x = pos.x - originX

    if(x + bar.width / 2 > 800) {
      return
    } else if(x - bar.width / 2 < 0) {
      return
    } else {
      bar.x = x
    }

    
    // console.log(data.getLocalPosition(this.parent))
  }
}


document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

container.addChild(bunny)
container.addChild(bar)

container.addChild(block)

let vx = 3
let vy = 10
let h = 'right'
let v = 'down'

console.log(bunny.getBounds())

app.ticker.add((delta) => {
  const ballBounds = bunny.getBounds()
  const barBounds = bar.getBounds()
  const blockBounds = block.getBounds()

  // ブロックとボールの当たり判定（下辺）
  if(ballBounds.top < blockBounds.bottom && v === 'up' && ballBounds.x < blockBounds.right) {
    vy *= -1
    v = 'down'
  }

  // ブロックとボールの当たり判定（右辺）
  // if(ballBounds.left < blockBounds.right && h === 'left' && ballBounds.top < blockBounds.height) {
  //   vx *= -1
  //   h = 'right'
  // }

  // バーとボールの当たり判定
  if(ballBounds.bottom > barBounds.top && v === 'down' && ballBounds.x + ballBounds.width / 2 > barBounds.x && ballBounds.x < barBounds.right) {
    vy *= -1
    v = 'up'
  }

  // 全体との当たり判定
  if(bunny.x >= 800 - bunny.width && h === 'right') {
    vx *= -1
    h = 'left'
  }

  if(bunny.x <= 0 && h === 'left') {
    vx *= -1
    h = 'right'
  }

  if(bunny.y >= 600 - bunny.height && v === 'down') {
    vy *= -1
    v = 'up'
  }

  if(bunny.y <= 0 && v === 'up') {
    vy *= -1
    v = 'down'
  }

  bunny.x += vx
  bunny.y += vy
});
