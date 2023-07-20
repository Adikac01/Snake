import { onFood } from "./gameState.js"
import {randomGridPosition} from "./grid.js"
import { onSnake} from "./snake.js"
import { equalPositions } from "./utils.js"
let walls = []

export function spawnWall(){
   walls[walls.length] = {...getRandomWallposition()}
}

export function restart(){
   walls = []
}

function getRandomWallposition() {
   let newWallPosition
   while(newWallPosition == null || onSnake(newWallPosition) || onFood(newWallPosition) || onWall(newWallPosition)){
      newWallPosition = randomGridPosition()
   }
   return newWallPosition
}


export function onWall(position){
   return walls.some(wall=>{
      return equalPositions(wall, position)
   })
}

export function draw(gameBoard){
   walls.forEach(wall=>{
      const wallElement = document.createElement('div')
      wallElement.style.gridRowStart = wall.y
      wallElement.style.gridColumnStart = wall.x
      wallElement.classList.add('wall')
      gameBoard.appendChild(wallElement)
   })
}

