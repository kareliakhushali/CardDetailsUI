import { Component, OnInit } from '@angular/core';
import { CardsService } from './service/cards.service';
import { Card } from './models/Card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // to add th data
  card:Card = {
    id: '',
    cardHolderName: '',
    cardNumber: '',
    cvc: '',
    expiryMonth: '',
    expiryYear: ''
  }
  // variable for getting the cards
  cards: Card[] = [];
   constructor(private cardsService:CardsService){

 }
  ngOnInit(): void {
this.getAllCards();

  }
  title = 'CardDetailsUI';
  getAllCards()
  {
    this.cardsService.getAllCards()
    .subscribe(
      {
        next :(cards)=>{

          this.cards = cards;
          console.log(cards);
        },
        error:(response)=>{
          console.log(response);
        }

      })
  }
  onSubmit()
  {
    if(this.card.id === '')
    {
      this.cardsService.addCards(this.card).subscribe(
        response=>{
         //to refresh the data after adding
         this.getAllCards();
         this.card = {
           id: '',
           cardHolderName: '',
           cardNumber: '',
           cvc: '',
           expiryMonth: '',
           expiryYear: ''
         };
        }
       )
    }
    else{
    this.updateCard(this.card);
    }
console.log(this.card);

  }
  deleteCard(id:string)
  {
this.cardsService.deleteCard(id).subscribe(
  reponse=>{
    //to refresh the data afetr deleting
    this.getAllCards();
  }
)
  }
  populateCard(card:Card)
  {
    this.card = card;

  }
  updateCard(card:Card)
  {
    this.cardsService.updateCard(this.card.id,card)
    .subscribe(
      response=>{
        //refresh the list
        this.getAllCards();
      }
    )
  }
}
