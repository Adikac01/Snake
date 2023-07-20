let inputDirection = {x:0, y:0}
let lastInputDirection = {x:0,y:0}

window.addEventListener('keydown', e=>{
   switch(e.key){
      case 'w':
      case 'W':
         if(lastInputDirection.y == 0) inputDirection = {x:0, y:-1}
         break
      case 's':
      case 'S':
         if(lastInputDirection.y == 0) inputDirection = {x:0, y:1}
         break
      case 'a':
      case 'A':
         if(lastInputDirection.x == 0) inputDirection = {x:-1, y:0}
         break
      case 'd':
      case 'D':
         if(lastInputDirection.x == 0) inputDirection = {x:1, y:0}
         break
   }
})

export function getInputDirection() {
   lastInputDirection = inputDirection
   return inputDirection;
}

export function restart(){
   inputDirection = {x:0, y:0}
   lastInputDirection = {x:0,y:0}
}