import { getInputDirection } from "./input.js"
import { onWall } from "./wall.js"
import { equalPositions } from "./utils.js"

export const SNAKE_SPEED = 15

let snakeBody = [
   {x:8, y:8}
]
let newSegments = 0

export function restart(){
   snakeBody = [{x:8,y:8}]
}

export function update(){
   addSegments()
   const inputDirection = getInputDirection()
   for(let i = snakeBody.length - 2; i >=0; i--){
      snakeBody[i+1] = { ...snakeBody[i]}
   }

   snakeBody[0].x += inputDirection.x
   snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard){
   snakeBody.forEach(segment=>{
      const snakeElement = document.createElement('div')
      snakeElement.style.gridRowStart = segment.y
      snakeElement.style.gridColumnStart = segment.x
      snakeElement.classList.add('snake')
      gameBoard.appendChild(snakeElement)
   })

   const snakeHead = gameBoard.querySelector('.snake')
   snakeHead.style.background = 'hsl(250,100%,50%)'
}

export function expandSnake(ammount) {
   newSegments += ammount
}


export function onSnake(position, {ignoreHead = false} = {}){
   return snakeBody.some((segment,index )=>{
      if (ignoreHead && index == 0) return false
      return equalPositions(segment,position)
   })
}

export function getSnakeHead(){
   return snakeBody[0]
}

export function snakeIntersection(){
   return onSnake(snakeBody[0], {ignoreHead:true}) || onWall(snakeBody[0])
}

function addSegments() {
   for(let i = 0; i < newSegments; newSegments--){
      snakeBody.push({...snakeBody[snakeBody.length-1]})
   }
}