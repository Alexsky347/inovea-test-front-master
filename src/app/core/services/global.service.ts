import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from 'src/app/app.module';
import { Model } from '../models/interfaces/model';
import { ModelCollection } from '../models/types/model-collection';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private http = inject(HttpClient);

  constructor(@Inject(BACKEND_URL) private _url: string) {}

  pingServer(): Observable<string> {
    return this.http.get<string>(`${this._url}/ping`);
  }

  getModelsList(): Observable<ModelCollection> {
    return this.http.get<ModelCollection>(`${this._url}/models`);
  }

  getModelById(id: string): Observable<Model> {
    return this.http.get<Model>(`${this._url}/models/${id}`);
  }

  createModel(model: Model): Observable<Model> {
    return this.http.post<Model>(`${this._url}/models`, model);
  }

  updateModel(id: string, model: Model): Observable<Model> {
    return this.http.put<Model>(`${this._url}/models/${id}`, model);
  }

  deleteModel(id: string): Observable<Model> {
    return this.http.delete<Model>(`${this._url}/models/${id}`);
  }
}
