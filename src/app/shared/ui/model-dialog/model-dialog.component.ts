import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { Model } from '../../../core/models/interfaces/model';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-model-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './model-dialog.component.html',
  styleUrl: './model-dialog.component.scss'
})
export class ModelDialogComponent {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Model,
    private formBuilder: FormBuilder,
    private globalService: GlobalService
  ) {
    this.formGroup = this.formBuilder.group({
      modelName: [data ? data.modelName : '', Validators.required],
      name: [data ? data.name : ''],
      description: [data ? data.description : ''],
      author: [data ? data.author : '', Validators.required],
      polygons: [data ? data.polygons : 0, Validators.required],
      date: [data ? data.date : new Date()]
    });
  }

  saveChanges() {
    if (this.formGroup.invalid) {
      return;
    }
    if (this.data?.id) {
      this.globalService
        .updateModel(this.data.id, this.formGroup.value)
        .subscribe((response: Model) => {
          this.dialogRef.close(response);
        });
    } else {
      this.globalService
        .createModel(this.formGroup.value)
        .subscribe((response: Model) => {
          this.dialogRef.close(response);
        });
    }
  }
}
