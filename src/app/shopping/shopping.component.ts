import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit, OnDestroy {

  // ingredients: Ingredient[];
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private igChangeSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) { }

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList');

    /*
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub =
      this.shoppingListService.ingredientsChanged
        .subscribe((ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        });
    */
  }

  // üzerine tıklandığında update işlemi için kendi bilgilerini forma bassın
  // index'i üzerinden ulaşıyoruz
  onEditItem(index: number) {
    // hangisine tıklanıyorsa onun index değerini servisimizdeki subject'imize atıyoruz
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    // this.igChangeSub.unsubscribe();
  }

}
