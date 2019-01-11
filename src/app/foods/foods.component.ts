import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFoods } from './foods';
import { FoodService } from './food.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  totalCalories: number = 0;
  totalPrice: number = 0;
  // @Input() caloriesFood: number;
  // @Output() caloriesFoodClicked: EventEmitter<string> =
  //             new EventEmitter<string>();
  pageTitle: string = "Foods list :D";
  imageWidth: number = 80;
  imageMargin: number = 2;
  hideImage: boolean = false;
  errorMessage: string;
  filteredFoods: IFoods[];
  foods: IFoods[] = []
  // isPricePerKg: boolean = true;



  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredFoods = this.listFilter ? this.performFilter(this.listFilter) : this.foods;
  }

  performFilter(filterBy: string): IFoods[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.foods.filter((product: IFoods) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  emptyFilter(){
    this._listFilter = "";
    this.filteredFoods = this.foods;

  }

  constructor(private foodService: FoodService,
              private messageService: MessageService) {
  }

  toggleImage(): void{
    this.hideImage = !this.hideImage;
  }

  resetCalories(): void{
    this.totalCalories = 0;
    this.totalPrice = 0;
    this.messageService.clear();
    this.messageService.add('Foods have been reset');
    
  }

  addFood(caloriesFood, nameFood, priceFood): void{
    console.log(priceFood)
    this.totalCalories = this.totalCalories + caloriesFood;
    this.totalPrice = this.totalPrice + priceFood;
    this.foodService.setFoodNameMessage(nameFood);
  }

  //TODO
  // priceConverter(): void{
  //   if(this.isPricePerKg){
  //      this.foods[productPricePerKilogram] * 1000
  //   }
  // }

  ngOnInit() {
    console.log("in onInit")
    this.foodService.getFoods().subscribe(
      foods =>  {
        this.foods = foods;
        this.filteredFoods = this.foods;
      },
      error => this.errorMessage = <any>error
    );
  }

}
