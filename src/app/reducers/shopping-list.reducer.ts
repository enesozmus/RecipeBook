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
 *    → Each reducer function is a listener of actions.
 *    → The reducer function's responsibility is to handle the state transitions in an immutable way.
 */

/**
 * You define the shape of the state according to what you are capturing,
 * ...whether it be a single type such as a number, or a more complex object with multiple properties.
 */

import { Ingredient } from "../models/ingredient.model";
import { Action } from "@ngrx/store";

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

export function shoppingListReducer(state = initialState, action: Action) {

  /**
   * Now, to check different kinds of possible actions, you could add multiple if statements and run different codes depending on which action you have.
   * Or since you have multiple possible conditions, you can use a switch case statement.
   */
   switch (action.type) {
    case 'ADD_INGREDIENT':
      /**
       * So never touch the existing state.
       * Instead return a new object which will replace the old state
       * and make sure you haven't lost all the old data.
       * copy the old state with the spread operator (...)
       *  → It essentially pulls out all the properties of the old state and adds these properties to this new object.
       *  → We have a new object with the old data and hence we have a copy of the old state.
       *  → return {...state}
       */
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      };
  }
}