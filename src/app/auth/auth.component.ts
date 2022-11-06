import { Component, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IAuthResponse } from '../interfaces/auth-response';
import { AuthService } from '../services/auth.service';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../directives/placeholder.directive';

/**
 * Herhangi bir Firebase Gerçek Zamanlı Veritabanı URL'sini REST uç noktası olarak kullanabilirsiniz.
 * Tek yapmanız gereken URL'nin sonuna .json eklemek ve favori HTTPS istemcinizden bir istek göndermek.
 */

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  isLoadingMode: boolean = false;
  // *ngIf="errorMessages"
  errorMessages: string = null;
  // Dynamic Component Loader
  @ViewChild(PlaceholderDirective, { static: true })
  alertHost: PlaceholderDirective;
  private closeSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    public viewContainerRef: ViewContainerRef
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    // console.log(authForm);
    // console.log(authForm.form);
    // console.log(authForm.form.value);
    this.isLoadingMode = true;
    if (!authForm.valid) {
      return;
    }
    let authObservable: Observable<IAuthResponse>;
    const email = authForm.value.email;
    const password = authForm.value.password;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe({
      next: (responseData) => {
        console.log(responseData);
        this.isLoadingMode = false;
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessages = err;
        this.showErrorAlert(err);
        this.isLoadingMode = false;
      },
    });
  }

  onHandleError() {
    this.errorMessages = null;
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
    this.closeSubs = alertComponentRef.instance.close.subscribe(() => {
      this.closeSubs.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSubs) {
      this.closeSubs.unsubscribe();
    }
  }
}
