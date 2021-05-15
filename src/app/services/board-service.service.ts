import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {

  public subjectDelete = new Subject();

  constructor(private http: HttpClient) { }

  getBoardService() : Observable<any> {
    const jsonUrl = './assets/dummy.json';
    return this.http.get(jsonUrl);
  }
 
  deleteCardFromList(listIndex: number, cardIndex: number) : void {
    this.subjectDelete.next({listIndex, cardIndex})
  }
}
