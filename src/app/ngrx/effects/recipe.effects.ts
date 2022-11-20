import { Injectable } from "@angular/core";
import * as RecipesActions from '../actions/recipe.actions';
import * as fromApp from '../reducers/app.reducer';
import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { Recipe } from "src/app/models/recipe.model";

@Injectable()
export class RecipeEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }

    fetchRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.fetchRecipes),
            switchMap(() => {
                return this.http.get<Recipe[]>(
                    'https://ng-complete-guide-82c28-default-rtdb.firebaseio.com/recipes.json'
                );
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            map(recipes => {
                return RecipesActions.setRecipes({ recipes });
            })
        )
    );


    storeRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.storeRecipes),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipesState]) => {
                return this.http.put(
                    'https://ng-complete-guide-82c28-default-rtdb.firebaseio.com/recipes.json',
                    recipesState.recipes
                );
            })
        ),
        { dispatch: false }
    );

}