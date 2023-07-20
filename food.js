import { onSnake,expandSnake } from "./snake.js"
import { randomGridPosition } from "./grid.js"
import { spawnWall, onWall } from "./wall.js"
import { setFoodPosition } from "./gameState.js";


let food = getRandomFoodPosition()
setFoodPosition(food)
export let COLLECTED_FOOD = 0
const EXPANSION_RATE = 3
let eatSound = document.getElementById("eat-apple")

export function update(){
   if (onSnake(food)) {
      COLLECTED_FOOD += 1
      if(COLLECTED_FOOD % 2 != 0){
         spawnWall()
      }
      playSound()
      expandSnake(EXPANSION_RATE)
      food = getRandomFoodPosition()
      setFoodPosition(food);
   }
}

function playSound(){
   eatSound.pause()
   eatSound.currentTime = 0
   eatSound.play()
}

export function restart(){
   COLLECTED_FOOD = 0
   food = getRandomFoodPosition()
   setFoodPosition(food)
}

export function draw(gameBoard){
   const foodElement = document.createElement('div')
   foodElement.style.gridRowStart = food.y
   foodElement.style.gridColumnStart = food.x
   foodElement.classList.add('food')
   gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
   let newFoodPosition
   while(newFoodPosition == null || onSnake(newFoodPosition) || onWall(newFoodPosition)){
      newFoodPosition = randomGridPosition()
   }
   return newFoodPosition
}