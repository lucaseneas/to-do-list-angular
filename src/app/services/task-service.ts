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

  createTask(task: { name: string; description: string; status: string }) {
    return this._httpClient.post<Task>(this.url + sessionStorage.getItem("userId")!, task);
  }

  removeTask(id: string | undefined) {
    return this._httpClient.delete(this.url + id)
  }
}
