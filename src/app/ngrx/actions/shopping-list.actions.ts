/**
 * Actions are one of the main building blocks in NgRx.
 * Actions are the inputs and outputs of many systems in NgRx.
 * Actions express unique events that happen throughout your application.
 * From user interaction with the page, external interaction through network requests, and direct interaction with device APIs, these
 * ...and more events are described with actions.
 */

/**
 * An 'Action' in NgRx is made up of a simple interface.
 * The interface has a single property, the type, represented as a string.
 * The type property is for describing the action that will be dispatched in your application.
 * The value of the type is used to provide a context of what category of action it is,
 * ...and where an action was dispatched from. 
 * 
 * 
        interface Action {
        type: string;
        }
 */

/**
 * Upfront
 *  → write actions before developing features to understand and gain a shared knowledge of the feature being implemented.
 * Divide
 *  → categorize actions based on the event source.
 * Many
 *  → actions are inexpensive to write, so the more actions you write, the better you express flows in your application.
 * Event-Driven
 *  → capture events not commands as you are separating the description of an event and the handling of that event.
 * Descriptive
 *  → provide context that are targeted to a unique event with more detailed information you can use to aid in debugging with the developer tools.
 */

/*

export const login = createAction(
    '[Login Page] Login',
    props<{ username: string; password: string }>()
);

export const setScores = createAction(
    '[Scoreboard Page] Set Scores',
    props<{game: Game}>()
);

onSubmit(username: string, password: string) {
    store.dispatch(login({ username: username, password: password }));
}

*/

import { Action, createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/models/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    // payload: Ingredient;
    constructor(public payload: Ingredient) {}
}

export const ADD_INGREDIENT2 = createAction(
    'ADD_INGREDIENT2',
    props<{ ingredient: Ingredient }>()
);