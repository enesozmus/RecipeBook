import * as fromShoppingList from '../reducers/shopping-list.reducer';
import * as fromAuth from '../reducers/auth.reducer';
import * as fromRecipes from '../reducers/recipe.reducer';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
    recipes: fromRecipes.State;
}