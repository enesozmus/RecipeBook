import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../directives/placeholder.directive';

import { Store } from '@ngrx/store';
import * as fromApp from '../ngrx/reducers/app.reducer';
import * as AuthActions from '../ngrx/actions/auth.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode: boolean = true;
  isLoadingMode: boolean = false;
  // *ngIf="errorMessages"
  errorMessages: string = null;
  // Dynamic Component Loader
  @ViewChild(PlaceholderDirective, { static: true }) alertHost: PlaceholderDirective;

  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe({
      next: (state) => {
        this.isLoadingMode = state.loading;
        this.errorMessages = state.authError;
        if (this.errorMessages) {
          this.showErrorAlert(this.errorMessages);
        }
      },
    }
    );
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    this.isLoadingMode = true;
    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;
    if (this.isLoginMode)
    {
      // authObservable = this.authService.login(email, password);
      this.store.dispatch(AuthActions.login({ email, password }));
    }
    else
    {
      //authObservable = this.authService.signUp(email, password);
      this.store.dispatch(AuthActions.signup({ email, password }));
    }
    authForm.reset();
  }

  onHandleError() {
    this.store.dispatch(AuthActions.clearError());
  }

  private showErrorAlert(message: string) {
    /**
     * Dynamic Component Loader
     *  When we want to display some component dynamically, we use it.
     *  Which means it's not always there but it's there once something specific happens in our code.
     *  Dynamic components are essential components which you create dynamically at runtime.
     */
    /**
     * The ViewContainerRef is injected to gain access to the view container of the element that will host the dynamically added component.
     */
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const alertComponentRef = hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);

    alertComponentRef.instance.message = message;
    this.closeSub = alertComponentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  
}
