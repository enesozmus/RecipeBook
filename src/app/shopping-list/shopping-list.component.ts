import { Component } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Lemons', 10),
    new Ingredient('Cherries', 15),
    new Ingredient('Tangerines', 20)
  ];

  onIngredientAdded($event: Ingredient) {
    this.ingredients.push($event);
  }

}
