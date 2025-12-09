import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { Task } from '../../models/Task';
import { AuthenticationService } from '../../services/authentication-service';
import { Router } from '@angular/router';
import { AddTaskModal } from '../../components/add-task-modal/add-task-modal';

@Component({
  selector: 'app-home-page',
  imports: [AddTaskModal],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly _taskService = inject(TaskService)
  private readonly _authenticationService = inject(AuthenticationService)
  private readonly _cdr = inject(ChangeDetectorRef)
  private _route = inject(Router)

  tasks: Task[] = [];
  showModal = false;

  constructor() {
    console.log("ngOnInit executado")
    this._taskService.getTasksByUserId(sessionStorage.getItem("userId")!).subscribe({
      next: (res: Task[]) => {
        console.log("Tarefas recebidas:", res)
        this.tasks = res
        this._cdr.detectChanges()
      },
      error: (err) => {
        console.error("Erro ao carregar tarefas:", err)
      }
    })
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  createTask(taskData: { name: string; description: string; status: string }) {
    const task = { ...taskData };

    this._taskService.createTask(task).subscribe({
      next: (newTask: Task) => {
        this.tasks.push(newTask);
        this.showModal = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error("Erro ao criar tarefa:", err);
      }
    });
  }

  removeTask(id: string | undefined) {
    this._taskService.removeTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error("Erro ao remover tarefa:", err);
      }
    });
  }

  logout() {
    this._authenticationService.logout();
    this._route.navigate(['/login'])
  }
}

