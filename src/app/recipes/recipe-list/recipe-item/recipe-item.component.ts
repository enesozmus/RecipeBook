import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

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

  // bu bilgi başka bir yere gidecek
  // RecipeListComponent'e taşınacak... oradan da RecipesComponent'e taşınacak
  // <app-recipe-item></app-recipe-item>    'a bak
  @Output('recipeLinkSelected1') recipeSelected = new EventEmitter<void>();

  onSelected() {
    this.recipeSelected.emit();
  }
}
