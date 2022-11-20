/**
 * Effects are an RxJS powered side effect model for Store.
 * Effects use streams to provide new sources of actions to reduce state based on external interactions
 * ... such as network requests, web socket messages and time-based events.
 * Side effects are basically parts in your code where you run some logic, but that's not so important for the immediate update of the current state.
 * NgRx effects is a package that gives us tools for elegantly working with side effects between actions which we dispatch and receives.
 * So that we can keep our reducers clean and still have a good place for managing these side effects.
 */

/**
 * In a service-based Angular application, components are responsible for interacting with external resources directly through services.
 * Instead, effects provide a way to interact with those services and isolate them from the components.
 * Effects are where you handle tasks such as fetching data, long-running tasks that produce multiple events, and other external interactions where your components don't need explicit knowledge of these interactions.
 */

/**
 * Effects isolate side effects from components, allowing for more pure components that select state and dispatch actions.
 * Effects are Observables listening for the inputs and piping them through the "prescription".
 * Effects are long-running services that listen to an observable of every action dispatched from the Store.
 * Effects filter those actions based on the type of action they are interested in. This is done by using an operator.
 * Effects perform tasks, which are synchronous or asynchronous and return a new action.
 */

/**
 * To isolate side-effects from your component, you must create an Effects class to listen for events and perform tasks.
 * Effects are injectable service classes with distinct parts:
 *      → An injectable Actions service that provides an observable stream of all actions dispatched after the latest state has been reduced.
 *          → Actions is one big observable that will give you access to all dispatched actions so that you can react to them.
 *      → Metadata is attached to the observable streams using the createEffect function.
 *          → The metadata is used to register the streams that are subscribed to the store.
 *          → Any action returned from the effect stream is then dispatched back to the Store.
 *      → Actions are filtered using a pipeable ofType operator.
 *          → The ofType operator takes one or more action types as arguments to filter on which actions to act upon.
 *      → Effects are subscribed to the Store observable.
 *      → Services are injected into effects to interact with external APIs and handle streams.
 * We need to export a normal class.
 * We organize our effects in classes.
 * We now need to inject something first of all and that something is coming from the ngrx effects package.
 * With that injected, we can register our first effect, our first action handler.
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';

export interface IAuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
    kind: string;
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return AuthActions.authenticateSuccess({ email, userId, token, expirationDate, redirect: true });
}

const handleError = (httpErrorResponse: HttpErrorResponse) => {

    let errorMessage = 'An unknown error occured!';

    if (!httpErrorResponse.error || !httpErrorResponse.error.error) {
        return of(AuthActions.authenticateFail({ errorMessage }));
    }

    switch (httpErrorResponse.error.error.message) {
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

    return of(AuthActions.authenticateFail({ errorMessage }));
}

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }

    //
    authSignup$ = createEffect(() =>
        this.actions$.pipe(
            /**
             * Actions are filtered using a pipeable ofType operator.
             * The ofType operator takes one or more action types as arguments to filter on which actions to act upon.
             * The authSignup$ effect is listening for all dispatched actions through the Actions stream, but is only interested in the '[Auth] Signup Start' event using the ofType operator.
             */
            ofType(AuthActions.signup),
            switchMap(action => {

                return this.http
                    .post<IAuthResponse>(
                        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASvkp07VMmk1sd6b-j_V2n_q6_ohycfiU',
                        {
                            email: action.email,
                            password: action.password,
                            returnSecureToken: true
                        }
                    )
                    .pipe(
                        tap(response => { this.authService.setLogoutTimer(+response.expiresIn * 1000) }),
                        map(response => { return handleAuthentication(+response.expiresIn, response.email, response.localId, response.idToken) }),
                        catchError(error => { return handleError(error) })
                    )
            })
        )
    );

    //
    authLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap(action => {

                return this.http
                    .post<IAuthResponse>(
                        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASvkp07VMmk1sd6b-j_V2n_q6_ohycfiU',
                        {
                            email: action.email,
                            password: action.password,
                            returnSecureToken: true
                        }
                    )
                    .pipe(
                        tap(response => { this.authService.setLogoutTimer(+response.expiresIn * 1000) }),
                        map(response => { return handleAuthentication(+response.expiresIn, response.email, response.localId, response.idToken) }),
                        catchError(error => { return handleError(error) })
                    );
            })
        )
    );

    //
    authRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.authenticateSuccess),
            tap(action => action.redirect && this.router.navigate(['/']))
        ), { dispatch: false }
    );

    //
    autoLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.autoLogin),
            map(() => {
                const userData: {
                    email: string;
                    id: string;
                    _token: string;
                    _tokenExpirationDate: string;
                } = JSON.parse(localStorage.getItem('userData'));
                if (!userData) {
                    return { type: 'DUMMY' };
                }

                const loadedUser = new User(
                    userData.email,
                    userData.id,
                    userData._token,
                    new Date(userData._tokenExpirationDate)
                );

                if (loadedUser.token) {
                    // this.user.next(loadedUser);
                    const expirationDuration =
                        new Date(userData._tokenExpirationDate).getTime() -
                        new Date().getTime();
                    this.authService.setLogoutTimer(expirationDuration);
                    return AuthActions.authenticateSuccess({
                        email: loadedUser.email,
                        userId: loadedUser.id,
                        token: loadedUser.token,
                        expirationDate: new Date(userData._tokenExpirationDate),
                        redirect: false
                    });
                }
                return { type: 'DUMMY' };
            })
        )
    );

    //
    authLogout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => {
                this.authService.clearLogoutTimer();
                localStorage.removeItem('userData');
                this.router.navigate(['/auth']);
            })
        ),
        { dispatch: false }
    );

}