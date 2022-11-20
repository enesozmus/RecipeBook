import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShoppingComponent } from './shopping.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromShoppingList from '../ngrx/reducers/shopping-list.reducer';

@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingEditComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ShoppingComponent },
    ]),
    StoreModule.forFeature('shoppingList', fromShoppingList.shoppingListReducer)
  ],
})
export class ShoppingModule { }
