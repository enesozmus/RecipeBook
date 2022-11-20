import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './ngrx/reducers/auth.reducer';
import { AuthEffects } from './ngrx/effects/auth.effects';
import { environment } from '../environments/environment';
import { RecipeEffects } from './ngrx/effects/recipe.effects';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    SharedModule,
    /**
     * We added NgRx to our application by including the StoreModule and calling .forRoot.
     * .forRoot then needs a map, an object that tells NgRx which reducers we have in our application.
     * A reducer is just a function.
     */
    StoreModule.forRoot({auth: authReducer}),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
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
