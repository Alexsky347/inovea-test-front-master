import {
  AsyncPipe,
  DatePipe,
  NgOptimizedImage,
  TitleCasePipe
} from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ModelCollection } from 'src/app/core/models/types/model-collection';
import { RouterLink } from '@angular/router';
import { Model } from '../../../core/models/interfaces/model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatDividerModule,
    AsyncPipe,
    TitleCasePipe,
    DatePipe,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input({ required: true }) models!: ModelCollection;
  @Output() defineModel = new EventEmitter<Model>();
  selectModel(model: Model) {
    this.defineModel.emit(model);
  }
}
