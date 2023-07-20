import { SNAKE_SPEED , update as updateSnake, draw as drawSnake, snakeIntersection, getSnakeHead, restart as restartSnake} from "./snake.js";
import { draw as drawFood, update as updateFood, COLLECTED_FOOD, restart as restartFoodAndScore} from "./food.js";
import { outsideGrid } from "./grid.js";
import { restart as restartInput } from "./input.js";
import {draw as drawWalls, restart as  restartWalls} from "./wall.js";
import { showGameOverMenu, gameOverElement, hideAllElements } from "./gameOver.js";

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')
let scoreBoard = document.getElementById('score')
const replayButton = document.getElementById('replay-button')


function main(currentTime){
   if(gameOver){
      showGameOverMenu(COLLECTED_FOOD)
      gameOver = false
      return;
   }
   window.requestAnimationFrame(main);
   const secondsSinceLastRender = (currentTime -lastRenderTime) / 1000;
   if(secondsSinceLastRender < 1 / SNAKE_SPEED) return
   lastRenderTime = currentTime

   update()
   draw()
}

window.requestAnimationFrame(main)

function update(){
   updateSnake()
   updateFood()
   checkDeath()
   scoreBoard.innerText = `Score: ${COLLECTED_FOOD}`
}

function draw(){
   gameBoard.innerHTML = ''
   drawSnake(gameBoard)
   drawFood(gameBoard)
   drawWalls(gameBoard)
}

function checkDeath(){
   gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

function restartGame() {
   restartFoodAndScore()
   restartSnake()
   restartInput()
   restartWalls()
   gameOverElement.classList.remove('show')
   window.requestAnimationFrame(main)
}

replayButton.addEventListener('click', restartGame);
