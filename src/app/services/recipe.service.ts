import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import * as ShoppingListActions from '../ngrx/actions/shopping-list.actions';
import * as fromShoppingList from '../ngrx/reducers/shopping-list.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  /*
    private recipes: Recipe[] = [
      new Recipe(
        'A Test Recipe 1',
        'Some placeholder content in a paragraph.',
        'https://i.picsum.photos/id/20/130/100.jpg?hmac=Vo0j7kmg9RW7_2zuV7TAgafReyHoPpxe8ldfKdX_-fI',
        [
          new Ingredient('Meat', 1),
          new Ingredient('French Fries', 20),
        ]
      ),
      new Recipe(
        'A Test Recipe 2',
        'Some placeholder content in a paragraph.',
        'https://i.picsum.photos/id/970/130/100.jpg?hmac=3uwo4NUYNikFul-T5B9IGq-MspeTiUCVLeo0aLRrFe8',
        [
          new Ingredient('Meat', 1),
          new Ingredient('Buns', 2),
        ]
      ),
      new Recipe(
        'A Test Recipe 3',
        'Some placeholder content in a paragraph.',
        'https://i.picsum.photos/id/937/130/100.jpg?hmac=w8jZgcB2b-7JPkFMCJWg9x3F1uVy8oAkHHec_uAW454',
        [
          new Ingredient('Apple', 3),
          new Ingredient('Banana', 2),
        ]
      )
    ];
  */
  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();

  constructor(private store: Store<fromShoppingList.AppState>) {

  }

  // yemek tariflerini listele
  getRecipes() {
    // Bir array'in bir bölümünün bir kopyasını döndürür.
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  // yemek tarifine bileşenlerini ekle
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    // this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    this.store.dispatch(ShoppingListActions.addIngredients({ ingredients: ingredients }));
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, selectedRecipe: Recipe) {
    this.recipes[index] = selectedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  //
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
