import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  /**
   * It needs to implement the resolve interface.
   * Resolve is a generic interface which means we need to define which type of data it will resolve in the end
   * 
   * Resolve<>
   *    → An interface that classes can implement to be a data provider.
   *    → A data provider class can be used with the router to resolve data during navigation.
   *    → The interface defines a `resolve()` method that is invoked when the navigation starts.
   *    → The router waits for the data to be resolved before the route is finally activated.
   */
  constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0)
    {
      return this.dataStorageService.fetchRecipes();
    }
    else
    {
      return recipes;
    }
  }

  //: Recipe[] | Observable<Recipe[]> | Promise<Recipe[]>
}
