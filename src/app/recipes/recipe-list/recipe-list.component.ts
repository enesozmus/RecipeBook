import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {

  // bize RecipeItemComponent'den gelen bilgi RecipesComponent'e taşınacak
  @Output('recipeLinkSelected2') recipeWasSelected = new EventEmitter<Recipe>();

  // a demo array
  recipes: Recipe[] = [
    new Recipe('A Test Recipe 1', 'Some placeholder content in a paragraph.', 'https://i.picsum.photos/id/20/130/100.jpg?hmac=Vo0j7kmg9RW7_2zuV7TAgafReyHoPpxe8ldfKdX_-fI'),
    new Recipe('A Test Recipe 2', 'Some placeholder content in a paragraph.', 'https://i.picsum.photos/id/970/130/100.jpg?hmac=3uwo4NUYNikFul-T5B9IGq-MspeTiUCVLeo0aLRrFe8'),
    new Recipe('A Test Recipe 3', 'Some placeholder content in a paragraph.', 'https://i.picsum.photos/id/937/130/100.jpg?hmac=w8jZgcB2b-7JPkFMCJWg9x3F1uVy8oAkHHec_uAW454')
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
