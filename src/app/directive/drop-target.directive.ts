import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DragService } from '../services/drag.service';

@Directive({
  selector: '[appDropTarget]'
})

export class DropTargetDirective {
  constructor(private dragService: DragService) {
  }

  @Input()
  set appDropTarget(options: DropTargetOptions) {
    if (options) {
      this.options = options;
    }
  }

  @Output('appDrop') drop = new EventEmitter();

  private options: DropTargetOptions = {};

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event: any) {
    const { zone = 'zone' } = this.options;

    if (this.dragService.accepts(zone)) {
       event.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    const data =  JSON.parse(event.dataTransfer.getData('Text'));

    this.drop.next(data);
  }
}
export interface DropTargetOptions {
  zone?: string;
}
