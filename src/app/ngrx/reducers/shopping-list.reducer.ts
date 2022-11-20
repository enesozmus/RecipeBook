/**
 * Reducers in NgRx are responsible for handling transitions from one state to the next state in your application.
 * Reducer functions handle these transitions by determining which actions to handle based on the action's type.
 *      1. An interface or type that defines the shape of the state.
 *      2. The arguments including the initial state or current state and the current action.
 *      3. The functions that handle state changes for their associated action(s).
 */

/**
 * You define the shape of the state according to what you are capturing,
 * ...whether it be a single type such as a number, or a more complex object with multiple properties.
 */

/**
 * The initial state gives the state an initial value, or provides a value if the current state is undefined.
 * You set the initial state with defaults for your required state properties.
 * Create and export a variable to capture the initial state with one or more default values.
 * It should be a JavaScript object.
 */

import { Ingredient } from "../../models/ingredient.model";
import * as ShoppingListActions from '../actions/shopping-list.actions';
import { createReducer, on, Action } from "@ngrx/store";

export interface State {
  ingredients: Ingredient[];
  editIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Lemons', 10),
    new Ingredient('Cherries', 15),
    new Ingredient('Tangerines', 20),
    new Ingredient('Apricots', 25)
  ],
  editIndex: -1
};

/**
 * Let's get started by implementing a reducer.
 * Here, we should export a function and define an initialState.
 *    → Each reducer function is a listener of actions.
 *    → The reducer function's responsibility is to handle the state transitions in an immutable way.
 * Now, we can set that initialState by giving this first argument in that function.
 */


const _shoppingListReducer = createReducer(

  initialState,

  on(
    ShoppingListActions.addIngredient,
    (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(action.ingredient)
    })
  ),

  on(
    ShoppingListActions.addIngredients,
    (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(...action.ingredients)
    })
  ),

  on(
    ShoppingListActions.updateIngredient,
    (state, action) => ({
      ...state,
      editIndex: -1,
      ingredients: state.ingredients.map(
        (ingredient, index) => index === state.editIndex ? { ...action.ingredient } : ingredient
      )
    })
  ),

  on(
    ShoppingListActions.deleteIngredient,
    (state) => ({
      ...state,
      editIndex: -1,
      ingredients: state.ingredients.filter(
        (_, index) => index !== state.editIndex
      )
    })
  ),

  on(
    ShoppingListActions.startEdit,
    (state, action) => ({
      ...state, editIndex:
        action.index
    })
  ),

  on(
    ShoppingListActions.stopEdit,
    (state) => ({
      ...state, editIndex: -1
    })
  )

);


export function shoppingListReducer(state: State, action: Action) {
  return _shoppingListReducer(state, action);
}
