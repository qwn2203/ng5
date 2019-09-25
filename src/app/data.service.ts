
//import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entidades } from './entidades'; 
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { _throw as throwError } from 'rxjs/observable/throw';
/*
@Injectable({
 providedIn: 'root'
})
*/@Injectable()
export class DataService {/*
 private goals = new BehaviorSubject<any>(['Be the best father', 'Be fitness', 'Be a great Swimmer']);  goal = this.goals.asObservable();  constructor() { }  changeGoal(goal)  {
   this.goals.next(goal);
 }
*/
  // Define API 
  apiURL = 'https://dinosaurio1.appspot.com';
  //apiURL = 'http://localhost:10010'; 
  constructor(private http: HttpClient) { } 
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
  getEntidades(): Observable<Entidades> {
    return this.http.get<Entidades>(this.apiURL + '/entidades')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
   } 
  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = 'Error Code: ${ error.status } \nMessage: ${ error.message }';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
/*
import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }), query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }), query(':leave', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
              style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
              style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 }),
            ]))]), { optional: true })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
    itemCount: number = 1
  btnTxt: string = "Add an item"
  goalText: string = "My first life goal"
  goals = []; constructor(private _data: DataService) { } ngOnInit() {
    //this.itemCount = this.goals.length;
    //this._data.goal.subscribe(res => this.goals = res);
    //this._data.changeGoal(this.goals);
    this.getEntidades();
  } getEntidades() {
    return this._data.getEntidades()
      .subscribe((data: any) => {
        console.log("entidades :" + data);
        this.goals = data;
        //alert("entidades " + data);
      })
  }
  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    //this._data.changeGoal(this.goals);  }  removeItem(i) {
    this.goals.splice(i, 1);
    this.itemCount = this.goals.length;
    //this._data.changeGoal(this.goals);  }
  }
}*/