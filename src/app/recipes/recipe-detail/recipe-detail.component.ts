import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import * as fromApp from '../../ngrx/reducers/app.reducer';
import * as RecipesActions from '../../ngrx/actions/recipe.actions';
import * as ShoppingListActions from '../../ngrx/actions/shopping-list.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map(params => { return +params['id'] }),
        switchMap(id => { this.id = id; return this.store.select('recipes'); }),
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      ).subscribe(recipe => { this.recipe = recipe; });

  }

  onAddShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(
      ShoppingListActions.addIngredients({ ingredients: this.recipe.ingredients })
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(RecipesActions.deleteRecipe({ index: this.id }));
    this.router.navigate(['/recipes']);
  }
}
