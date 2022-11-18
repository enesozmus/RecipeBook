/**
 * Reducers in NgRx are responsible for handling transitions from one state to the next state in your application.
 * Reducer functions handle these transitions by determining which actions to handle based on the action's type.
 *      1. An interface or type that defines the shape of the state.
 *      2. The arguments including the initial state or current state and the current action.
 *      3. The functions that handle state changes for their associated action(s).
 */

/**
 * Let's get started by implementing a reducer.
 * Here, we should export a function and define an initialState.
 */

import { Ingredient } from "../models/ingredient.model";

/**
 * The initial state gives the state an initial value, or provides a value if the current state is undefined.
 * You set the initial state with defaults for your required state properties.
 * Create and export a variable to capture the initial state with one or more default values.
 * It should be a JavaScript object.
 */

export const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Lemons', 10),
    new Ingredient('Cherries', 15),
    new Ingredient('Tangerines', 20),
    new Ingredient('Apricots', 25)
  ]
};

// Now we can set that initialState by giving this first argument in that function.

export function shoppingListReducer(state = initialState, action) {

}