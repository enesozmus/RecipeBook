import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { RecipesResolverService } from '../services/recipes-resolver.service';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { ReactiveFormsModule } from '@angular/forms';

import {StoreModule} from '@ngrx/store';
import * as fromRecipes from '../ngrx/reducers/recipe.reducer';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    /** RouterModule
     * Adds directives and providers for in-app navigation among views defined in an application.
     *    → The forRoot() method creates an NgModule that contains all the directives, the given routes, and the Router service itself.
     *    → The forChild() method creates an NgModule that contains all the directives and the given routes, but does not include the Router service.
     */
    RouterModule.forChild([
      { path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
      ]
    }
    ]),
    StoreModule.forFeature('recipes', fromRecipes.recipeReducer),
  ]
})
export class RecipesModule {}
