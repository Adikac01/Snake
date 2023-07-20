export function addScore(name, score) {
   fetch('http://localhost:3000/score', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({ name, score })
   })
   .then(response => response.json())
   .then(data => {
     console.log(data);
   })
   .catch(error => {
     console.error('Error:', error);
   });
 }
 
 export function getTop10() {
   return fetch('http://localhost:3000/top10')
   .then(response => response.json())
   .then(data => {
     return data;
   })
   .catch(error => {
     console.error('Error:', error);
   });
 }

 export function getHighestScore() {
  return fetch('http://localhost:3000/highest')
  .then(response => response.json())
   .then(data => {
     return data;
   })
   .catch(error => {
     console.error('Error:', error);
   });
 }