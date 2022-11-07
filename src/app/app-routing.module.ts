import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule)},
  { path: 'shopping', loadChildren: () => import('./shopping/shopping.module').then(module => module.ShoppingModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)}
];

@NgModule({
  /**
   * when we are on the auth page, it will already preload recipes and shopping list
   * The advantage is that the initial download bundles still is kept small
   * but then when the user is browsing the page and we have some idle time anyways
   *  → we preload these additional code bundles to make sure that subsequent navigation requests are faster
   */
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }