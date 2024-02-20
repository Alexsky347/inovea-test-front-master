import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Model } from '../../../core/models/interfaces/model';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModelDialogComponent } from '../../../shared/ui/model-dialog/model-dialog.component';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-model-details',
  standalone: true,
  imports: [NgOptimizedImage, DatePipe, MatCardModule, MatButtonModule],
  templateUrl: './model-details.component.html',
  styleUrl: './model-details.component.scss'
})
export class ModelDetailsComponent {
  @Input({ required: true }) model!: Model;
  @Output() modelDeleted: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private dialog: MatDialog,
    private globalService: GlobalService
  ) {}

  openDialog(): void {
    this.dialog.open(ModelDialogComponent, {
      data: this.model,
      width: '70%',
      height: '70%'
    });
  }
  deleteItem(id: string) {
    const isDelete = this.globalService.deleteModel(id);
    isDelete.subscribe((data: Model) => {
      if (data) this.modelDeleted.emit(data.id);
    });
  }
}
