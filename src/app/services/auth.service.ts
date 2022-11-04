import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, BehaviorSubject, tap, throwError } from 'rxjs';
import { IAuthResponse } from '../interfaces/auth-response';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

/** BehaviorSubject
 * Compare it with the subscription to a newspaper: 
 *  → After subscribing at a certain point in time X, the first edition you will get will be the one published after X.
 *  → This is how a normal 'Subject' works.
 * 
 * ♫ If the subscription works like the one to a BehaviorSubject,
 *    → you would get the latest edition that was published before X, instantly at the moment you are subscribing.
 * 
 * . BehaviorSubject needs to be initialized with a starting value.
 */




  // This will inform all places in the application about when authenticated user changes.
  // We can subscribe and we'll get information whenever new data is emitted.
  // → user = new Subject<User>();
  
  // We can call next, to emit a value and we can subscribe to it to be informed about new values.
  // It also gives subscribers immediate access to the previously emitted value
  // even if they haven't subscribed at the point of time that value was emitted.
  // That means we can get access to be currently active user even if we only subscribe after that user has been emitted.

  /**
   * When we want to fetch data and need token at a certain point in time X
   *    → even if the user logged in before X,
   *  we can get access to that latest user.
   */
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http
      .post<IAuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASvkp07VMmk1sd6b-j_V2n_q6_ohycfiU',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        /**
         * if you remember, 'tap' was an operator
         * that allows us to perform some action without changing the response.
         */
        tap(response => { this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn) })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<IAuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASvkp07VMmk1sd6b-j_V2n_q6_ohycfiU',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(response => { this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn) })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleError(httpErrorResponse: HttpErrorResponse) {

    let errorMessage = 'An unknown error occured!';

    if (!httpErrorResponse.error || !httpErrorResponse.error.error)
    {
      return throwError(() => new Error(errorMessage));
    }

    switch (httpErrorResponse.error.error.message)
    {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.'
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.'
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
      default:
        break;
    }

    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number)
  {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }
}
