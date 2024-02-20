import { MatInputModule } from '@angular/material/input';
import { Component, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { ListComponent } from './list/list.component';
import { ModelDetailsComponent } from './model-details/model-details.component';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ModelCollection } from 'src/app/core/models/types/model-collection';
import { GlobalService } from 'src/app/core/services/global.service';
import { InputSearchComponent } from '../../shared/ui/input-search/input-search.component';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Model } from '../../core/models/interfaces/model';
import { ModelDialogComponent } from '../../shared/ui/model-dialog/model-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [
    MatToolbarModule,
    ListComponent,
    ModelDetailsComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    AsyncPipe,
    TitleCasePipe,
    InputSearchComponent,
    MatButton,
    RouterLink
  ],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  models$!: Observable<ModelCollection>;
  modelSelected!: Model;
  constructor(
    private globalService: GlobalService,
    private dialog: MatDialog
  ) {
    this.fetchModels();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchModels() {
    this.models$ = this.globalService.getModelsList();
    this.refreshDetails();
  }

  handleModelChange(model: Model) {
    this.modelSelected = model;
  }
  refreshDetails() {
    this.models$
      .pipe(takeUntil(this.destroy$))
      .subscribe((models: ModelCollection) => {
        this.modelSelected = models[0];
      });
  }

  refreshModels() {
    this.fetchModels();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModelDialogComponent, {
      data: null,
      width: '70%',
      height: '70%'
    });
    dialogRef.afterClosed().subscribe((result: Model) => {
      if (result) {
        this.refreshModels();
      }
    });
  }
}
