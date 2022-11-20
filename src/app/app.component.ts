import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './ngrx/reducers/app.reducer';
import * as AuthActions from './ngrx/actions/auth.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(AuthActions.autoLogin());
  }
  
}
