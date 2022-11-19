import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import * as ShoppingListActions from '../../ngrx/actions/shopping-list.actions';
import * as fromShoppingList from '../../ngrx/reducers/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('editFormTD', { static: false }) editFormTD: NgForm;
  // memory leak
  subscription: Subscription;
  // button name
  editMode: boolean = false;
  // editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit(): void {

    this.subscription = this.store.select('shoppingList').subscribe({
      next: (state) => {
        const index = state.editIndex;
        if (index > -1)
        {
          this.editMode = true;
          this.editedItem = state.ingredients[index];
          this.editFormTD.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } 
        else
        {
          this.editMode = false;
        }
      }
    });

    /*
    this.subscription = this.shoppingListService.startedEditing.subscribe({
      next: (index) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editFormTD.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    }
    );
  */
  }

  onSubmitForAddorUpdate(editFormTD: NgForm) {
    const value = editFormTD.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient); 
      this.store.dispatch(ShoppingListActions.updateIngredient({ ingredient }));
    }
    else {
      // this.shoppingListService.addIngredient(newingredient);
      // this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.store.dispatch(ShoppingListActions.addIngredient({ ingredient: this.editFormTD.value }));
      this.store.dispatch(ShoppingListActions.addIngredient({ ingredient }));
    }

    this.editMode = false;
    editFormTD.reset();
  }

  onClear() {
    this.editFormTD.reset();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.stopEdit());
  }
}
