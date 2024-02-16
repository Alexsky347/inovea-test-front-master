import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ModelCollection } from '../../../core/models/types/model-collection';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})
export class InputSearchComponent implements OnInit {
  @Input({ required: true }) modelList!: ModelCollection;
  @Output() modelSelected: EventEmitter<ModelCollection> =
    new EventEmitter<ModelCollection>();

  modelName = new FormControl();
  filteredModelList!: Observable<ModelCollection>;

  @ViewChild(MatAutocomplete) auto!: MatAutocomplete;

  ngOnInit(): void {
    this.filteredModelList = this.modelName.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): ModelCollection {
    const filterValue = value.toLowerCase();
    return this.modelList.filter((model) =>
      model.modelName.toLowerCase().includes(filterValue)
    );
  }
}
