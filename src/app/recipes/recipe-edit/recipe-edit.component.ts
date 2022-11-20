import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../../ngrx/reducers/app.reducer';
import * as RecipesActions from '../../ngrx/actions/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode: boolean = false;
  recipeReactiveForm: FormGroup;
  private storeSub: Subscription;

  get ingredientsControls() {
    return (this.recipeReactiveForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    }
    );
  }

  private initForm() {

    let recipeName: string = '';
    let recipeImagePath: string = '';
    let recipeDescription: string = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        ).subscribe(recipe => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe.ingredients) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, [Validators.required, Validators.minLength(2)]),
                  'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              )
            }
          }
        });

    }

    this.recipeReactiveForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required, Validators.minLength(2)]),
      imagePath: new FormControl(recipeImagePath, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required, Validators.minLength(10)]),
      ingredients: recipeIngredients
    });
  
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeReactiveForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (this.recipeReactiveForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl('', [Validators.required, Validators.minLength(2)]),
        'amount': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeReactiveForm.value);
      this.store.dispatch(RecipesActions.updateRecipe({ index: this.id, recipe: this.recipeReactiveForm.value }));
    }
    else {
      // this.recipeService.addRecipe(this.recipeReactiveForm.value);
      this.store.dispatch(RecipesActions.addRecipe({ recipe: this.recipeReactiveForm.value }));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onDeleteIngredient(index: number) {
    (this.recipeReactiveForm.get('ingredients') as FormArray).removeAt(index);
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
