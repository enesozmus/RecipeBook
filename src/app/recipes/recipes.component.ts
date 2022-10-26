import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  // seçilen recipe render edilmek üzere detail component'ine gidecek
  finallySelectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) { }
  ngOnInit(): void {
    // seçilen yemek tarifi bilgisini servisimizde tutuyoruz.
    // burada o bilgiye abone olup burada seçilen yemek tarifini karşılayacak olan
    // property'e basıyoruz.
    // seçilen recipe render edilmek üzere detail component'ine gidecek
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.finallySelectedRecipe = recipe;
    });
  }



}
