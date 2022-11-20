import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { DataStorageService } from '../services/data-storage.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../ngrx/reducers/app.reducer';
import * as AuthActions from '../ngrx/actions/auth.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) { }

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
    this.dataStorageService.storeRecipes();
  }

  //
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
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
