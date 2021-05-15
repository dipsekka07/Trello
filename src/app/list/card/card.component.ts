import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardData: any;
  @Input() cardIndex: number = -1;
  @Input() cardListIndex: number = -1;
  @Output() deleteCardEvent = new EventEmitter<number>();
  @Output() addCardEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteCard(cardIndex: number): void {
    this.cardData = null;
    this.deleteCardEvent.emit(cardIndex);
  }

  onCardTitleChange(target: any, cardIndex: number) : void {
    const newTitle = target.innerHTML;
    if(this.cardData.title != newTitle) {
      this.addCardEvent.emit({cardTitle: newTitle, cardIndex});
    }
    console.log(target.innerHTML);
  }

  
}
