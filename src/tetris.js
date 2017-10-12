const dpr = window.devicePixelRatio
const canvas = document.getElementById('tetris')
const ctx = canvas.getContext('2d')

canvas.width = 320 * dpr
canvas.height = 568 * dpr

ctx.scale(40, 40)

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
]

function draw () {
  ctx.fillStyle = '#2d2d2d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  drawMatrix(player.matrix, player.pos)
}

function drawMatrix (matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val) {
        ctx.fillStyle = 'blue'
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1)
      }
    })
  })
}

function updateGame() {
  draw()
  requestAnimationFrame(updateGame)
}

const player = {
  pos: {x: 10, y: 10},
  matrix: matrix
}

updateGame()















