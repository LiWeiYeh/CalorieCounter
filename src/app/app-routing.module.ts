import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods/foods.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  
  {path: 'home', component: HomeComponent},
  {path: 'foods', component: FoodsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}