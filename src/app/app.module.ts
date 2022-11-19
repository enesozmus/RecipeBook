import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './ngrx/reducers/shopping-list.reducer';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    //RecipesModule, ShoppingModule, AuthModule
    SharedModule,
    /**
     * We added NgRx to our application by including the StoreModule and calling .forRoot.
     * .forRoot then needs a map, an object that tells NgRx which reducers we have in our application.
     * A reducer is just a function.
     */
    StoreModule.forRoot({ shoppingList: shoppingListReducer })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
