import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ValueProvider } from '@angular/core';
import { BoardServiceService } from '../services/board-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  data: any[] | undefined = [];
  constructor(private boardSerive: BoardServiceService,
              ) { }

   ngOnInit(): void{
   this.boardSerive.getBoardService().subscribe(data => {
      this.data = data;
      console.log(this.data);
    }, err => {
      console.log(err);
    });

    this.boardSerive.subjectDelete.subscribe({
      next: (v: any) => {
        if (this.data !== undefined) {
          this.data[v.listIndex].cards.splice(v.cardIndex, 1);
        }
      }
   })
  }

  addListToBoard() : void {
    const temp = { title : "Enter title", cards : []};
    if(this.data === undefined) {
      this.data = [];
    }
    this.data.push(temp);
  }

  deleteListFromBoard(listIndex: number) : void {
    // console.log("deleted list: "+ this.data[listIndex].title);
    if(this.data)
      this.data.splice(listIndex, 1);
  }
}
