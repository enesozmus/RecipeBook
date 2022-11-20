import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../ngrx/reducers/app.reducer';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {

    this.subscription = this.store.select('recipes')
      .pipe(
        map(recipesState => recipesState.recipes)).subscribe((recipes: Recipe[]) => {
          this.recipes = recipes;
        });

  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}