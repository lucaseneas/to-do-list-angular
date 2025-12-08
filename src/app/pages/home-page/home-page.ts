import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { Task } from '../../models/Task';
import { AuthenticationService } from '../../services/authentication-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly _taskService = inject(TaskService)
  private readonly _authenticationService = inject(AuthenticationService)
  private readonly _cdr = inject(ChangeDetectorRef)
  private _route = inject(Router)

  tasks: Task[] = [];

  constructor() {
    console.log("ngOnInit executado")
    this._taskService.getTasksByUserId(sessionStorage.getItem("userId")!).subscribe({
      next: (res: Task[]) => {
        console.log("Tarefas recebidas:", res)
        this.tasks = res
        this._cdr.detectChanges() // Força detecção de mudanças
      },
      error: (err) => {
        console.error("Erro ao carregar tarefas:", err)
      }
    })

  }


  logout() {
    this._authenticationService.logout();
    this._route.navigate(['/login'])
  }
}
