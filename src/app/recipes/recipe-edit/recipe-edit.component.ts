import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  //reactive approach
  recipeReactiveForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
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
    // is initialized with a default value of an empty array
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, [Validators.required, Validators.minLength(2)]),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
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
    (<FormArray>this.recipeReactiveForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('', [Validators.required, Validators.minLength(2)]),
        'amount': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onSubmit() {
    /*
        const selectedRecipe = new Recipe(
          this.recipeReactiveForm.value['name'],
          this.recipeReactiveForm.value['description'],
          this.recipeReactiveForm.value['imagePath'],
          this.recipeReactiveForm.value['ingredients']
        );
    */
    debugger;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeReactiveForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recipeReactiveForm.value);
    }

    this.onCancel();

    console.log(this.recipeReactiveForm);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeReactiveForm.get('ingredients')).removeAt(index);
  }
}
