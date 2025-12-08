import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url = "http://localhost:8080/task/"
  private readonly _httpClient = inject(HttpClient)

  getTasksByUserId(userId: string): Observable<Task[]> {
    return this._httpClient.get<Task[]>(this.url + userId)
  }
}
