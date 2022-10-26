import { Component, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  // servisden gelecek olan yemek tariflerini[] karşılayacağız
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // servisden gelen yemek tariflerini[] karşıladık
    this.recipes = this.recipeService.getRecipes();
  }
}