import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../interfaces/auth-response';
import { AuthService } from '../services/auth.service';

/**
 * Herhangi bir Firebase Gerçek Zamanlı Veritabanı URL'sini REST uç noktası olarak kullanabilirsiniz.
 * Tek yapmanız gereken URL'nin sonuna .json eklemek ve favori HTTPS istemcinizden bir istek göndermek.
 */

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  isLoginMode: boolean = true;
  isLoadingMode: boolean = false;
  errorMessages: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    // console.log(authForm);
    // console.log(authForm.form);
    // console.log(authForm.form.value);
    this.isLoadingMode = true;
    if (!authForm.valid)
    {
      return;
    }
    let authObservable: Observable<IAuthResponse>;
    const email = authForm.value.email;
    const password = authForm.value.password;
    if (this.isLoginMode)
    {
      authObservable = this.authService.login(email, password);
    }
    else
    {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
      {
        next: (responseData) =>
        {
          console.log(responseData);
          this.isLoadingMode = false;
          this.router.navigate(['/recipes']);
        },
        error: (err) =>
        {
          console.log(err);
          this.errorMessages = err;
          this.isLoadingMode = false;
        }
      });
  }

}
