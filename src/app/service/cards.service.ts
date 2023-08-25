import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/Card';

@Injectable({
  providedIn: 'root'
})
export class CardsService implements OnInit {
private baseApiUrl = 'https://localhost:44390/api/Cards/'
constructor(private http:HttpClient) { }
  ngOnInit(): void {

  }

  getAllCards():Observable<Card[]>
  {
return this.http.get<Card[]>(this.baseApiUrl);
  }
  addCards(card:Card):Observable<Card[]>
  {
    card.id = '00000000-0000-0000-0000-000000000000';
return this.http.post<Card[]>(this.baseApiUrl,card);
  }
deleteCard(id:string):Observable<Card>
{
  return this.http.delete<Card>(this.baseApiUrl + id);
}
updateCard(id:string,card:Card):Observable<Card[]>
{
  return this.http.put<Card[]>(this.baseApiUrl + id,card);
}
}
