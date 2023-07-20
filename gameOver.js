import {getTop10, addScore, getHighestScore} from "./backend/fetch.js"

const yourScoreElement = document.getElementById('your-score')
const highestScoreElement = document.getElementById('highest-score')
const newHighScore = document.getElementById('new-high-score')
const gameOverSound = document.getElementById('game-over-sound')
const newHighScoreSound = document.getElementById('new-record-sound')
export const gameOverElement = document.getElementById('game-over')
const usernameContainer = document.getElementById('username-container');
const usernameInput = document.getElementById('username-input');
const replayButton = document.getElementById('replay-button');
const scoreContainer = document.getElementById('score-container');
const leaderboardButton = document.getElementById('leaderboard-button');
const gameOverContent = document.getElementById('game-over-content');
const saveButton = document.getElementById('save-button');
const backButton = document.getElementById('back-button')
const leaderboardContainer = document.getElementById('leaderboard-container')
let score = 0
let highestScore = 0



export function showGameOverMenu(COLLECTED_FOOD) {
   hideAllElements();
   score = COLLECTED_FOOD
   gameOverSound.play()
   gameOverElement.classList.add('show')
   getHighestScore()
      .then(res=>{
         highestScore = res[0].score
         showUsernameInput();
      })
      .catch(err => {
         console.error("Error: ", err)
      });
}

function showLeaderboard() {
   leaderboardContainer.classList.remove('hidden');
}

function hideLeaderboard() {
   leaderboardContainer.classList.add('hidden')
}

function showUsernameInput() {
   usernameContainer.classList.remove('hidden');
 }
 
 function showScores() {
   scoreContainer.classList.remove('hidden');
 }
 
 function showButtons() {
   replayButton.classList.remove('hidden');
   leaderboardButton.classList.remove("hidden");
 }

export function hideAllElements() {
   usernameContainer.classList.add('hidden');
   scoreContainer.classList.add('hidden');
   replayButton.classList.add('hidden');
   leaderboardButton.classList.add("hidden")
 }

saveButton.addEventListener('click', function() {
   const username = usernameInput.value
   addScore(username,score)
   hideAllElements();
   showScores();
   showButtons();
   if(score > highestScore){
      newHighScore.textContent = "NEW HIGH SCORE!!!"
      highestScore = score
      newHighScoreSound.play()
   }else{
      newHighScore.textContent = null
   }
   yourScoreElement.textContent = `Your score: ${score}`
   highestScoreElement.textContent = `Highest score: ${highestScore}`
});

leaderboardButton.addEventListener('click', function() {
   const top10List = document.getElementById('top-10-list')
   top10List.innerHTML = '';
   getTop10()
   .then(res => {
      console.log(res);
      res.forEach((entry,index) => {
         console.log('a')
         const listItem = document.createElement('li');
         listItem.textContent = `${index+1}.  ${entry.name}: ${entry.score}`;
         top10List.appendChild(listItem);
      });
      hideAllElements();
      showLeaderboard();
   })
   .catch(error => {
      console.error('Error:', error);
    });
})

backButton.addEventListener('click', function() {
   hideLeaderboard();
   showScores();
   showButtons();
})