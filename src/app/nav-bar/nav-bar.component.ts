import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../ngrx/reducers/app.reducer';
import * as AuthActions from '../ngrx/actions/auth.actions';
import * as RecipeActions from '../ngrx/actions/recipe.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean = false;
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {
  }

  //
  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .pipe(
        map(authState => authState.user)).subscribe({
          next: (user) => {
            this.isAuthenticated = !!user;
          }
        });
  }

  //
  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(RecipeActions.storeRecipes());
  }

  //
  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(RecipeActions.fetchRecipes());
  }

  //
  onLogout() {
    // this.authService.logout();
    this.store.dispatch(AuthActions.logout());
  }

  //
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
