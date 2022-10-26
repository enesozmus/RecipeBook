import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {

  // recipe.list.component 'den gelecek datayı karşılar
  // kendi template'ine basar
  //  <app-recipe-item></app-recipe-item>   'a bak
  @Input('recipeInputTransporter') recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }

  /*
    bu bilgi başka bir yere gidecek
    RecipeListComponent'e taşınacak... oradan da RecipesComponent'e taşınacak
    <app-recipe-item></app-recipe-item>    'a bak
    @Output('recipeLinkSelected1') recipeSelected = new EventEmitter<void>();

    onSelected() {
      this.recipeSelected.emit();
    }

    _______________
    <app-recipe-item></app-recipe-item>
    (recipeLinkSelected1)="onRecipeSelected(recipe)"

    // bize RecipeItemComponent'den gelen bilgi RecipesComponent'e taşınacak
    @Output('recipeLinkSelected2') recipeWasSelected = new EventEmitter<Recipe>();
    onRecipeSelected(recipe: Recipe) {
      this.recipeWasSelected.emit(recipe);
    }
  }
  */
}
