import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';

import { IFoods } from './foods'

@Injectable({
  providedIn: 'root'
})

export class FoodService {
  private foodsUrl = '/src/api/products/foods.json';
  constructor(private http: HttpClient,
              private messageService: MessageService
  ) { }

  getFoods(): Observable<IFoods[]>{
    this.messageService.add('Food Service; Fetched some food');

    return this.http.get<IFoods[]>(this.foodsUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  setFoodNameMessage(nameFood): void{
    this.messageService.add(`Food Service; ${nameFood} has been added`);
  }

  

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastrucute
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        // A client-side or network error occured. Handle it arrocdingly.
        errorMessage = `An error occured: ${err.error.message}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage)
  }
}
