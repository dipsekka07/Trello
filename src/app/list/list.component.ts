import { analyzeAndValidateNgModules, ThrowStmt } from '@angular/compiler';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardServiceService } from '../services/board-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() listData: any;
  @Input() listIndex: number = -1;
  @Output() deleteListEvent = new EventEmitter<number>();

  cards: any;

  constructor(private boardService: BoardServiceService) {
              
              }

  ngOnInit(): void {
    this.cards = this.listData.cards;
  }


  deleteCardFromList(cardIndex: number) : void {
    console.log("deleted: "+ this.listData.cards[cardIndex].title);
    this.listData.cards.splice(cardIndex, 1);
  }

  addDummyCard() : void {
    // create a new card with dummy title and description
    const newCard = { title: "", description : ""};
    newCard.title = "Enter Title";
    newCard.description = "Enter desciption";
    this.listData.cards.push(newCard);
  }

  addNewCardToList(target: any): void {
    this.listData.cards[target.cardIndex].title = target.cardTitle;
  }


  onDrop(data: any) {
    this.addDraggedCard(data);
  }

  addDraggedCard(data: any) : void {
    const newCard = { title: "", description : ""};
    newCard.title = data.cardData.title;
    newCard.description = data.cardData.description;
    this.listData.cards.push(newCard);
    this.boardService.deleteCardFromList(data.listIndex, data.cardIndex);
  }

  deleteList(listIndex: number): void {
    this.listData = null;
    this.deleteListEvent.emit(listIndex);
  }
}
