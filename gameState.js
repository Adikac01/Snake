let foodPosition = null;
import { equalPositions } from "./utils.js"


export function setFoodPosition(position) {
   foodPosition = position;
}

export function getFoodPosition() {
   return foodPosition;
}

export function onFood(position) {
   return equalPositions(foodPosition, position);
}