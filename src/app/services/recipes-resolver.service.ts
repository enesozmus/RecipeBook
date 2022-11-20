import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../models/recipe.model';

import * as fromApp from '../ngrx/reducers/app.reducer';
import * as RecipesActions from '../ngrx/actions/recipe.actions';


@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<{ recipes: Recipe[] }> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => { return recipesState.recipes }),
      switchMap(recipes => {
        if (recipes.length === 0)
        {
          this.store.dispatch(RecipesActions.fetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.setRecipes),
            take(1)
          );
        }
        else
        {
          return of({ recipes });
        }
      })
    );
  }

}
