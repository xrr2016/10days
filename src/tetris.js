const dpr = window.devicePixelRatio
const canvas = document.getElementById('tetris')
const ctx = canvas.getContext('2d')

ctx.scale(20, 20)

const matrix = [[0, 0, 0], [1, 1, 1], [0, 1, 0]]

function collide(arena, player) {
  const { matrix, pos } = player
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < matrix[y].length; ++x) {
      if (
        matrix[y][x] !== 0 &&
        (arena[y + pos.y] && arena[y + pos.y][x + pos.x]) !== 0
      ) {
        return true
      }
    }
  }
  return false
}

function createMatrix(w, h) {
  const matrix = []
  while (h--) {
    matrix.push(new Array(w).fill(0))
  }
  return matrix
}

function draw() {
  ctx.fillStyle = '#2d2d2d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  drawMatrix(player.matrix, player.pos)
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val) {
        ctx.fillStyle = 'blue'
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1)
      }
    })
  })
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val) {
        arena[y + player.pos.y][x + player.pos.x] = val
      }
    })
  })
}

function playerDrop() {
  player.pos.y++
  if (collide(arena, player)) {
    player.pos.y--
    merge(arena, player)
    player.pos.y = 0
  }
  console.log(player.pos.y)
  dropCounter = 0
}

let dropCounter = 0
let dropInterval = 1000
let lastTime = 0

function updateGame(time = 0) {
  const deltaTime = time - lastTime
  lastTime = time
  dropCounter += deltaTime
  if (dropCounter > dropInterval) {
    playerDrop()
  }
  draw()
  requestAnimationFrame(updateGame)
}

const arena = createMatrix(12, 20)
const player = {
  pos: { x: 5, y: 5 },
  matrix: matrix
}

merge(arena, player)

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 37:
      player.pos.x--
      break
    case 39:
      player.pos.x++
      break
    case 40:
      playerDrop()
      break
    default:
      break
  }
})

updateGame()
