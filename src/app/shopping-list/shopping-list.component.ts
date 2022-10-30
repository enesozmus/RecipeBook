import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    this.igChangeSub =
      this.shoppingListService.ingredientsChanged
        .subscribe((ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        });
  }

  // üzerine tıklandığında update işlemi için kendi bilgilerini forma bassın
  // index'i üzerinden ulaşıyoruz
  onEditItem(index: number) {
    // hangisine tıklanıyorsa onun index değerini servisimizdeki subject'imize atıyoruz
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
