import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Classes
import { StarterClass } from '../../domain/starter.class';
import { DishClass } from '../../domain/dish.class';
import { ElderlyClass } from '../../domain/elderly.class';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  public recipe: StarterClass|DishClass;
  public elderly: ElderlyClass;
  public showIngredients: boolean = true;
  public showRecipe: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.recipe = this.route.snapshot.data['recipe'];
    this.elderly = this.route.snapshot.data['elderly'];
  }

  ngOnInit() {
  }

  toggleDisplay() {
    this.showRecipe = !(this.showIngredients = !this.showIngredients);
  }

  goHome() {
    this.router.navigate(['elderly', this.elderly.id])
  }
}
