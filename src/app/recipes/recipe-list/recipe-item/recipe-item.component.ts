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
  @Input() index: number;
}
